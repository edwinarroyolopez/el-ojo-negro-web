import type { Prospect } from '../types';
import {
  buildInitialWhatsAppOutreachMessage,
  buildInitialWhatsAppScript,
} from './whatsapp-outreach.utils';

function buildProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: 'prospect-1',
    accountId: 'account-1',
    name: 'Dra. Konny Aldana',
    category: 'Medicina estetica',
    city: 'Medellin',
    phones: [],
    sourceUrls: [],
    scores: {},
    priority: 'HIGH',
    status: 'IMPORTED',
    diagnosis: {},
    outreach: {},
    ...overrides,
  };
}

describe('whatsapp-outreach.utils', () => {
  it('builds a humanized first WhatsApp message with curiosity and diagnosis framing', () => {
    const message = buildInitialWhatsAppOutreachMessage(buildProspect({
      diagnosis: {
        summary: 'La marca ya tiene una base reconocible, pero la oportunidad está en ordenar mejor la ruta de decisión.',
      },
    }));

    expect(message).toContain('Hola, Dra.');
    expect(message).toContain('la lectura central del diagnóstico');
    expect(message).toContain('ruta de decisión');
    expect(message).toContain('diagnóstico breve, gratuito y puntual');
  });

  it('builds the longer WhatsApp script with non-generic first contact positioning', () => {
    const script = buildInitialWhatsAppScript(buildProspect({
      diagnosis: {
        summary: 'La marca ya tiene una base reconocible, pero la oportunidad está en ordenar mejor la ruta de decisión.',
      },
    }));

    expect(script).toContain('No te escribo para venderte una página genérica.');
    expect(script).toContain('ruta de decisión');
    expect(script).toContain('diagnóstico breve, gratuito y sin compromiso');
    expect(script).toContain('Si te interesa, te lo comparto por aquí.');
  });
});
