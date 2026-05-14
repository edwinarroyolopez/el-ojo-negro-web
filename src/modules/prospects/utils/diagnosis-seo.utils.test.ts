import type { DiagnosisSeoMetadata } from './diagnosis-seo.utils';
import {
  buildSeoMetadataPrompt,
  calculateDiagnosisSeoStatus,
  mergeDiagnosisSeoIntoStructured,
  validateSeoMetadataJson,
} from './diagnosis-seo.utils';
import type { Prospect } from '../types';

function buildProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: 'prospect-1',
    accountId: 'account-1',
    name: 'Clinica LIV',
    category: 'Clinica estetica',
    city: 'Bogota',
    phones: ['573001234567'],
    sourceUrls: ['https://clinicaliv.com'],
    website: 'https://clinicaliv.com',
    instagram: '@clinicaliv',
    scores: {},
    priority: 'HIGH',
    status: 'DIAGNOSIS_READY',
    diagnosis: {},
    outreach: {},
    ...overrides,
  };
}

describe('diagnosis-seo.utils', () => {
  it('requests json output inside a code block for SEO metadata', () => {
    const prompt = buildSeoMetadataPrompt(buildProspect());

    expect(prompt).toContain('bloque de codigo ```json```');
    expect(prompt).toContain('no agregues markdown adicional, comentarios, referencias ni explicaciones');
  });

  it('validates the expected JSON shape', () => {
    const result = validateSeoMetadataJson(
      '{"title":"Diagnostico Express para Clinica LIV con una lectura clara de confianza digital","description":"Una lectura ejecutiva, sobria y comercialmente clara sobre la presencia digital de Clinica LIV, su confianza percibida y su ruta de conversion hacia WhatsApp."}',
    );

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.payload).toEqual({
      title: 'Diagnostico Express para Clinica LIV con una lectura clara de confianza digital',
      description:
        'Una lectura ejecutiva, sobria y comercialmente clara sobre la presencia digital de Clinica LIV, su confianza percibida y su ruta de conversion hacia WhatsApp.',
    });
  });

  it('accepts seo JSON wrapped in a json code block', () => {
    const fencedJson = [
      '```json',
      '{"title":"Diagnostico Express para Clinica LIV con una lectura clara de confianza digital","description":"Una lectura ejecutiva, sobria y comercialmente clara sobre la presencia digital de Clinica LIV, su confianza percibida y su ruta de conversion hacia WhatsApp."}',
      '```',
    ].join('\n');
    const result = validateSeoMetadataJson(fencedJson);

    expect(result.isValid).toBe(true);
    expect(result.payload?.title).toContain('Clinica LIV');
  });

  it('rejects invalid seo JSON formats', () => {
    expect(validateSeoMetadataJson('texto libre').isValid).toBe(false);
    expect(validateSeoMetadataJson('{"seoTitle":"x"}').errors).toContain(
      'El JSON solo puede incluir `title` y `description`.',
    );
    expect(validateSeoMetadataJson('[{"title":"x"}]').errors).toContain(
      'Debes pegar un JSON valido en formato objeto.',
    );
  });

  it('returns warnings when title or description are outside recommended ranges', () => {
    const result = validateSeoMetadataJson(
      '{"title":"Titulo corto","description":"Descripcion corta"}',
    );

    expect(result.isValid).toBe(true);
    expect(result.warnings).toEqual([
      '`title` funciona mejor entre 35 y 90 caracteres.',
      '`description` funciona mejor entre 90 y 180 caracteres.',
    ]);
  });

  it('calculates EMPTY, INCOMPLETE and READY statuses', () => {
    expect(calculateDiagnosisSeoStatus()).toBe('EMPTY');
    expect(
      calculateDiagnosisSeoStatus({
        title: 'Titulo listo',
        description: 'Descripcion lista',
      }),
    ).toBe('INCOMPLETE');
    expect(
      calculateDiagnosisSeoStatus({
        title: 'Titulo listo',
        description: 'Descripcion lista',
        imageUrl: 'https://example.com/og.jpg',
      }),
    ).toBe('READY');
  });

  it('preserves existing structured fields when inserting seo', () => {
    const seo: DiagnosisSeoMetadata = {
      version: 1,
      status: 'READY',
      title: 'Preview listo para compartir',
      description: 'Descripcion sobria, clara y especifica del prospecto.',
      imageUrl: 'https://example.com/og.jpg',
      imagePublicId: 'seo-1',
      imageAlt: 'Preview SEO del diagnostico',
      updatedAt: '2026-05-10T10:00:00.000Z',
    };

    const merged = mergeDiagnosisSeoIntoStructured(
      {
        slideDeck: { version: 1, status: 'READY', slides: [] },
        sections: { executiveReading: 'Texto existente' },
        quickWin: 'Mantener CTA actual',
        whatsappUrl: 'https://wa.me/573001234567',
      },
      seo,
    );

    expect(merged.sections).toEqual({ executiveReading: 'Texto existente' });
    expect(merged.quickWin).toBe('Mantener CTA actual');
    expect(merged.whatsappUrl).toBe('https://wa.me/573001234567');
    expect(merged.slideDeck).toEqual({ version: 1, status: 'READY', slides: [] });
    expect(merged.seo).toEqual({
      ...seo,
      status: 'READY',
    });
  });
});
