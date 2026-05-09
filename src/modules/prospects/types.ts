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

export type ProspectOutreach = {
  contactAttempts?: number;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  lastMessage?: string;
  objection?: string;
  whatsappMessage?: string;
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
  >
> & {
  outreach?: ProspectOutreach;
};

export type UpdateDiagnosisPayload = Partial<ProspectDiagnosis>;

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
