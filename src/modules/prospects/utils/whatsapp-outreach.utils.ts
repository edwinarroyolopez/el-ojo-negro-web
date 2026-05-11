import type { Prospect } from '../types';

function getContactName(prospect: Prospect) {
  return prospect.name.split(' ')[0]?.trim() || prospect.name || 'hola';
}

function getContextLabel(prospect: Prospect) {
  const parts = [prospect.category, prospect.city].filter(Boolean);
  return parts.length ? `${prospect.name}, ${parts.join(' en ')}` : prospect.name;
}

function getDiagnosisLead(prospect: Prospect) {
  const summary = prospect.diagnosis.summary?.trim();
  if (!summary) return undefined;

  const firstSentence = summary.split(/(?<=[.!?])\s+/)[0]?.trim();
  return firstSentence || summary;
}

export function buildInitialWhatsAppOutreachMessage(prospect: Prospect) {
  const contactName = getContactName(prospect);
  const contextLabel = getContextLabel(prospect);
  const diagnosisLead = getDiagnosisLead(prospect);

  return [
    `Hola, ${contactName}. Soy Ed, de El Ojo Negro.`,
    `Estuve revisando ${contextLabel} y me llamó la atención que ya hay una base valiosa sobre la cual construir algo más claro comercialmente.`,
    diagnosisLead
      ? `De hecho, la lectura central del diagnóstico va por aquí: ${diagnosisLead}`
      : 'La oportunidad visible no parece estar en tener más presencia, sino en hacer más fácil que una persona entienda rápido qué ofrece la marca, por qué confiar y cuál es el siguiente paso.',
    'Preparé un diagnóstico breve, gratuito y puntual sobre eso. Si te hace sentido, te lo comparto por aquí.',
  ].join(' ');
}

export function buildInitialWhatsAppScript(prospect: Prospect) {
  const contactName = getContactName(prospect);
  const contextLabel = getContextLabel(prospect);
  const diagnosisLead = getDiagnosisLead(prospect);

  return `Hola, ${contactName}. Soy Ed, de El Ojo Negro.

Estuve revisando ${contextLabel} desde fuentes públicas y vi algo interesante: la marca ya transmite base y señales reales, pero todavía podría ganar mucha claridad en la forma en que una persona entiende qué puede resolver, por qué confiar y cómo escribir.

${diagnosisLead ? `La lectura central del diagnóstico es esta: ${diagnosisLead}

` : ''}No te escribo para venderte una página genérica.

Preparé un diagnóstico breve, gratuito y sin compromiso sobre esa ruta de decisión. La idea es que al verlo puedas detectar oportunidades concretas para ordenar mejor confianza, servicios y contacto.

Si te interesa, te lo comparto por aquí.`;
}
