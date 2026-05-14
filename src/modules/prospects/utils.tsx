'use client';

import type { ReactNode } from 'react';
import type {
  GeneratedDiagnosisJson,
  Prospect,
  ProspectDiagnosis,
} from './types';
import { buildDiagnosisResearchPrompt } from './utils/diagnosis-research-prompt.utils';
import { buildInitialWhatsAppOutreachMessage } from './utils/whatsapp-outreach.utils';

type MarkdownBlock =
  | { type: 'h1' | 'h2' | 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

function toNumber(value: unknown) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return undefined;
}

export function safeParseJson<T = unknown>(value: string): T | null {
  const normalizedValue = normalizeJsonLikeText(value);

  try {
    return JSON.parse(normalizedValue) as T;
  } catch {
    return null;
  }
}

export function normalizeJsonLikeText(value: string) {
  const trimmed = value.trim();
  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);

  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  return trimmed;
}

export function parseImportPayload(value: string) {
  const payload = safeParseJson(value);
  if (!payload) return [] as unknown[];

  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const collections = ['items', 'prospects', 'results', 'leads', 'data', 'candidates'];
    for (const key of collections) {
      if (Array.isArray(record[key])) return record[key] as unknown[];
    }
    return [record];
  }

  return [] as unknown[];
}

function pickNestedRecord(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const nested = record[key];
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      return nested as Record<string, unknown>;
    }
  }

  return undefined;
}

export function validateImportPayload(value: string) {
  if (!value.trim()) {
    return {
      isJsonValid: false,
      isFormatValid: false,
      errors: ['Aún no has pegado ningún JSON.'],
      parsed: null as unknown,
      format: 'empty',
    };
  }

  const parsed = safeParseJson(value);
  if (!parsed) {
    return {
      isJsonValid: false,
      isFormatValid: false,
      errors: ['El contenido no es JSON válido.'],
      parsed: null as unknown,
      format: 'invalid-json',
    };
  }

  if (Array.isArray(parsed)) {
    return {
      isJsonValid: true,
      isFormatValid: parsed.length > 0,
      errors: parsed.length > 0 ? [] : ['El array está vacío.'],
      parsed,
      format: 'array',
    };
  }

  if (typeof parsed !== 'object') {
    return {
      isJsonValid: true,
      isFormatValid: false,
      errors: ['El JSON debe ser un objeto o un array.'],
      parsed,
      format: 'invalid-shape',
    };
  }

  const record = parsed as Record<string, unknown>;
  const collections = ['items', 'prospects', 'results', 'leads', 'data', 'candidates'];
  for (const key of collections) {
    if (Array.isArray(record[key])) {
      const collection = record[key] as unknown[];
      return {
        isJsonValid: true,
        isFormatValid: collection.length > 0,
        errors: collection.length > 0 ? [] : [`La colección '${key}' está vacía.`],
        parsed,
        format: key,
      };
    }
  }

  const nestedCandidate = pickNestedRecord(record, ['normalizedCandidate', 'rawDiscovery', 'importProjection']);
  const hasSingleProspectSignals =
    typeof record.name === 'string' ||
    typeof record.businessName === 'string' ||
    Boolean(nestedCandidate);

  return {
    isJsonValid: true,
    isFormatValid: hasSingleProspectSignals,
    errors: hasSingleProspectSignals
      ? []
      : ['Falta una colección compatible como candidates[] o un prospecto individual con bloques reconocibles.'],
    parsed,
    format: hasSingleProspectSignals ? 'single' : 'unknown',
  };
}

export function summarizeImportPayload(value: string) {
  const items = parseImportPayload(value);
  const categoryCounter = new Map<string, number>();
  const cityCounter = new Map<string, number>();
  const signals = new Set<string>();

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const category =
      pickString(record, ['category', 'industry', 'segment']) ??
      pickString(pickNestedRecord(record, ['normalizedCandidate', 'importProjection']) ?? {}, ['category', 'industry', 'segment']);
    const city =
      pickString(record, ['city', 'locationCity', 'municipality']) ??
      pickString(pickNestedRecord(record, ['normalizedCandidate', 'importProjection']) ?? {}, ['city', 'locationCity', 'municipality']);
    const website =
      pickString(record, ['website', 'site', 'url']) ??
      pickString(pickNestedRecord(record, ['normalizedCandidate', 'importProjection']) ?? {}, ['website', 'site', 'url']);
    const instagram =
      pickString(record, ['instagram', 'instagramUrl']) ??
      pickString(pickNestedRecord(record, ['normalizedCandidate', 'importProjection']) ?? {}, ['instagram', 'instagramUrl']);
    const whatsapp =
      pickString(record, ['whatsapp', 'phone']) ??
      pickString(pickNestedRecord(record, ['normalizedCandidate', 'importProjection']) ?? {}, ['whatsapp', 'phone']);
    const providerSignals = pickNestedRecord(record, ['providerIntelligence'])?.signals;
    const signalRecord =
      providerSignals && typeof providerSignals === 'object' && !Array.isArray(providerSignals)
        ? (providerSignals as Record<string, unknown>)
        : undefined;

    if (category) categoryCounter.set(category, (categoryCounter.get(category) ?? 0) + 1);
    if (city) cityCounter.set(city, (cityCounter.get(city) ?? 0) + 1);
    if (website) signals.add('Sitio detectado');
    if (instagram) signals.add('Instagram detectado');
    if (whatsapp) signals.add('Telefono o WhatsApp detectado');
    if (signalRecord?.websitePresent === true) signals.add('Website presente');
    if (signalRecord?.instagramPresent === true) signals.add('Instagram presente');
    if (signalRecord?.phoneVisible === true) signals.add('Telefono visible');
  }

  return {
    count: items.length,
    dominantCategory: findDominant(categoryCounter),
    dominantCity: findDominant(cityCounter),
    signals: [...signals],
  };
}

