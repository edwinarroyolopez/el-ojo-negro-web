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
  it('builds a short premium first WhatsApp message with doctor treatment', () => {
    const message = buildInitialWhatsAppOutreachMessage(buildProspect({
      diagnosis: {
        summary: 'La marca ya tiene una base reconocible, pero la oportunidad está en ordenar mejor la ruta de decisión.',
      },
    }));

    expect(message).toContain('Hola, Dra. Aldana.');
    expect(message).toContain('ruta hacia WhatsApp o agendamiento');
    expect(message).toContain('lectura breve, visual y sin compromiso');
    expect(message).toContain('Se la puedo compartir por aqui?');
  });

  it('uses the business name when the prospect is a brand instead of a personal contact', () => {
    const message = buildInitialWhatsAppOutreachMessage(buildProspect({
      name: 'Clinica Aura Dental',
    }));

    expect(message).toContain('Hola, Clinica Aura Dental.');
  });

  it('reuses the same short premium script for the first contact guide', () => {
    const script = buildInitialWhatsAppScript(buildProspect({
      diagnosis: {
        summary: 'La marca ya tiene una base reconocible, pero la oportunidad está en ordenar mejor la ruta de decisión.',
      },
    }));

    expect(script).toContain('Hola, Dra. Aldana.');
    expect(script).toContain('lectura breve, visual y sin compromiso');
    expect(script).toContain('Se la puedo compartir por aqui?');
  });
});
