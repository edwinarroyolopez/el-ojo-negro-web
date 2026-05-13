import type { Prospect } from '../types';
import {
  buildOutreachScriptBundle,
  buildOutreachScriptSections,
} from './outreach-script.utils';

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

describe('outreach-script.utils', () => {
  it('builds the premium WhatsApp outreach sequence with route-based follow-ups', () => {
    const sections = buildOutreachScriptSections(
      buildProspect(),
      '/diagnosticos/dra-konny-aldana',
    );

    expect(sections.map((section) => section.title)).toEqual([
      '1. Primer contacto',
      '2. Cuando se comparte el diagnostico',
      'Ruta A · Respondio',
      'Ruta B · No respondio',
      'Ruta C · Vio el diagnostico y no respondio',
      '3. Llevar al siguiente nivel',
    ]);
    expect(sections[1]?.text).toContain('/diagnosticos/dra-konny-aldana');
    expect(sections[2]?.helpText).toContain('No venda todavia');
    expect(sections[4]?.text).toContain('audio corto');
  });

  it('includes helper notes when copying the full outreach bundle', () => {
    const bundle = buildOutreachScriptBundle(buildProspect(), '/diagnosticos/dra-konny-aldana');

    expect(bundle).toContain('Ruta A · Respondio');
    expect(bundle).toContain('No venda todavia. Lleve la revision hacia una llamada breve.');
    expect(bundle).toContain('/diagnosticos/dra-konny-aldana');
  });
});
