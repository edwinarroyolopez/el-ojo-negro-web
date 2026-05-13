import type { Prospect } from '../types';
import { buildInitialWhatsAppScript } from './whatsapp-outreach.utils';

export type OutreachScriptSection = {
  key:
    | 'firstContact'
    | 'shareDiagnosis'
    | 'routeResponded'
    | 'routeNoReply'
    | 'routeSeenNoReply'
    | 'callClose';
  title: string;
  helpText?: string;
  text: string;
};

export function getDiagnosisLink(publicUrl?: string) {
  return publicUrl?.trim() || '[URL DEL DIAGNOSTICO]';
}

export function buildOutreachScriptSections(
  prospect: Prospect,
  publicUrl?: string,
): OutreachScriptSection[] {
  const diagnosisLink = getDiagnosisLink(publicUrl);

  return [
    {
      key: 'firstContact',
      title: '1. Primer contacto',
      text: buildInitialWhatsAppScript(prospect),
    },
    {
      key: 'shareDiagnosis',
      title: '2. Cuando se comparte el diagnostico',
      text: `Le comparto el diagnostico.

Mas que mirar diseno, le sugiero revisar la ruta completa: que entiende una persona, que le genera confianza y que tan facil le queda dar el siguiente paso.

Aqui esta:
${diagnosisLink}`,
    },
    {
      key: 'routeResponded',
      title: 'Ruta A · Respondio',
      helpText: 'No venda todavia. Lleve la revision hacia una llamada breve.',
      text: `Perfecto.

Cuando lo revise, fijese especialmente en la parte de confianza y ruta hacia WhatsApp. Ahi suele estar la diferencia entre "me vieron" y "me escribieron".

Si le hace sentido, agendamos una llamada breve y le muestro que priorizaria primero.`,
    },
    {
      key: 'routeNoReply',
      title: 'Ruta B · No respondio',
      helpText: 'Despues de unas horas o al dia siguiente. No pregunte demasiado rapido si pudo verlo.',
      text: `Le dejo una idea puntual, por si le sirve:

En estetica, muchas veces el problema no es falta de interes; es que la persona no encuentra rapido suficiente claridad para confiar y escribir.

Ese fue el punto principal que vi en su presencia digital.`,
    },
    {
      key: 'routeSeenNoReply',
      title: 'Ruta C · Vio el diagnostico y no respondio',
      helpText: 'Baje la friccion. Ofrezca un audio corto antes de pedir llamada.',
      text: `Vi que ya quedo compartido el diagnostico.

La oportunidad principal no esta en "verse mas bonito", sino en ordenar la percepcion: confianza, servicios y siguiente paso.

Si quiere, puedo decirle en un audio corto cual seria el primer ajuste que atacaria.`,
    },
    {
      key: 'callClose',
      title: '3. Llevar al siguiente nivel',
      text: 'Si al revisarlo siente que hay oportunidad real, coordinamos una llamada breve y miramos juntos como llevar esa ruta al siguiente nivel.',
    },
  ];
}

export function buildOutreachScriptBundle(prospect: Prospect, publicUrl?: string) {
  return buildOutreachScriptSections(prospect, publicUrl)
    .map((section) =>
      `${section.title}${section.helpText ? `\n${section.helpText}` : ''}\n\n${section.text}`,
    )
    .join('\n\n---\n\n');
}
