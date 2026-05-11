import type { Prospect, UpdateProspectPayload } from '../types';

export type ProspectManualFormValues = {
  name: string;
  category: string;
  city: string;
  country: string;
  phones: string;
  website: string;
  instagram: string;
  facebook: string;
  address: string;
  description: string;
  sourceUrls: string;
  evidenceNotes: string;
  internalNotes: string;
};

function trimOrUndefined(value: string) {
  const trimmed = value.trim();
  return trimmed || undefined;
}

function parseList(value: string) {
  return value
    .split(/\r?\n|,|;/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function buildProspectManualFormValues(prospect: Prospect): ProspectManualFormValues {
  return {
    name: prospect.name ?? '',
    category: prospect.category ?? '',
    city: prospect.city ?? '',
    country: prospect.country ?? '',
    phones: prospect.phones.join('\n'),
    website: prospect.website ?? '',
    instagram: prospect.instagram ?? '',
    facebook: prospect.facebook ?? '',
    address: prospect.address ?? '',
    description: prospect.description ?? '',
    sourceUrls: prospect.sourceUrls.join('\n'),
    evidenceNotes: prospect.evidenceNotes ?? '',
    internalNotes: prospect.internalNotes ?? '',
  };
}

export function buildProspectManualUpdatePayload(values: ProspectManualFormValues): UpdateProspectPayload {
  return {
    name: values.name.trim() || 'Prospecto sin nombre',
    category: trimOrUndefined(values.category),
    city: trimOrUndefined(values.city),
    country: trimOrUndefined(values.country),
    phones: parseList(values.phones),
    website: trimOrUndefined(values.website),
    instagram: trimOrUndefined(values.instagram),
    facebook: trimOrUndefined(values.facebook),
    address: trimOrUndefined(values.address),
    description: trimOrUndefined(values.description),
    sourceUrls: parseList(values.sourceUrls),
    evidenceNotes: trimOrUndefined(values.evidenceNotes),
    internalNotes: trimOrUndefined(values.internalNotes),
  };
}
