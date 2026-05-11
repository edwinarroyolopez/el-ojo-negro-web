import type { Prospect } from '../types';
import { buildDiagnosisResearchPrompt } from './diagnosis-research-prompt.utils';

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
    status: 'DIAGNOSIS_PENDING',
    diagnosis: {},
    outreach: {},
    ...overrides,
  };
}

describe('diagnosis-research-prompt.utils', () => {
  it('includes the strategic diagnosis guardrails and sprint framing', () => {
    const prompt = buildDiagnosisResearchPrompt(buildProspect());

    expect(prompt).toContain('ruta de decisión');
    expect(prompt).toContain('distancia entre interés y contacto');
    expect(prompt).toContain('sprint');
    expect(prompt).toContain('no inventar métricas');
    expect(prompt).toContain('no afirmar pérdidas comerciales');
    expect(prompt).toContain('fuentes públicas');
  });
});
