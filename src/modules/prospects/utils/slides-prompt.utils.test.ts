import type { Prospect } from '../types';
import { buildSlidesGenerationPrompt } from './slides-prompt.utils';

function buildProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: 'prospect-1',
    accountId: 'account-1',
    name: 'Clinica LIV',
    category: 'Clinica estetica',
    city: 'Bogota',
    phones: ['573001234567'],
    website: 'https://clinicaliv.com',
    instagram: 'https://instagram.com/clinicaliv',
    sourceUrls: ['https://clinicaliv.com'],
    scores: {},
    priority: 'HIGH',
    status: 'DIAGNOSIS_READY',
    diagnosis: {
      title: 'Diagnóstico Express — Clinica LIV',
      summary: 'La marca ya tiene una base reconocible, pero la oportunidad está en ordenar mejor su ruta de decisión.',
      markdown: '# Lectura ejecutiva\nTexto',
      structured: {},
      status: 'READY',
      visibility: 'UNLISTED',
      slug: 'clinica-liv',
    },
    outreach: {},
    ...overrides,
  };
}

describe('slides-prompt.utils', () => {
  it('includes the strategic perception and sprint framing for slides', () => {
    const prompt = buildSlidesGenerationPrompt(buildProspect(), {
      publicUrl: '/diagnosticos/clinica-liv',
    });

    expect(prompt).toContain('ruta de decisión');
    expect(prompt).toContain('distancia entre interés y contacto');
    expect(prompt).toContain('sprint');
    expect(prompt).toContain('no inventes métricas');
    expect(prompt).toContain('no afirmar pérdidas comerciales');
    expect(prompt).toContain('fuentes públicas');
    expect(prompt).toContain('logo visible dentro del website oficial');
  });
});
