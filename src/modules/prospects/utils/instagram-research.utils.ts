import type {
  InstagramResearchData,
  InstagramResearchMetric,
  Prospect,
} from '../types';

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function toMetricValue(value: unknown): string | number | null {
  if (typeof value === 'number' || typeof value === 'string') {
    const trimmed = typeof value === 'string' ? value.trim() : value;
    return trimmed === '' ? null : trimmed;
  }

  return null;
}

function pickMetricByKey(metrics: InstagramResearchMetric[] | undefined, keys: string[]) {
  if (!Array.isArray(metrics)) return null;

  const normalizedKeys = new Set(keys.map((key) => key.toLowerCase()));
  const match = metrics.find((metric) => normalizedKeys.has(metric.key.toLowerCase()));
  return toMetricValue(match?.value);
}

function getInstagramData(
  data?: Prospect['data_instagram'],
): InstagramResearchData | null {
  return isObject(data) ? (data as InstagramResearchData) : null;
}

function stringifyJson(value: unknown) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return 'null';
  }
}

function buildSourceList(values: string[]) {
  return values.length > 0 ? values.join(', ') : 'unavailable';
}

function buildKnownSignals(prospect: Prospect) {
  return [
    `- Teléfonos registrados: ${prospect.phones.length}`,
    `- Sitio web identificado: ${Boolean(prospect.website)}`,
    `- Instagram presente: ${Boolean(prospect.instagram || prospect.normalizedInstagram)}`,
    `- Trust research: ${prospect.scores?.confidenceScore ?? 'unavailable'}`,
    `- Growth opportunity: ${prospect.scores?.growthOpportunityScore ?? 'unavailable'}`,
    `- Commerce readiness: ${prospect.scores?.commerceReadinessScore ?? 'unavailable'}`,
    `- Evidencia: ${prospect.evidenceNotes || 'unavailable'}`,
    `- Fuentes públicas: ${buildSourceList(prospect.sourceUrls ?? [])}`,
  ].join('\n');
}

