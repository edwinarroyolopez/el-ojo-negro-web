'use client';

import type { ReactNode } from 'react';
import type { Prospect, ProspectDiagnosis } from './types';

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
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function parseImportPayload(value: string) {
  const payload = safeParseJson(value);
  if (!payload) return [] as unknown[];

  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;
    const collections = ['items', 'prospects', 'results', 'leads', 'data'];
    for (const key of collections) {
      if (Array.isArray(record[key])) return record[key] as unknown[];
    }
    return [record];
  }

  return [] as unknown[];
}

export function summarizeImportPayload(value: string) {
  const items = parseImportPayload(value);
  const categoryCounter = new Map<string, number>();
  const cityCounter = new Map<string, number>();
  const signals = new Set<string>();

  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const category = pickString(record, ['category', 'industry', 'segment']);
    const city = pickString(record, ['city', 'locationCity', 'municipality']);
    const website = pickString(record, ['website', 'site', 'url']);
    const instagram = pickString(record, ['instagram', 'instagramUrl']);
    const whatsapp = pickString(record, ['whatsapp', 'phone']);

    if (category) categoryCounter.set(category, (categoryCounter.get(category) ?? 0) + 1);
    if (city) cityCounter.set(city, (cityCounter.get(city) ?? 0) + 1);
    if (website) signals.add('Sitio detectado');
    if (instagram) signals.add('Instagram detectado');
    if (whatsapp) signals.add('Telefono o WhatsApp detectado');
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
  const payload = JSON.stringify(prospect, null, 2);

  return [
    'Actua como estratega digital senior de El Ojo Negro.',
    'Construye un diagnostico publico cuidadoso a partir de este prospecto.',
    'Reglas obligatorias:',
    '- no inventes metricas ni hechos no observables',
    '- no digas que el prospecto pierde clientes como hecho',
    '- usa lenguaje de oportunidad: se observa, podria mejorar, hay una oportunidad visible',
    '- prioriza claridad, confianza, WhatsApp, mobile, Google, Instagram y web',
    '- mantén un tono sobrio, editorial y sereno',
    '- separa: resumen ejecutivo, señales positivas, tres oportunidades, sistema minimo recomendado y mejora rapida',
    '- si propones CTA o embudos, preséntalos como recomendación, no promesa',
    '',
    'Prospecto JSON:',
    payload,
  ].join('\n');
}

export function buildWhatsAppMessage(prospect: Prospect) {
  return [
    `Hola ${prospect.name}.`,
    'Estuve revisando su presencia digital con mirada externa y encontré una oportunidad visible para ordenar mejor el recorrido entre confianza, servicios y conversion hacia WhatsApp.',
    'Si le sirve, puedo compartirle un diagnostico breve y privado para conversar sobre mejoras concretas.',
  ].join(' ');
}

export function diagnosisToFormState(diagnosis?: ProspectDiagnosis) {
  return {
    title: diagnosis?.title ?? '',
    slug: diagnosis?.slug ?? '',
    visibility: diagnosis?.visibility ?? 'PRIVATE',
    status: diagnosis?.status ?? 'DRAFT',
    summary: diagnosis?.summary ?? '',
    publicNotes: diagnosis?.publicNotes ?? '',
    markdown: diagnosis?.markdown ?? '',
    scoresJson: diagnosis?.scores ? JSON.stringify(diagnosis.scores, null, 2) : '',
    structuredJson: diagnosis?.structured ? JSON.stringify(diagnosis.structured, null, 2) : '',
  };
}

export function parseEditorJson(value: string) {
  if (!value.trim()) return undefined;
  return safeParseJson<Record<string, unknown> | Array<Record<string, unknown>>>(value) ?? undefined;
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
