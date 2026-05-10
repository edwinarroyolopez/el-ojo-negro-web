import { getDiagnosisSlideDeck, getVisibleDiagnosisSlides } from './diagnosis-slide-deck.utils';
import type {
  DiagnosisStatus,
  Prospect,
  ProspectDiagnosis,
  ProspectStatus,
} from '../types';

export type DiagnosticsQuickFilter = 'all' | 'published' | 'ready' | 'draft' | 'hasDeck' | 'highOpportunity';

export type DiagnosticsSortMode = 'action' | 'opportunity' | 'confidence' | 'recent' | 'name';

export type DiagnosticsBoardStatus = 'PUBLISHED' | 'READY' | 'DRAFT';

export type DiagnosticsBoardStatusTone = 'green' | 'gold' | 'neutral';

export type DiagnosticsBoardFilters = {
  search: string;
  quickFilter: DiagnosticsQuickFilter;
};

export type DiagnosticsBoardMetrics = {
  total: number;
  published: number;
  readyToAct: number;
  averageOpportunity: number;
};

const DIAGNOSED_PROSPECT_STATUSES: ProspectStatus[] = [
  'DIAGNOSIS_DRAFT',
  'DIAGNOSIS_READY',
  'DIAGNOSIS_PUBLISHED',
];

const DIAGNOSED_DIAGNOSIS_STATUSES: DiagnosisStatus[] = ['DRAFT', 'READY', 'PUBLISHED'];

function hasContent(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0;
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getDiagnosisScoresEntries(scores: ProspectDiagnosis['scores']) {
  if (Array.isArray(scores)) {
    return scores.filter((entry): entry is Record<string, unknown> => Boolean(entry) && typeof entry === 'object');
  }

  if (scores && typeof scores === 'object') {
    return [scores as Record<string, unknown>];
  }

  return [] as Array<Record<string, unknown>>;
}

function getNumericValue(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === 'string' && value.trim() && Number.isFinite(Number(value))) {
      return Number(value);
    }
  }

  return null;
}

function getArrayMetricValue(entries: Array<Record<string, unknown>>, aliases: string[]) {
  for (const entry of entries) {
    const metricName = [entry.key, entry.name, entry.metric, entry.label]
      .filter((value): value is string => typeof value === 'string')
      .map((value) => value.toLowerCase());

    if (!metricName.some((value) => aliases.includes(value))) {
      continue;
    }

    const value = getNumericValue(entry, ['value', 'score', 'amount']);
    if (value !== null) {
      return value;
    }
  }

  return null;
}

function getDiagnosisScoreValue(scores: ProspectDiagnosis['scores'], keys: string[], aliases: string[]) {
  const entries = getDiagnosisScoresEntries(scores);

  for (const entry of entries) {
    const directValue = getNumericValue(entry, keys);
    if (directValue !== null) {
      return directValue;
    }
  }

  return getArrayMetricValue(entries, aliases);
}

function getDeckVisibleCount(prospect: Prospect) {
  return getVisibleDiagnosisSlides(getDiagnosisSlideDeck(prospect.diagnosis, prospect.name)).length;
}

function getSortTimestamp(prospect: Prospect) {
  const value = prospect.diagnosis.lastEditedAt ?? prospect.updatedAt ?? prospect.createdAt;
  return value ? new Date(value).getTime() : 0;
}

function getActionPriority(prospect: Prospect) {
  const status = getDiagnosisBoardStatus(prospect);
  const deckSummary = getDiagnosisDeckSummary(prospect);

  if (status === 'PUBLISHED' && prospect.outreach.lastContactedAt) return 6;
  if (status === 'PUBLISHED') return 5;
  if (status === 'READY' && deckSummary === 'Deck 4/4') return 4;
  if (status === 'READY') return 3;
  if (status === 'DRAFT') return 2;
  return 1;
}

export function isDiagnosedProspect(prospect: Prospect) {
  return (
    DIAGNOSED_PROSPECT_STATUSES.includes(prospect.status) ||
    DIAGNOSED_DIAGNOSIS_STATUSES.includes(prospect.diagnosis.status ?? 'EMPTY') ||
    hasContent(prospect.diagnosis.summary) ||
    hasContent(prospect.diagnosis.markdown) ||
    hasContent(prospect.diagnosis.title)
  );
}

