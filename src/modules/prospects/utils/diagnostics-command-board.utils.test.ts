import type { Prospect } from '../types';
import {
  filterDiagnosticsProspects,
  getDiagnosisDeckSummary,
  getInstagramUrl,
  getPublicDiagnosisPath,
  isDiagnosedProspect,
  sortDiagnosticsProspects,
} from './diagnostics-command-board.utils';

function buildProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: overrides.id ?? 'prospect-1',
    accountId: overrides.accountId ?? 'account-1',
    name: overrides.name ?? 'Clinica LIV',
    category: overrides.category ?? 'Medicina estética',
    city: overrides.city ?? 'Medellín',
    country: overrides.country,
    phones: overrides.phones ?? [],
    website: overrides.website,
    instagram: overrides.instagram,
    facebook: overrides.facebook,
    address: overrides.address,
    description: overrides.description,
    sourceUrls: overrides.sourceUrls ?? [],
    evidenceNotes: overrides.evidenceNotes,
    internalNotes: overrides.internalNotes,
    rawPayload: overrides.rawPayload,
    rawDiscovery: overrides.rawDiscovery,
    normalizedCandidate: overrides.normalizedCandidate,
    providerIntelligence: overrides.providerIntelligence,
    importProjection: overrides.importProjection,
    signals: overrides.signals,
    scores: overrides.scores ?? {
      growthOpportunityScore: 72,
      confidenceScore: 61,
    },
    priority: overrides.priority ?? 'HIGH',
    status: overrides.status ?? 'DIAGNOSIS_DRAFT',
    diagnosis: {
      status: 'DRAFT',
      summary: 'Ruta comercial por ordenar.',
      structured: {},
      ...(overrides.diagnosis ?? {}),
    },
    outreach: overrides.outreach ?? {},
    normalizedWebsite: overrides.normalizedWebsite,
    normalizedInstagram: overrides.normalizedInstagram,
    normalizedPhones: overrides.normalizedPhones,
    normalizedPrimaryPhone: overrides.normalizedPrimaryPhone,
    lastStatusChangedAt: overrides.lastStatusChangedAt,
    createdAt: overrides.createdAt,
    updatedAt: overrides.updatedAt,
  };
}

describe('diagnostics-command-board.utils', () => {
  it('returns true for prospect diagnosis statuses', () => {
    expect(isDiagnosedProspect(buildProspect({ status: 'DIAGNOSIS_DRAFT' }))).toBe(true);
    expect(isDiagnosedProspect(buildProspect({ status: 'DIAGNOSIS_READY' }))).toBe(true);
    expect(isDiagnosedProspect(buildProspect({ status: 'DIAGNOSIS_PUBLISHED' }))).toBe(true);
  });

  it('returns true for diagnosis status draft ready published', () => {
    expect(isDiagnosedProspect(buildProspect({ status: 'IMPORTED', diagnosis: { status: 'DRAFT' } }))).toBe(true);
    expect(isDiagnosedProspect(buildProspect({ status: 'IMPORTED', diagnosis: { status: 'READY' } }))).toBe(true);
    expect(isDiagnosedProspect(buildProspect({ status: 'IMPORTED', diagnosis: { status: 'PUBLISHED' } }))).toBe(true);
  });

  it('returns false for imported prospect without diagnosis', () => {
    expect(
      isDiagnosedProspect(
        buildProspect({
          status: 'IMPORTED',
          diagnosis: { status: 'EMPTY', summary: '', markdown: '', title: '' },
        }),
      ),
    ).toBe(false);
  });

  it('returns deck summary for empty incomplete and ready', () => {
    expect(getDiagnosisDeckSummary(buildProspect({ diagnosis: { structured: {} } }))).toBe('Sin deck');

    expect(
      getDiagnosisDeckSummary(
        buildProspect({
          diagnosis: {
            structured: {
              slideDeck: {
                slides: [
                  { role: 'cover', order: 0, title: '1', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true },
                  { role: 'strengths', order: 1, title: '2', imageUrl: '2.jpg', alt: '2', sectionKey: 'strengths', isVisible: true },
                ],
              },
            },
          },
        }),
      ),
    ).toBe('Deck 2/4');

    expect(
      getDiagnosisDeckSummary(
        buildProspect({
          diagnosis: {
            structured: {
              slideDeck: {
                slides: [
                  { role: 'cover', order: 0, title: '1', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true },
                  { role: 'strengths', order: 1, title: '2', imageUrl: '2.jpg', alt: '2', sectionKey: 'strengths', isVisible: true },
                  { role: 'opportunities', order: 2, title: '3', imageUrl: '3.jpg', alt: '3', sectionKey: 'opportunities', isVisible: true },
                  { role: 'nextStep', order: 3, title: '4', imageUrl: '4.jpg', alt: '4', sectionKey: 'nextStep', isVisible: true },
                ],
              },
            },
          },
        }),
      ),
    ).toBe('Deck 4/4');
  });

  it('filters prospects by text search', () => {
    const items = [
      buildProspect({ id: '1', name: 'Clinica LIV', city: 'Medellín' }),
      buildProspect({ id: '2', name: 'Aura Dental', city: 'Sabaneta' }),
    ];

    const results = filterDiagnosticsProspects(items, { search: 'sabaneta', quickFilter: 'all' });

    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('2');
  });

  it('sorts by opportunity confidence and name', () => {
    const alpha = buildProspect({ id: '1', name: 'Alpha', scores: { growthOpportunityScore: 20, confidenceScore: 70 } });
    const beta = buildProspect({ id: '2', name: 'Beta', scores: { growthOpportunityScore: 90, confidenceScore: 50 } });
    const gamma = buildProspect({ id: '3', name: 'Gamma', scores: { growthOpportunityScore: 40, confidenceScore: 95 } });
    const items = [gamma, alpha, beta];

    expect(sortDiagnosticsProspects(items, 'opportunity').map((item) => item.id)).toEqual(['2', '3', '1']);
    expect(sortDiagnosticsProspects(items, 'confidence').map((item) => item.id)).toEqual(['3', '1', '2']);
    expect(sortDiagnosticsProspects(items, 'name').map((item) => item.id)).toEqual(['1', '2', '3']);
  });

  it('returns public path only for publishable diagnosis', () => {
    expect(getPublicDiagnosisPath(buildProspect({ diagnosis: { slug: 'clinica-liv', status: 'PUBLISHED' } }))).toBe('/diagnosticos/clinica-liv');
    expect(getPublicDiagnosisPath(buildProspect({ diagnosis: { slug: 'clinica-liv', status: 'READY', visibility: 'UNLISTED' } }))).toBe('/diagnosticos/clinica-liv');
    expect(getPublicDiagnosisPath(buildProspect({ diagnosis: { slug: 'clinica-liv', status: 'READY', visibility: 'PRIVATE' } }))).toBeNull();
  });

  it('normalizes instagram handles and urls', () => {
    expect(getInstagramUrl('@clinicaliv')).toBe('https://instagram.com/clinicaliv');
    expect(getInstagramUrl('https://instagram.com/clinicaliv')).toBe('https://instagram.com/clinicaliv');
  });
});
