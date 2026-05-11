import type { Prospect } from '../types';
import {
  buildProspectManualFormValues,
  buildProspectManualUpdatePayload,
} from './prospect-manual-completion.utils';

function buildProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: 'prospect-1',
    accountId: 'account-1',
    name: 'Clinica LIV',
    phones: ['+57 300 123 4567'],
    sourceUrls: ['https://clinicaliv.com', 'https://instagram.com/clinicaliv'],
    scores: {},
    priority: 'HIGH',
    status: 'IMPORTED',
    diagnosis: {},
    outreach: {},
    ...overrides,
  };
}

describe('prospect-manual-completion.utils', () => {
  it('builds form values from the prospect shape', () => {
    const values = buildProspectManualFormValues(
      buildProspect({
        category: 'Clinica estetica',
        city: 'Bogota',
        website: 'https://clinicaliv.com',
      }),
    );

    expect(values.phones).toBe('+57 300 123 4567');
    expect(values.sourceUrls).toBe('https://clinicaliv.com\nhttps://instagram.com/clinicaliv');
    expect(values.category).toBe('Clinica estetica');
    expect(values.website).toBe('https://clinicaliv.com');
  });

  it('normalizes manual completion values into an update payload', () => {
    const payload = buildProspectManualUpdatePayload({
      name: '  Clinica LIV  ',
      category: ' Clinica estetica ',
      city: ' Bogota ',
      country: ' Colombia ',
      phones: '+57 300 123 4567\n+57 310 222 3344',
      website: ' https://clinicaliv.com ',
      instagram: ' @clinicaliv ',
      facebook: '',
      address: ' Calle 123 ',
      description: ' Medicina estetica integral ',
      sourceUrls: 'https://clinicaliv.com, https://instagram.com/clinicaliv',
      evidenceNotes: ' Telefono confirmado manualmente ',
      internalNotes: ' Prioridad alta ',
    });

    expect(payload).toEqual({
      name: 'Clinica LIV',
      category: 'Clinica estetica',
      city: 'Bogota',
      country: 'Colombia',
      phones: ['+57 300 123 4567', '+57 310 222 3344'],
      website: 'https://clinicaliv.com',
      instagram: '@clinicaliv',
      facebook: undefined,
      address: 'Calle 123',
      description: 'Medicina estetica integral',
      sourceUrls: ['https://clinicaliv.com', 'https://instagram.com/clinicaliv'],
      evidenceNotes: 'Telefono confirmado manualmente',
      internalNotes: 'Prioridad alta',
    });
  });
});