export function getDiagnosisBoardStatus(prospect: Prospect): DiagnosticsBoardStatus {
  if (prospect.diagnosis.status === 'PUBLISHED' || prospect.status === 'DIAGNOSIS_PUBLISHED') {
    return 'PUBLISHED';
  }

  if (prospect.diagnosis.status === 'READY' || prospect.status === 'DIAGNOSIS_READY') {
    return 'READY';
  }

  return 'DRAFT';
}

export function getDiagnosisBoardStatusLabel(prospect: Prospect) {
  const status = getDiagnosisBoardStatus(prospect);
  if (status === 'PUBLISHED') return 'Publicado';
  if (status === 'READY') return 'Listo';
  return 'Borrador';
}

export function getDiagnosisBoardStatusTone(prospect: Prospect): DiagnosticsBoardStatusTone {
  const status = getDiagnosisBoardStatus(prospect);
  if (status === 'PUBLISHED') return 'green';
  if (status === 'READY') return 'gold';
  return 'neutral';
}

export function getDiagnosisDeckSummary(prospect: Prospect) {
  const visibleCount = getDeckVisibleCount(prospect);
  if (visibleCount === 0) return 'Sin deck';
  if (visibleCount >= 4) return 'Deck 4/4';
  return `Deck ${visibleCount}/4`;
}

export function getProspectOpportunityScore(prospect: Prospect) {
  const diagnosisScore = getDiagnosisScoreValue(
    prospect.diagnosis.scores,
    ['growthOpportunityScore', 'commercial', 'growth', 'commercialScore', 'opportunityScore'],
    ['growthopportunityscore', 'commercial', 'growth', 'commercialscore', 'opportunityscore'],
  );

  if (diagnosisScore !== null) {
    return clampScore(diagnosisScore);
  }

  return clampScore(prospect.scores.growthOpportunityScore ?? 0);
}

export function getProspectConfidenceScore(prospect: Prospect) {
  const diagnosisScore = getDiagnosisScoreValue(
    prospect.diagnosis.scores,
    ['confidence', 'confidenceScore'],
    ['confidence', 'confidencescore'],
  );

  if (diagnosisScore !== null) {
    return clampScore(diagnosisScore);
  }

  return clampScore(prospect.scores.confidenceScore ?? 0);
}

export function getProspectNextBestAction(prospect: Prospect) {
  const status = prospect.diagnosis.status ?? 'EMPTY';
  const boardStatus = getDiagnosisBoardStatus(prospect);
  const deck = getDiagnosisSlideDeck(prospect.diagnosis, prospect.name);

  if (!prospect.diagnosis || (status === 'EMPTY' && boardStatus === 'DRAFT')) {
    return 'Completar diagnóstico antes de actuar.';
  }

  if (status === 'DRAFT' || boardStatus === 'DRAFT') {
    return 'Cerrar lectura ejecutiva y preparar versión lista.';
  }

  if ((status === 'READY' || boardStatus === 'READY') && deck.status !== 'READY') {
    return 'Completar deck visual y publicar versión unlisted.';
  }

  if ((status === 'READY' || boardStatus === 'READY') && deck.status === 'READY') {
    return 'Publicar diagnóstico y preparar mensaje de acercamiento.';
  }

  if ((status === 'PUBLISHED' || boardStatus === 'PUBLISHED') && prospect.outreach.lastContactedAt) {
    return 'Dar seguimiento con contexto del diagnóstico.';
  }

  if (status === 'PUBLISHED' || boardStatus === 'PUBLISHED') {
    return 'Enviar página pública y abrir conversación por WhatsApp.';
  }

  return 'Revisar diagnóstico y definir el siguiente paso comercial.';
}