function pickString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

function findDominant(counter: Map<string, number>) {
  let winner = 'Sin dominante';
  let score = 0;

  for (const [key, value] of counter.entries()) {
    if (value > score) {
      winner = key;
      score = value;
    }
  }

  return winner;
}

export function formatStatus(value?: string) {
  return (
    value
      ?.toLowerCase()
      .split('_')
      .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
      .join(' ') ?? 'Sin estado'
  );
}

export function formatPriority(value?: string) {
  switch (value) {
    case 'CRITICAL':
      return 'Critica';
    case 'HIGH':
      return 'Alta';
    case 'MEDIUM':
      return 'Media';
    case 'LOW':
      return 'Baja';
    default:
      return 'Media';
  }
}

export function buildResearchPrompt(prospect: Prospect) {
  return buildDiagnosisResearchPrompt(prospect);
}

export function buildWhatsAppMessage(prospect: Prospect) {
  return buildInitialWhatsAppOutreachMessage(prospect);
}

export function diagnosisToGeneratedJson(diagnosis?: ProspectDiagnosis) {
  if (!diagnosis) return '';

  const payload: GeneratedDiagnosisJson = {
    title: diagnosis.title ?? '',
    slug: diagnosis.slug,
    visibility: diagnosis.visibility,
    status: diagnosis.status,
    summary: diagnosis.summary ?? '',
    markdown: diagnosis.markdown ?? '',
    publicNotes: diagnosis.publicNotes,
    scores: diagnosis.scores,
    structured: diagnosis.structured,
  };

  return JSON.stringify(payload, null, 2);
}

export function parseEditorJson(value: string) {
  if (!value.trim()) return undefined;
  return safeParseJson<Record<string, unknown> | Array<Record<string, unknown>>>(value) ?? undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isDiagnosisVisibility(value: unknown): value is GeneratedDiagnosisJson['visibility'] {
  return value === 'PRIVATE' || value === 'UNLISTED' || value === 'PUBLIC';
}

function isDiagnosisStatus(value: unknown): value is GeneratedDiagnosisJson['status'] {
  return value === 'EMPTY' || value === 'DRAFT' || value === 'READY' || value === 'PUBLISHED';
}

export function validateGeneratedDiagnosisJson(value: string) {
  const parsed = safeParseJson<unknown>(value);

  if (!value.trim()) {
    return {
      isValid: false,
      errors: ['Aún no has pegado el JSON del diagnóstico.'],
      payload: null as GeneratedDiagnosisJson | null,
    };
  }

  if (!parsed || !isObject(parsed)) {
    return {
      isValid: false,
      errors: ['El contenido debe ser un JSON válido en formato objeto.'],
      payload: null as GeneratedDiagnosisJson | null,
    };
  }

  const root = isObject(parsed.diagnosis) ? parsed.diagnosis : parsed;
  const errors: string[] = [];

  if (typeof root.title !== 'string' || !root.title.trim()) {
    errors.push('El JSON debe incluir `title`.');
  }

  if (typeof root.summary !== 'string' || !root.summary.trim()) {
    errors.push('El JSON debe incluir `summary`.');
  }

  if (typeof root.markdown !== 'string' || !root.markdown.trim()) {
    errors.push('El JSON debe incluir `markdown`.');
  }

  if (
    typeof root.slug !== 'undefined' &&
    (typeof root.slug !== 'string' || !root.slug.trim())
  ) {
    errors.push('Si `slug` existe, debe ser un string no vacío.');
  }

  if (
    typeof root.visibility !== 'undefined' &&
    !isDiagnosisVisibility(root.visibility)
  ) {
    errors.push('`visibility` debe ser PRIVATE, UNLISTED o PUBLIC.');
  }

  if (typeof root.status !== 'undefined' && !isDiagnosisStatus(root.status)) {
    errors.push('`status` debe ser EMPTY, DRAFT, READY o PUBLISHED.');
  }

  if (
    typeof root.scores !== 'undefined' &&
    !Array.isArray(root.scores) &&
    !isObject(root.scores)
  ) {
    errors.push('`scores` debe ser objeto o array.');
  }

  if (typeof root.structured !== 'undefined' && !isObject(root.structured)) {
    errors.push('`structured` debe ser un objeto.');
  }

  if (
    typeof root.publicNotes !== 'undefined' &&
    typeof root.publicNotes !== 'string'
  ) {
    errors.push('`publicNotes` debe ser string si existe.');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      payload: null as GeneratedDiagnosisJson | null,
    };
  }

  const title = root.title as string;
  const summary = root.summary as string;
  const markdown = root.markdown as string;

  return {
    isValid: true,
    errors: [] as string[],
    payload: {
      title: title.trim(),
      slug: typeof root.slug === 'string' ? root.slug.trim() : undefined,
      visibility: isDiagnosisVisibility(root.visibility)
        ? root.visibility
        : 'UNLISTED',
      status: isDiagnosisStatus(root.status) ? root.status : 'READY',
      summary: summary.trim(),
      markdown: markdown.trim(),
      publicNotes:
        typeof root.publicNotes === 'string'
          ? root.publicNotes.trim()
          : undefined,
      scores:
        Array.isArray(root.scores) || isObject(root.scores)
          ? root.scores
          : undefined,
      structured: isObject(root.structured) ? root.structured : undefined,
    } satisfies GeneratedDiagnosisJson,
  };
}

