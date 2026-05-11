import type { Prospect } from '../types';
import { buildInitialWhatsAppScript } from './whatsapp-outreach.utils';

export type OutreachScriptSection = {
  key:
    | 'call'
    | 'whatsappInitial'
    | 'ifTheyReply'
    | 'interestQuestions'
    | 'followUp';
  title: string;
  text: string;
};

function getCompanyName(prospect: Prospect) {
  return prospect.name || 'el negocio';
}

function getCategoryLabel(prospect: Prospect) {
  return prospect.category || 'su categoría';
}

function getCityLabel(prospect: Prospect) {
  return prospect.city || 'su ciudad';
}

export function getDiagnosisLink(publicUrl?: string) {
  return publicUrl?.trim() || '[URL DEL DIAGNÓSTICO]';
}

export function buildOutreachScriptSections(
  prospect: Prospect,
  publicUrl?: string,
): OutreachScriptSection[] {
  const company = getCompanyName(prospect);
  const category = getCategoryLabel(prospect);
  const city = getCityLabel(prospect);
  const diagnosisLink = getDiagnosisLink(publicUrl);
  const contactName = prospect.name.split(' ')[0] || company;

  return [
    {
      key: 'call',
      title: 'Llamada',
      text: `Hola, ¿cómo estás? Te llamo rápido. Soy Ed, de El Ojo Negro.

Estuve revisando la presencia digital de ${company}${category || city ? `, ${category} en ${city}` : ''} y vi una oportunidad interesante: ya tienen señales buenas, pero también algunos puntos donde la ruta hacia WhatsApp, agenda o consulta podría ser más clara.

No te llamo para venderte una página genérica. Estoy preparando diagnósticos express gratuitos para negocios con potencial real. ¿Te lo puedo enviar por WhatsApp para que lo revises sin compromiso?

Si el tema sale, prefiero decirlo así: podría haber oportunidades para que más personas interesadas lleguen con menos fricción a WhatsApp o agenda.`,
    },
    {
      key: 'whatsappInitial',
      title: 'WhatsApp inicial',
      text: buildInitialWhatsAppScript(prospect),
    },
    {
      key: 'ifTheyReply',
      title: 'Si responde',
      text: `Perfecto. Te lo comparto por aquí.

La idea es que te aporte claridad incluso si no hacemos nada después. No es una propuesta genérica: es una lectura puntual sobre ${company}, basada en lo que ya se puede observar públicamente.

${diagnosisLink}

Si pregunta qué hacemos, lo explicaría así:

En El Ojo Negro ayudamos a negocios con potencial real a convertir mejor su presencia digital en conversaciones comerciales.

No se trata solo de hacer una web bonita. Se trata de construir una ruta clara para que alguien que ya vio el negocio, ya tuvo interés y ya confía un poco, pueda entender, escribir y avanzar con menos fricción.`,
    },
    {
      key: 'interestQuestions',
      title: 'Preguntas de interés',
      text: `1. Dolor
“¿Hoy de dónde les llegan más clientes o pacientes: Instagram, referidos, Google o WhatsApp?”

2. Fricción
“Cuando alguien pregunta por WhatsApp, ¿tienen un proceso claro para convertirlo en cita o depende de quién responda?”

3. Ambición
“¿Están buscando crecer este mes o por ahora están cómodos con el flujo actual?”

4. Autoridad
“¿Tú eres quien decide este tipo de mejoras o lo revisa alguien más?”

Estas preguntas no son para interrogar. Son para detectar si hay dolor, fricción, ambición y autoridad antes de ofrecer el siguiente paso.`,
    },
    {
      key: 'followUp',
      title: 'Seguimiento',
      text: `Hola, ${contactName}. Te dejo una nota rápida para no invadir.

La razón por la que te escribí es porque vi señales interesantes en la presencia digital de ${company} y creo que hay oportunidades concretas para mejorar claridad, confianza y conversión hacia WhatsApp o agenda.

Si te parece útil, te comparto el diagnóstico express gratuito por aquí.

Si ya hubo llamada, puedes usar esta variante:

Hola, ${contactName}. Soy Ed, de El Ojo Negro.

Gracias por atenderme hace un momento.

Como te comenté, revisé la presencia digital de ${company} y preparé un diagnóstico express gratuito con oportunidades visibles para mejorar claridad, confianza y conversión hacia WhatsApp o agenda.

Te lo dejo aquí:
${diagnosisLink}

La idea es que te aporte valor incluso si no hacemos nada después.`,
    },
  ];
}

export function buildOutreachScriptBundle(prospect: Prospect, publicUrl?: string) {
  return buildOutreachScriptSections(prospect, publicUrl)
    .map((section) => `${section.title}\n\n${section.text}`)
    .join('\n\n---\n\n');
}
