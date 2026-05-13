export type ProspectStatus =
  | 'IMPORTED'
  | 'QUALIFIED'
  | 'DIAGNOSIS_PENDING'
  | 'DIAGNOSIS_DRAFT'
  | 'DIAGNOSIS_READY'
  | 'DIAGNOSIS_PUBLISHED'
  | 'CONTACTED'
  | 'RESPONDED'
  | 'MEETING_SCHEDULED'
  | 'PROPOSAL_SENT'
  | 'WON'
  | 'NOT_NOW'
  | 'DISCARDED';

export type ProspectPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type DiagnosisVisibility = 'PRIVATE' | 'UNLISTED' | 'PUBLIC';

export type DiagnosisStatus = 'EMPTY' | 'DRAFT' | 'READY' | 'PUBLISHED';

export type ProspectScores = {
  dataQualityScore?: number;
  supplyFitScore?: number;
  commerceReadinessScore?: number;
  growthOpportunityScore?: number;
  confidenceScore?: number;
};

export type ProspectDiagnosis = {
  title?: string;
  slug?: string;
  visibility?: DiagnosisVisibility;
  status?: DiagnosisStatus;
  markdown?: string;
  structured?: Record<string, unknown>;
  summary?: string;
  scores?: Record<string, unknown> | Array<Record<string, unknown>>;
  publicNotes?: string;
  publishedAt?: string;
  lastEditedAt?: string;
};

export type DiagnosisSlideRole =
  | 'cover'
  | 'strengths'
  | 'opportunities'
  | 'nextStep';

export type DiagnosisSlideSectionKey =
  | 'executiveReading'
  | 'strengths'
  | 'opportunities'
  | 'nextStep';

export type DiagnosisSlideDeckStatus = 'EMPTY' | 'INCOMPLETE' | 'READY';

export type DiagnosisSlideAsset = {
  id: string;
  order: number;
  role: DiagnosisSlideRole;
  title: string;
  caption?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  publicId?: string;
  originalFilename?: string;
  alt: string;
  sectionKey: DiagnosisSlideSectionKey;
  isVisible: boolean;
};

export type DiagnosisSlideDeck = {
  version: 1;
  status: DiagnosisSlideDeckStatus;
  slides: DiagnosisSlideAsset[];
};

export type ProspectOutreach = {
  contactAttempts?: number;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  lastMessage?: string;
  objection?: string;
  whatsappMessage?: string;
};

export type InstagramMetricClassification =
  | 'observed'
  | 'estimated'
  | 'benchmark'
  | 'unavailable';

export type InstagramResearchConfidence = 'LOW' | 'MEDIUM' | 'HIGH';

export type InstagramResearchMetric = {
  key: string;
  label: string;
  shortLabel?: string | null;
  priority: 'low' | 'medium' | 'high' | 'critical';
  value: string | number | null;
  unit?: string | null;
  valueType?: string | null;
  classification: InstagramMetricClassification;
  sourceNote?: string | null;
  confidence?: InstagramResearchConfidence | null;
  context?: string | null;
  observationDate?: string | null;
  freshness?: 'fresh' | 'recent' | 'stale' | 'unknown' | null;
};

export type InstagramResearchData = {
  channel?: 'instagram' | string;
  channelRole?: string;
  promptMode?: string;
  doNotInvent?: boolean;
  observationDate?: string | null;
  sourceConfidence?: InstagramResearchConfidence | null;
  observedSignals?: {
    followersCountObserved?: number | string | null;
    followingCountObserved?: number | string | null;
    postsCountObserved?: number | string | null;
    lastPostAtObserved?: string | null;
    highlightsCountObserved?: number | string | null;
    reelsPresenceObserved?: boolean | null;
    recentPostingCadenceObserved?: string | null;
    profileBioHasClearOfferObserved?: boolean | null;
    profileHasWhatsAppOrDirectCTAObserved?: boolean | null;
    linkInBioPresenceObserved?: boolean | null;
    visibleEngagementSignalObserved?: string | number | null;
  };
  scorecard?: Record<string, number | null | undefined>;
  topStrengths?: string[];
  topFrictions?: string[];
  commercialImplications?: string[];
  recommendedNextQuestion?: string;
  diagnosticRelevance?: string;
  profile?: {
    handle?: string | null;
    displayName?: string | null;
    bioSummary?: string | null;
    linkInBio?: string | null;
  };
  metrics?: {
    followers?: string | number | null;
    following?: string | number | null;
    postsVisible?: string | number | null;
    postingCadence30d?: string | null;
    engagementRead?: string | null;
  };
  observedMetrics?: InstagramResearchMetric[];
  estimatedMetrics?: InstagramResearchMetric[];
  benchmarks?: InstagramResearchMetric[];
  contentPatterns?: string | Record<string, unknown>;
  engagementSignals?: string | Record<string, unknown>;
  brandMaturity?: string | Record<string, unknown>;
  audienceSignals?: string | Record<string, unknown>;
  methodologicalLimits?: string[];
  missingData?: string[];
  opportunities?: string[];
  risks?: string[];
  presenceScore?: number | null;
  consistencyScore?: number | null;
  interactionHealthScore?: number | null;
  proposalReadinessScore?: number | null;
  executiveSummary?: string;
};