export function buildInstagramResearchPrompt(prospect: Prospect): string {
  const context = stringifyJson({
    providerIntelligence: prospect.providerIntelligence ?? null,
    importProjection: prospect.importProjection ?? null,
    signals: prospect.signals ?? null,
    diagnosisSummary: prospect.diagnosis?.summary ?? null,
  });

  return [
    'Sos auditor externo senior de Growth Partner. Ejecutá deepsearch sobre Instagram y entorno de referencia. Devolvé SOLO JSON.',
    '',
    `Marca / empresa: ${prospect.name}`,
    `Contacto o nombre de referencia: ${prospect.name}`,
    `Categoría: ${prospect.category || 'unavailable'}`,
    `Ubicación: ${prospect.city || 'unavailable'}, ${prospect.country || 'Colombia'}`,
    `Sitio web: ${prospect.website || 'unavailable'}`,
    `Instagram: ${prospect.instagram || prospect.normalizedInstagram || 'unavailable'}`,
    `Resumen presencia ficha: ${prospect.description || 'unavailable'}`,
    '',
    'Señales ya registradas en ficha:',
    buildKnownSignals(prospect),
    '',
    'Contexto privado de inteligencia disponible:',
    context,
    '',
    'Objetivo Growth Partner:',
    'Growth Partner vende diagnóstico, sprint de destrabe y partnership continuo: convertir fricción operativa/comercial en sistema medible. Tu salida debe alimentar discovery, propuesta, pursuit filter y cierre — sin inventar cifras ni datos no observables.',
    '',
    'Instrucciones:',
    '- Cruzá observaciones del perfil con señales externas comparables cuando existan.',
    '- Separá claramente observed vs estimated vs benchmark.',
    '- Si no hay dato verificable, usar unavailable + missingData.',
    '- Incluir contraste de engagement y tracción frente a comparables del mismo segmento cuando exista fuente.',
    '- Detectá si Instagram funciona como vitrina, canal de deseo, canal de atención, prueba social o simple presencia superficial.',
    '- Prioriza datos que ayuden a decidir si el prospecto merece diagnóstico, sprint de destrabe o partnership continuo.',
    '- Si Instagram no permite ver datos por restricciones de plataforma, decláralo en methodologicalLimits.',
    '',
    'REGLAS DE SALIDA OBLIGATORIAS:',
    '- Respondé con un ÚNICO objeto JSON válido UTF-8.',
    '- Sin markdown.',
    '- Sin comentarios.',
    '- Sin texto antes ni después.',
    '- Sin trailing commas.',
    '- Claves en camelCase como en el esquema.',
    '- Todo cuantitativo debe respetar clasificación: observed | estimated | benchmark | unavailable.',
    '- Diferenciá explícitamente observado vs inferido; lo no confirmable va en missingData.',
    '- observedSignals = hechos visibles/trazables.',
    '- scorecard = interpretación comercial.',
    '- commercialImplications = impacto para Growth Partner.',
    '- Toda métrica debe incluir key estable, label humano en español, shortLabel si aplica, priority y sourceNote.',
    '- Si no hay dato, declará unavailable y anotá el hueco en missingData.',
    '- No inventes números.',
    '- executiveSummary: 6 a 12 líneas máximo, tono ejecutivo, qué validar en primer contacto y utilidad para Growth Partner.',
    '',
    'REGLAS DE AUDITORÍA DEEPSEARCH:',
    '- doNotInvent debe ser true.',
    '- Declará observationDate en ISO YYYY-MM-DD.',
    '- Declará sourceConfidence: LOW | MEDIUM | HIGH.',
    '- Incluí methodologicalLimits[].',
    '- Incluí missingData[].',
    '- Incluí freshness por métrica cuando sea posible: fresh | recent | stale | unknown.',
    '- No mezclar benchmark externo con performance propia.',
    '- No usar precisión decimal artificial cuando la fuente no la soporta.',
    '- Si inferís, usar classification=estimated y explicar sourceNote/context.',
    '',
    'ESQUEMA JSON esperado, todas las claves deben existir:',
    `{
  "channel": "instagram",
  "channelRole": "atencion, deseo, vitrina, narrativa de marca",
  "promptMode": "deepsearch_research",
  "doNotInvent": true,
  "observationDate": "YYYY-MM-DD|null",
  "sourceConfidence": "LOW|MEDIUM|HIGH|null",
  "observedSignals": {
    "followersCountObserved": 0,
    "followingCountObserved": 0,
    "postsCountObserved": 0,
    "lastPostAtObserved": "YYYY-MM-DD|null",
    "highlightsCountObserved": 0,
    "reelsPresenceObserved": true,
    "recentPostingCadenceObserved": "string|null",
    "profileBioHasClearOfferObserved": true,
    "profileHasWhatsAppOrDirectCTAObserved": true,
    "linkInBioPresenceObserved": true,
    "visibleEngagementSignalObserved": "string|number|null"
  },
  "scorecard": {
    "brandClarityScore": 0,
    "visualMerchandisingScore": 0,
    "contentConsistencyScore": 0,
    "observedEngagementQuality": 0,
    "desireGenerationScore": 0,
    "humanTrustSignalScore": 0,
    "ctaReadinessScore": 0
  },
  "topStrengths": ["string"],
  "topFrictions": ["string"],
  "commercialImplications": ["string"],
  "recommendedNextQuestion": "string",
  "diagnosticRelevance": "string",
  "profile": {
    "handle": "string|null",
    "displayName": "string|null",
    "bioSummary": "string|null",
    "linkInBio": "string|null"
  },
  "metrics": {
    "followers": "string|number|null",
    "following": "string|number|null",
    "postsVisible": "string|number|null",
    "postingCadence30d": "string|null",
    "engagementRead": "string|null"
  },
  "observedMetrics": [
    {
      "key": "string",
      "label": "string",
      "shortLabel": "string|null",
      "priority": "low|medium|high|critical",
      "value": "string|number|null",
      "unit": "string|null",
      "valueType": "string|null",
      "classification": "observed|estimated|benchmark|unavailable",
      "sourceNote": "string|null",
      "confidence": "LOW|MEDIUM|HIGH|null",
      "context": "string|null",
      "observationDate": "YYYY-MM-DD|null",
      "freshness": "fresh|recent|stale|unknown|null"
    }
  ],
  "estimatedMetrics": [
    {
      "key": "string",
      "label": "string",
      "shortLabel": "string|null",
      "priority": "low|medium|high|critical",
      "value": "string|number|null",
      "unit": "string|null",
      "valueType": "string|null",
      "classification": "observed|estimated|benchmark|unavailable",
      "sourceNote": "string|null",
      "confidence": "LOW|MEDIUM|HIGH|null",
      "context": "string|null",
      "observationDate": "YYYY-MM-DD|null",
      "freshness": "fresh|recent|stale|unknown|null"
    }
  ],
  "benchmarks": [
    {
      "key": "string",
      "label": "string",
      "shortLabel": "string|null",
      "priority": "low|medium|high|critical",
      "value": "string|number|null",
      "unit": "string|null",
      "valueType": "string|null",
      "classification": "observed|estimated|benchmark|unavailable",
      "sourceNote": "string|null",
      "confidence": "LOW|MEDIUM|HIGH|null",
      "context": "string|null",
      "observationDate": "YYYY-MM-DD|null",
      "freshness": "fresh|recent|stale|unknown|null"
    }
  ],
  "contentPatterns": "string|object",
  "engagementSignals": "string|object",
  "brandMaturity": "string|object",
  "audienceSignals": "string|object",
  "methodologicalLimits": ["string"],
  "missingData": ["string"],
  "opportunities": ["string"],
  "risks": ["string"],
  "presenceScore": 0,
  "consistencyScore": 0,
  "interactionHealthScore": 0,
  "proposalReadinessScore": 0,
  "executiveSummary": "string"
}`,
  ].join('\n');
}

