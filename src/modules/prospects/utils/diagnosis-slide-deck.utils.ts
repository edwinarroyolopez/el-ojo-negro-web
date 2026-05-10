import type {
  DiagnosisSlideAsset,
  DiagnosisSlideDeck,
  DiagnosisSlideDeckStatus,
  DiagnosisSlideRole,
  DiagnosisSlideSectionKey,
  ProspectDiagnosis,
} from '../types';

const FIXED_SLOTS: Array<{
  role: DiagnosisSlideRole;
  sectionKey: DiagnosisSlideSectionKey;
  title: string;
}> = [
  {
    role: 'cover',
    sectionKey: 'executiveReading',
    title: 'Slide 1 - Portada + lectura ejecutiva',
  },
  {
    role: 'strengths',
    sectionKey: 'strengths',
    title: 'Slide 2 - Lo que ya esta bien',
  },
  {
    role: 'opportunities',
    sectionKey: 'opportunities',
    title: 'Slide 3 - Oportunidades principales',
  },
  {
    role: 'nextStep',
    sectionKey: 'nextStep',
    title: 'Slide 4 - Siguiente paso recomendado',
  },
];

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function sanitizeString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isRole(value: unknown): value is DiagnosisSlideRole {
  return FIXED_SLOTS.some((slot) => slot.role === value);
}

function isSectionKey(value: unknown): value is DiagnosisSlideSectionKey {
  return FIXED_SLOTS.some((slot) => slot.sectionKey === value);
}

function buildDefaultSlide(slotIndex: number, prospectName?: string): DiagnosisSlideAsset {
  const slot = FIXED_SLOTS[slotIndex];
  return {
    id: createSlideId(),
    order: slotIndex,
    role: slot.role,
    title:
      slotIndex === 0 && prospectName?.trim()
        ? `Diagnostico Express - ${prospectName.trim()}`
        : slot.title,
    caption: '',
    imageUrl: '',
    thumbnailUrl: '',
    publicId: '',
    originalFilename: '',
    alt:
      slotIndex === 0 && prospectName?.trim()
        ? `Slide de portada del diagnostico de ${prospectName.trim()}`
        : slot.title,
    sectionKey: slot.sectionKey,
    isVisible: true,
  };
}

function normalizeSlide(
  value: unknown,
  slotIndex: number,
  prospectName?: string,
): DiagnosisSlideAsset {
  const fallback = buildDefaultSlide(slotIndex, prospectName);
  if (!isObject(value)) {
    return fallback;
  }

  const role = isRole(value.role) ? value.role : fallback.role;
  const sectionKey = isSectionKey(value.sectionKey)
    ? value.sectionKey
    : fallback.sectionKey;
  const imageUrl = sanitizeString(value.imageUrl);
  const title = sanitizeString(value.title) || fallback.title;
  const alt = sanitizeString(value.alt) || title || fallback.alt;

  return {
    id: sanitizeString(value.id) || fallback.id,
    order: typeof value.order === 'number' && Number.isFinite(value.order) ? value.order : fallback.order,
    role,
    title,
    caption: sanitizeString(value.caption),
    imageUrl,
    thumbnailUrl: sanitizeString(value.thumbnailUrl),
    publicId: sanitizeString(value.publicId),
    originalFilename: sanitizeString(value.originalFilename),
    alt,
    sectionKey,
    isVisible: typeof value.isVisible === 'boolean' ? value.isVisible : fallback.isVisible,
  };
}

export function createSlideId() {
  return `slide-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

export function isValidImageFile(file: File) {
  return ['image/png', 'image/jpeg', 'image/webp'].includes(file.type);
}

export function sortDiagnosisSlides(slides: DiagnosisSlideAsset[]) {
  return [...slides].sort((a, b) => a.order - b.order);
}

export function getVisibleDiagnosisSlides(deck?: DiagnosisSlideDeck | null) {
  if (!deck?.slides?.length) return [] as DiagnosisSlideAsset[];

  return sortDiagnosisSlides(deck.slides).filter(
    (slide) => slide.isVisible && Boolean(slide.imageUrl.trim()),
  );
}

export function calculateDiagnosisSlideDeckStatus(
  slides: DiagnosisSlideAsset[],
): DiagnosisSlideDeckStatus {
  const visibleCount = slides.filter(
    (slide) => slide.isVisible && Boolean(slide.imageUrl.trim()),
  ).length;

  if (visibleCount === 0) return 'EMPTY';
  if (visibleCount >= 4) return 'READY';
  return 'INCOMPLETE';
}

export function buildDefaultDiagnosisSlideSlots(prospectName?: string) {
  return FIXED_SLOTS.map((_, index) => buildDefaultSlide(index, prospectName));
}

export function normalizeDiagnosisSlideDeck(
  input: unknown,
  prospectName?: string,
): DiagnosisSlideDeck {
  const fallbackSlides = buildDefaultDiagnosisSlideSlots(prospectName);
  const rawSlides = isObject(input) && Array.isArray(input.slides) ? input.slides : [];
  const normalizedSlides = fallbackSlides.map((fallbackSlide, index) => {
    const matchedByRole = rawSlides.find(
      (slide) => isObject(slide) && slide.role === fallbackSlide.role,
    );
    const matchedByIndex = rawSlides[index];
    return normalizeSlide(matchedByRole ?? matchedByIndex, index, prospectName);
  });

  const slides = sortDiagnosisSlides(normalizedSlides).map((slide, index) => ({
    ...slide,
    order: index,
  }));

  return {
    version: 1,
    status: calculateDiagnosisSlideDeckStatus(slides),
    slides,
  };
}

export function getDiagnosisSlideDeck(
  diagnosis?: ProspectDiagnosis | null,
  prospectName?: string,
) {
  return normalizeDiagnosisSlideDeck(diagnosis?.structured?.slideDeck, prospectName);
}

export function mergeDiagnosisSlideDeckIntoStructured(
  existingStructured: Record<string, unknown> | undefined,
  deck: DiagnosisSlideDeck,
): Record<string, unknown> {
  return {
    ...(existingStructured ?? {}),
    slideDeck: normalizeDiagnosisSlideDeck(deck),
  };
}
