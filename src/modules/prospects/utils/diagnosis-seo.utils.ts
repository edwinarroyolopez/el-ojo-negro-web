import type { Prospect, ProspectDiagnosis } from '../types';
import { normalizeJsonLikeText } from '../utils';
import {
  serializeDiagnosisForPrompt,
  serializeProspectForPrompt,
} from './slides-prompt.utils';

export type DiagnosisSeoStatus = 'EMPTY' | 'INCOMPLETE' | 'READY';

export type DiagnosisSeoMetadata = {
  version: 1;
  status: DiagnosisSeoStatus;
  title: string;
  description: string;
  imageUrl: string;
  imagePublicId?: string;
  imageAlt: string;
  updatedAt: string;
};

export type SeoMetadataValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  payload: Pick<DiagnosisSeoMetadata, 'title' | 'description'> | null;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function sanitizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function safeParseJson<T>(value: string) {
  try {
    return JSON.parse(normalizeJsonLikeText(value)) as T;
  } catch {
    return null;
  }
}

export function calculateDiagnosisSeoStatus(
  seo?: Partial<DiagnosisSeoMetadata> | null,
): DiagnosisSeoStatus {
  const hasTitle = Boolean(seo?.title?.trim());
  const hasDescription = Boolean(seo?.description?.trim());
  const hasImage = Boolean(seo?.imageUrl?.trim());

  if (!hasTitle && !hasDescription && !hasImage) return 'EMPTY';
  if (hasTitle && hasDescription && hasImage) return 'READY';
  return 'INCOMPLETE';
}

export function getDiagnosisSeo(
  diagnosis?: ProspectDiagnosis | null,
  prospectName?: string,
): DiagnosisSeoMetadata {
  const rawSeo = isObject(diagnosis?.structured?.seo) ? diagnosis?.structured?.seo : undefined;
  const title = sanitizeString(rawSeo?.title);
  const description = sanitizeString(rawSeo?.description);
  const imageUrl = sanitizeString(rawSeo?.imageUrl);
  const imagePublicId = sanitizeString(rawSeo?.imagePublicId);
  const imageAlt =
    sanitizeString(rawSeo?.imageAlt) ||
    (prospectName?.trim() ? `Preview SEO del diagnostico de ${prospectName.trim()}` : 'Preview SEO del diagnostico');
  const updatedAt = sanitizeString(rawSeo?.updatedAt);

  return {
    version: 1,
    status: calculateDiagnosisSeoStatus({ title, description, imageUrl }),
    title,
    description,
    imageUrl,
    imagePublicId: imagePublicId || undefined,
    imageAlt,
    updatedAt,
  };
}

export function mergeDiagnosisSeoIntoStructured(
  existingStructured: Record<string, unknown> | undefined,
  seo: DiagnosisSeoMetadata,
): Record<string, unknown> {
  const normalizedSeo = {
    ...seo,
    status: calculateDiagnosisSeoStatus(seo),
  } satisfies DiagnosisSeoMetadata;

  return {
    ...(existingStructured ?? {}),
    seo: normalizedSeo,
  };
}

export function validateSeoMetadataJson(raw: string): SeoMetadataValidationResult {
  if (!raw.trim()) {
    return {
      isValid: false,
      errors: ['Aun no has pegado el JSON SEO.'],
      warnings: [],
      payload: null,
    };
  }

  const parsed = safeParseJson<unknown>(raw);
  if (!parsed || !isObject(parsed)) {
    return {
      isValid: false,
      errors: ['Debes pegar un JSON valido en formato objeto.'],
      warnings: [],
      payload: null,
    };
  }

  const root = parsed as Record<string, unknown>;
  const keys = Object.keys(root);
  const allowedKeys = ['title', 'description'];
  const invalidKeys = keys.filter((key) => !allowedKeys.includes(key));
  const errors: string[] = [];
  const warnings: string[] = [];

  if (invalidKeys.length > 0) {
    errors.push('El JSON solo puede incluir `title` y `description`.');
  }

  if (keys.length !== allowedKeys.length || !allowedKeys.every((key) => key in root)) {
    errors.push('El JSON debe tener exactamente esta forma: {"title":"...","description":"..."}.');
  }

  if (typeof root.title !== 'string' || !root.title.trim()) {
    errors.push('`title` debe ser un string no vacio.');
  }

  if (typeof root.description !== 'string' || !root.description.trim()) {
    errors.push('`description` debe ser un string no vacio.');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      warnings,
      payload: null,
    };
  }

  const title = (root.title as string).trim();
  const description = (root.description as string).trim();

  if (title.length < 35 || title.length > 90) {
    warnings.push('`title` funciona mejor entre 35 y 90 caracteres.');
  }

  if (description.length < 90 || description.length > 180) {
    warnings.push('`description` funciona mejor entre 90 y 180 caracteres.');
  }

  return {
    isValid: true,
    errors: [],
    warnings,
    payload: {
      title,
      description,
    },
  };
}