export function getPublicDiagnosisPath(prospect: Prospect) {
  const slug = prospect.diagnosis.slug?.trim();
  if (!slug) return null;

  const canShare =
    prospect.diagnosis.status === 'PUBLISHED' ||
    prospect.diagnosis.visibility === 'PUBLIC' ||
    prospect.diagnosis.visibility === 'UNLISTED';

  return canShare ? `/diagnosticos/${slug}` : null;
}

export function getExternalUrl(url?: string | null) {
  const value = typeof url === 'string' ? url.trim() : '';
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value.replace(/^\/+/, '')}`;
}

export function getInstagramUrl(instagram?: string | null) {
  const value = typeof instagram === 'string' ? instagram.trim() : '';
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) return value;
  if (/instagram\.com\//i.test(value)) return `https://${value.replace(/^https?:\/\//i, '')}`;

  return `https://instagram.com/${value.replace(/^@/, '')}`;
}

export function filterDiagnosticsProspects(prospects: Prospect[], filters: DiagnosticsBoardFilters) {
  const query = filters.search.trim().toLowerCase();

  return prospects.filter((prospect) => {
    if (!isDiagnosedProspect(prospect)) {
      return false;
    }

    const summary = prospect.diagnosis.summary ?? prospect.diagnosis.publicNotes ?? prospect.description ?? prospect.evidenceNotes ?? '';
    const matchesSearch =
      !query ||
      [
        prospect.name,
        prospect.category,
        prospect.city,
        prospect.normalizedWebsite,
        prospect.website,
        prospect.normalizedInstagram,
        prospect.instagram,
        summary,
        getProspectNextBestAction(prospect),
      ]
        .filter((value): value is string => typeof value === 'string')
        .join(' ')
        .toLowerCase()
        .includes(query);

    if (!matchesSearch) {
      return false;
    }

    const boardStatus = getDiagnosisBoardStatus(prospect);

    if (filters.quickFilter === 'published') {
      return boardStatus === 'PUBLISHED';
    }

    if (filters.quickFilter === 'ready') {
      return boardStatus === 'READY';
    }

    if (filters.quickFilter === 'draft') {
      return boardStatus === 'DRAFT';
    }

    if (filters.quickFilter === 'hasDeck') {
      return getDeckVisibleCount(prospect) > 0;
    }

    if (filters.quickFilter === 'highOpportunity') {
      return getProspectOpportunityScore(prospect) >= 85;
    }

    return true;
  });
}

export function sortDiagnosticsProspects(prospects: Prospect[], sortMode: DiagnosticsSortMode) {
  return [...prospects].sort((left, right) => {
    if (sortMode === 'name') {
      return left.name.localeCompare(right.name, 'es');
    }

    if (sortMode === 'opportunity') {
      return getProspectOpportunityScore(right) - getProspectOpportunityScore(left);
    }

    if (sortMode === 'confidence') {
      return getProspectConfidenceScore(right) - getProspectConfidenceScore(left);
    }

    if (sortMode === 'recent') {
      return getSortTimestamp(right) - getSortTimestamp(left);
    }

    return (
      getActionPriority(right) - getActionPriority(left) ||
      getProspectOpportunityScore(right) - getProspectOpportunityScore(left) ||
      getProspectConfidenceScore(right) - getProspectConfidenceScore(left) ||
      getSortTimestamp(right) - getSortTimestamp(left) ||
      left.name.localeCompare(right.name, 'es')
    );
  });
}

export function getDiagnosticsBoardMetrics(prospects: Prospect[]): DiagnosticsBoardMetrics {
  const published = prospects.filter((prospect) => getDiagnosisBoardStatus(prospect) === 'PUBLISHED').length;
  const readyToAct = prospects.filter((prospect) => {
    const boardStatus = getDiagnosisBoardStatus(prospect);
    return boardStatus === 'PUBLISHED' || (boardStatus === 'READY' && getDiagnosisSlideDeck(prospect.diagnosis, prospect.name).status === 'READY');
  }).length;
  const averageOpportunity = prospects.length
    ? Math.round(prospects.reduce((total, prospect) => total + getProspectOpportunityScore(prospect), 0) / prospects.length)
    : 0;

  return {
    total: prospects.length,
    published,
    readyToAct,
    averageOpportunity,
  };
}
