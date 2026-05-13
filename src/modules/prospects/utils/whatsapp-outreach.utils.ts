import type { Prospect } from '../types';

const DOCTOR_TOKENS = ['dr', 'dr.', 'doctor', 'dra', 'dra.', 'doctora'];
const BUSINESS_HINTS = [
  'clinica',
  'clínica',
  'centro',
  'dental',
  'estetica',
  'estética',
  'medicina',
  'medical',
  'spa',
  'studio',
  'estudio',
  'ips',
  'sas',
  'ltda',
  'group',
  'company',
  'laboratorio',
  'hospital',
];

function normalizeToken(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getCleanNameTokens(name: string) {
  return name
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function getDoctorPrefix(name: string) {
  const tokens = getCleanNameTokens(name).map(normalizeToken);
  if (!tokens.length) return undefined;

  if (tokens.some((token) => token === 'dra' || token === 'dra.' || token === 'doctora')) {
    return 'Dra.';
  }

  if (tokens.some((token) => token === 'dr' || token === 'dr.' || token === 'doctor')) {
    return 'Dr.';
  }

  return undefined;
}

function looksLikeBusinessName(name: string) {
  const normalized = normalizeToken(name);
  return BUSINESS_HINTS.some((hint) => normalized.includes(hint));
}

function getContactName(prospect: Prospect) {
  const rawName = prospect.name.trim();
  const tokens = getCleanNameTokens(rawName);
  const doctorPrefix = getDoctorPrefix(rawName);

  if (doctorPrefix) {
    const nonHonorificTokens = tokens.filter(
      (token) => !DOCTOR_TOKENS.includes(normalizeToken(token)),
    );
    const preferredName = nonHonorificTokens.at(-1) || nonHonorificTokens[0] || rawName;
    return `${doctorPrefix} ${preferredName.replace(/^[,.-]+|[,.-]+$/g, '')}`.trim();
  }

  if (!looksLikeBusinessName(rawName) && tokens.length >= 2) {
    return tokens[0];
  }

  return rawName || 'su marca';
}

function getContextHint(prospect: Prospect) {
  if (prospect.city && prospect.category) {
    return `${prospect.category} en ${prospect.city}`;
  }

  return prospect.category || prospect.city;
}

export function buildInitialWhatsAppOutreachMessage(prospect: Prospect) {
  const contactName = getContactName(prospect);
  const contextHint = getContextHint(prospect);
  const secondParagraph = contextHint
    ? `Estuve revisando su presencia digital en ${contextHint} y vi una oportunidad concreta: la marca ya genera señales de confianza, pero la ruta hacia WhatsApp o agendamiento podria sentirse mas clara para una persona que todavia esta decidiendo.`
    : 'Estuve revisando su presencia digital y vi una oportunidad concreta: la marca ya genera senales de confianza, pero la ruta hacia WhatsApp o agendamiento podria sentirse mas clara para una persona que todavia esta decidiendo.';

  return [
    `Hola, ${contactName}. Soy Ed, de El Ojo Negro.`,
    secondParagraph,
    'Prepare una lectura breve, visual y sin compromiso sobre eso.',
    'Se la puedo compartir por aqui?',
  ].join('\n\n');
}

export function buildInitialWhatsAppScript(prospect: Prospect) {
  return buildInitialWhatsAppOutreachMessage(prospect);
}