export function buildSeoMetadataPrompt(prospect: Prospect, diagnosis?: ProspectDiagnosis) {
  return [
    'Actua como estratega senior de marca, conversion y presencia digital de El Ojo Negro.',
    'Tu tarea es escribir el titulo y la descripcion SEO que viajaran por WhatsApp/OpenGraph cuando este diagnostico se comparta como link.',
    'El tono debe ser sobrio, premium, especifico del prospecto, comercialmente claro y sin promesas falsas.',
    'No inventes metricas, no exageres resultados y no uses frases genericas que sirvan para cualquier negocio.',
    'Piensa en confianza, claridad comercial, diagnostico express y percepcion editorial.',
    '',
    'Instruccion obligatoria de salida:',
    '- responde unicamente con JSON valido dentro de un unico bloque de codigo ```json```',
    '- no agregues markdown adicional, comentarios, referencias ni explicaciones',
    '- usa exactamente este formato dentro del bloque: {"title":"...","description":"..."}',
    '- no escribas texto antes ni despues del bloque',
    '',
    'Datos del prospecto:',
    JSON.stringify(
      {
        name: prospect.name,
        category: prospect.category,
        city: prospect.city,
        website: prospect.website,
        instagram: prospect.instagram,
      },
      null,
      2,
    ),
    '',
    'Resumen del contexto y diagnostico:',
    JSON.stringify(
      {
        prospect: serializeProspectForPrompt(prospect),
        diagnosis: serializeDiagnosisForPrompt(diagnosis ?? prospect.diagnosis),
      },
      null,
      2,
    ),
  ].join('\n');
}

export function buildSeoImagePrompt(
  prospect: Prospect,
  diagnosis?: ProspectDiagnosis,
  seoMetadata?: Pick<DiagnosisSeoMetadata, 'title' | 'description'> | null,
) {
  return [
    'Actua como director creativo editorial de El Ojo Negro.',
    'Necesito una imagen horizontal 1200x630 px para WhatsApp/OpenGraph del diagnostico de este prospecto.',
    'La imagen debe sentirse premium, sobria, inevitable y especifica de la marca, como una portada editorial.',
    'Usa identidad visual inferida del prospecto y mezclala con la firma visual de El Ojo Negro sin saturar la composicion.',
    'Debe haber poco texto, contraste alto, centro protegido y margenes amplios para verse bien en WhatsApp.',
    'El nombre o logo del prospecto debe ser visible si es verificable. Incluye una firma sutil: Diagnostico por El Ojo Negro.',
    'No llenes la pieza de iconos, graficas ni elementos accesorios.',
    '',
    'Output esperado:',
    '- una sola imagen horizontal 1200x630',
    '- composicion segura para recorte y preview en WhatsApp',
    '- tono editorial, premium y comercialmente serio',
    '',
    'Datos del prospecto:',
    JSON.stringify(
      {
        name: prospect.name,
        category: prospect.category,
        city: prospect.city,
        website: prospect.website,
        instagram: prospect.instagram,
      },
      null,
      2,
    ),
    '',
    'Contexto del diagnostico:',
    JSON.stringify(
      {
        seoMetadata,
        diagnosis: serializeDiagnosisForPrompt(diagnosis ?? prospect.diagnosis),
      },
      null,
      2,
    ),
  ].join('\n');
}
