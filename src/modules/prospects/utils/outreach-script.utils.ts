import type { Prospect } from '../types';

export type OutreachScriptSection = {
  key: 'opening' | 'whatDoYouSell' | 'sendMeInfo' | 'whatsappFollowUp';
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

  return [
    {
      key: 'opening',
      title: 'Apertura de llamada',
      text: `Hola, ¿cómo estás? Te llamo rápido. Soy Ed, de El Ojo Negro.

Estuve revisando la presencia digital de ${company}${category || city ? `, ${category} en ${city}` : ''} y vi una oportunidad interesante: ya tienen señales buenas, pero también algunos puntos donde la ruta hacia WhatsApp, agenda o consulta podría ser más clara.

No te llamo para venderte una página genérica. Estoy preparando diagnósticos express gratuitos para negocios con potencial real. ¿Te lo puedo enviar por WhatsApp para que lo revises sin compromiso?`,
    },
    {
      key: 'whatDoYouSell',
      title: 'Si pregunta “¿qué vendes?”',
      text: `Construyo sistemas de captación: una landing clara, mensajes de WhatsApp mejor armados y una ruta para que quien ya está interesado pueda entender, confiar y escribir con menos fricción.

Pero primero prefiero mostrarte el diagnóstico, porque vender sin entender el negocio sería disparar con los ojos vendados.`,
    },
    {
      key: 'sendMeInfo',
      title: 'Si dice “mándame información”',
      text: `Claro. Te mando algo mejor que información genérica: te mando un diagnóstico corto sobre el caso puntual de ${company}, con 3 oportunidades concretas y una mejora rápida que pueden aplicar.`,
    },
    {
      key: 'whatsappFollowUp',
      title: 'WhatsApp posterior',
      text: `Hola, ${company}. Soy Ed, de El Ojo Negro.

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