export type Prospect = {
  id: string;
  accountId: string;
  createdBy?: string;
  name: string;
  category?: string;
  country?: string;
  city?: string;
  phones: string[];
  website?: string;
  instagram?: string;
  facebook?: string;
  address?: string;
  description?: string;
  sourceUrls: string[];
  evidenceNotes?: string;
  internalNotes?: string;
  rawPayload?: Record<string, unknown>;
  rawDiscovery?: Record<string, unknown>;
  normalizedCandidate?: Record<string, unknown>;
  providerIntelligence?: Record<string, unknown>;
  importProjection?: Record<string, unknown>;
  signals?: Record<string, unknown>;
  data_instagram?: InstagramResearchData | Record<string, unknown> | null;
  scores: ProspectScores;
  priority: ProspectPriority;
  status: ProspectStatus;
  diagnosis: ProspectDiagnosis;
  outreach: ProspectOutreach;
  normalizedWebsite?: string;
  normalizedInstagram?: string;
  normalizedPhones?: string[];
  normalizedPrimaryPhone?: string;
  lastStatusChangedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProspectMetrics = {
  total: number;
  byStatus: Partial<Record<ProspectStatus, number>>;
  contactedToday: number;
  dailyGoal: number;
  published: number;
  responded: number;
  meetings: number;
  won: number;
  responseRate: number;
  closeRate: number;
};

export type ProspectListParams = {
  status?: ProspectStatus | '';
  priority?: ProspectPriority | '';
  category?: string;
  city?: string;
  search?: string;
  sort?: 'growth' | 'confidence' | 'priority' | 'name' | 'newest' | 'oldest' | 'recentlyEdited';
  page?: number;
  limit?: number;
};

export type ProspectListResponse = {
  items: Prospect[];
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export type ImportProspectsResponse = {
  received: number;
  created: number;
  updated: number;
  duplicates: number;
  failed: number;
  items: Array<{
    action: 'CREATED' | 'UPDATED' | 'DUPLICATE' | 'FAILED';
    id?: string;
    name?: string;
    reason?: string;
    rawItem?: unknown;
  }>;
};

export type UpdateProspectPayload = Partial<
  Pick<
    Prospect,
    | 'name'
    | 'category'
    | 'country'
    | 'city'
    | 'phones'
    | 'website'
    | 'instagram'
    | 'facebook'
    | 'address'
    | 'description'
    | 'sourceUrls'
    | 'evidenceNotes'
    | 'internalNotes'
    | 'signals'
    | 'data_instagram'
  >
> & {
  outreach?: ProspectOutreach;
};

export type UpdateDiagnosisPayload = Partial<Omit<ProspectDiagnosis, 'lastEditedAt' | 'publishedAt'>>;

export type GeneratedDiagnosisJson = {
  title: string;
  slug?: string;
  visibility?: DiagnosisVisibility;
  status?: DiagnosisStatus;
  summary: string;
  markdown: string;
  publicNotes?: string;
  scores?: Record<string, unknown> | Array<Record<string, unknown>>;
  structured?: Record<string, unknown>;
};

export type PublishDiagnosisPayload = {
  slug?: string;
  visibility?: DiagnosisVisibility;
};

export type PublicDiagnosisResponse = {
  brand: {
    name: string;
    archetype: string;
  };
  prospect: {
    name: string;
    category?: string;
    city?: string;
    website?: string;
    instagram?: string;
  };
  diagnosis: ProspectDiagnosis;
};