export function parseInstagramResearchJson(raw: string): {
  isValid: boolean;
  payload?: InstagramResearchData;
  error?: string;
} {
  if (!raw.trim()) {
    return { isValid: false, error: 'Aún no pegaste ningún JSON.' };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!isObject(parsed)) {
      return {
        isValid: false,
        error: 'El contenido debe ser un JSON válido en formato objeto.',
      };
    }

    return {
      isValid: true,
      payload: parsed as InstagramResearchData,
    };
  } catch {
    return { isValid: false, error: 'El contenido no es JSON válido.' };
  }
}

export function getInstagramFollowersValue(
  data?: Prospect['data_instagram'],
): string | number | null {
  const instagramData = getInstagramData(data);
  if (!instagramData) return null;

  return (
    toMetricValue(instagramData.observedSignals?.followersCountObserved) ??
    toMetricValue(instagramData.metrics?.followers) ??
    pickMetricByKey(instagramData.observedMetrics, [
      'followers',
      'followersCount',
      'followersCountObserved',
    ])
  );
}

export function getInstagramPostsValue(
  data?: Prospect['data_instagram'],
): string | number | null {
  const instagramData = getInstagramData(data);
  if (!instagramData) return null;

  return (
    toMetricValue(instagramData.observedSignals?.postsCountObserved) ??
    toMetricValue(instagramData.metrics?.postsVisible) ??
    pickMetricByKey(instagramData.observedMetrics, [
      'posts',
      'postsVisible',
      'postsCountObserved',
    ])
  );
}

export function getInstagramSummary(data?: Prospect['data_instagram']): string {
  const instagramData = getInstagramData(data);
  if (!instagramData) return '';

  if (typeof instagramData.executiveSummary === 'string') {
    return instagramData.executiveSummary.trim();
  }

  if (Array.isArray(instagramData.topStrengths) && instagramData.topStrengths.length > 0) {
    return instagramData.topStrengths.join(' ');
  }

  return '';
}

export function getInstagramScore(
  data: Prospect['data_instagram'] | undefined,
  key: string,
): number | null {
  const instagramData = getInstagramData(data);
  if (!instagramData || !instagramData.scorecard) return null;

  const rawValue = instagramData.scorecard[key];
  return typeof rawValue === 'number' ? rawValue : null;
}
