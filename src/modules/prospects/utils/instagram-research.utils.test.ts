import type { Prospect } from '../types';
import {
  buildInstagramResearchPrompt,
  getInstagramFollowersValue,
  getInstagramPostsValue,
  parseInstagramResearchJson,
} from './instagram-research.utils';

function buildProspect(overrides: Partial<Prospect> = {}): Prospect {
  return {
    id: 'prospect-1',
    accountId: 'account-1',
    name: 'Clinica LIV',
    category: 'Clinica estetica',
    city: 'Bogota',
    country: 'Colombia',
    phones: ['573001234567'],
    website: 'https://clinicaliv.com',
    instagram: '@clinicaliv',
    description: 'Clinica con presencia premium.',
    sourceUrls: ['https://clinicaliv.com'],
    evidenceNotes: 'Tiene sitio e Instagram.',
    scores: {
      confidenceScore: 82,
      growthOpportunityScore: 77,
      commerceReadinessScore: 69,
    },
    priority: 'HIGH',
    status: 'DIAGNOSIS_PENDING',
    diagnosis: {},
    outreach: {},
    ...overrides,
  };
}

describe('instagram-research.utils', () => {
  it('includes name, category, city, website and instagram in the prompt', () => {
    const prompt = buildInstagramResearchPrompt(buildProspect());

    expect(prompt).toContain('Marca / empresa: Clinica LIV');
    expect(prompt).toContain('Categoría: Clinica estetica');
    expect(prompt).toContain('Ubicación: Bogota, Colombia');
    expect(prompt).toContain('Sitio web: https://clinicaliv.com');
    expect(prompt).toContain('Instagram: @clinicaliv');
    expect(prompt).toContain('bloque de codigo ```json```');
    expect(prompt).toContain('Sin referencias, citas ni notas al pie fuera del JSON.');
  });

  it('accepts a valid instagram research object', () => {
    const result = parseInstagramResearchJson(
      JSON.stringify({
        channel: 'instagram',
        doNotInvent: true,
        observedSignals: {
          followersCountObserved: 55000,
        },
      }),
    );

    expect(result.isValid).toBe(true);
    expect(result.payload?.channel).toBe('instagram');
  });

  it('accepts valid instagram research wrapped in a json code block', () => {
    const fencedJson = [
      '```json',
      '{"channel":"instagram","doNotInvent":true,"observedSignals":{"followersCountObserved":55000}}',
      '```',
    ].join('\n');
    const result = parseInstagramResearchJson(fencedJson);

    expect(result.isValid).toBe(true);
    expect(result.payload?.doNotInvent).toBe(true);
  });

  it('rejects invalid json', () => {
    const result = parseInstagramResearchJson('{invalid');

    expect(result.isValid).toBe(false);
    expect(result.error).toContain('no es JSON válido');
  });

  it('extracts followers from observedSignals.followersCountObserved', () => {
    const value = getInstagramFollowersValue({
      observedSignals: {
        followersCountObserved: 55000,
      },
    });

    expect(value).toBe(55000);
  });

  it('extracts posts from observedSignals.postsCountObserved', () => {
    const value = getInstagramPostsValue({
      observedSignals: {
        postsCountObserved: 341,
      },
    });

    expect(value).toBe(341);
  });

  it('returns null when there is no instagram data', () => {
    expect(getInstagramFollowersValue(undefined)).toBeNull();
    expect(getInstagramPostsValue(undefined)).toBeNull();
  });
});