export function parseMarkdown(markdown?: string) {
  if (!markdown?.trim()) return [] as MarkdownBlock[];

  const lines = markdown.split('\n');
  const blocks: MarkdownBlock[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: 'ul', items: listBuffer });
      listBuffer = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ')) {
      listBuffer.push(line.slice(2).trim());
      continue;
    }

    flushList();

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
    } else if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
    } else if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.slice(2).trim() });
    } else {
      blocks.push({ type: 'p', text: line });
    }
  }

  flushList();
  return blocks;
}

export function getDiagnosisScoreEntries(scores?: ProspectDiagnosis['scores']) {
  if (!scores) return [] as Array<{ label: string; value: number }>;

  if (Array.isArray(scores)) {
    return scores
      .map((entry) => {
        const label = typeof entry.label === 'string' ? entry.label : typeof entry.name === 'string' ? entry.name : 'Score';
        const value = toNumber(entry.value ?? entry.score ?? entry.points);
        return value === undefined ? null : { label, value };
      })
      .filter((entry): entry is { label: string; value: number } => Boolean(entry));
  }

  return Object.entries(scores)
    .map(([label, value]) => {
      const numeric = toNumber(value);
      return numeric === undefined ? null : { label, value: numeric };
    })
    .filter((entry): entry is { label: string; value: number } => Boolean(entry));
}

export function derivePositiveSignals(prospect: { website?: string; instagram?: string; category?: string; city?: string }) {
  const output: string[] = [];
  if (prospect.website) output.push('Sitio propio visible');
  if (prospect.instagram) output.push('Instagram identificable');
  if (prospect.category) output.push(`Oferta con categoria reconocible: ${prospect.category}`);
  if (prospect.city) output.push(`Ubicacion visible en ${prospect.city}`);
  return output.slice(0, 5);
}

export function deriveOpportunityList(diagnosis: ProspectDiagnosis, prospectName: string) {
  const structured = (diagnosis.structured ?? {}) as Record<string, unknown>;
  const opportunities = structured.opportunities;

  if (Array.isArray(opportunities)) {
    return opportunities
      .map((item) => (typeof item === 'string' ? item : typeof item === 'object' && item && 'title' in item ? String(item.title) : ''))
      .filter(Boolean)
      .slice(0, 3);
  }

  return [
    `Ordenar mejor el recorrido digital de ${prospectName} por intencion y confianza.`,
    'Reducir friccion antes del contacto con mensajes y CTA mas contextuales.',
    'Volver mas escaneables las pruebas de confianza, claridad y seguimiento.',
  ];
}

export function deriveQuickWin(diagnosis: ProspectDiagnosis) {
  const structured = (diagnosis.structured ?? {}) as Record<string, unknown>;
  if (typeof structured.quickWin === 'string') return structured.quickWin;
  return 'Ajustar la ruta principal hacia WhatsApp con contexto por servicio y una promesa de claridad, no de urgencia.';
}

export function deriveMinimumSystem(diagnosis: ProspectDiagnosis) {
  const structured = (diagnosis.structured ?? {}) as Record<string, unknown>;
  if (typeof structured.minimumSystem === 'string') return structured.minimumSystem;
  return 'Instagram o Google conectados a una landing por servicio, bloque de confianza, CTA contextual a WhatsApp y seguimiento simple de conversaciones.';
}

export function renderMarkdownBlocks(blocks: ReturnType<typeof parseMarkdown>) {
  return blocks.map((block, index): ReactNode => {
    if (block.type === 'h1') return <h2 key={`md-${index}`}>{block.text}</h2>;
    if (block.type === 'h2') return <h3 key={`md-${index}`}>{block.text}</h3>;
    if (block.type === 'h3') return <h4 key={`md-${index}`}>{block.text}</h4>;
    if (block.type === 'ul') {
      return (
        <ul key={`md-${index}`}>
          {block.items.map((item, itemIndex) => (
            <li key={`md-item-${index}-${itemIndex}`}>{item}</li>
          ))}
        </ul>
      );
    }

    return <p key={`md-${index}`}>{block.text}</p>;
  });
}
