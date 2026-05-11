import type { ProspectDiagnosis } from '../types';
import {
  calculateDiagnosisSlideDeckStatus,
  getDisplaySlideTitle,
  getVisibleDiagnosisSlides,
  mergeDiagnosisSlideDeckIntoStructured,
  normalizeDiagnosisSlideDeck,
  sortDiagnosisSlides,
} from './diagnosis-slide-deck.utils';

describe('diagnosis-slide-deck.utils', () => {
  it('sorts slides by order', () => {
    const deck = normalizeDiagnosisSlideDeck({
      slides: [
        { role: 'opportunities', order: 2, title: 'Tres', imageUrl: '3.jpg', alt: '3', sectionKey: 'opportunities', isVisible: true },
        { role: 'cover', order: 0, title: 'Uno', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true },
        { role: 'strengths', order: 1, title: 'Dos', imageUrl: '2.jpg', alt: '2', sectionKey: 'strengths', isVisible: true },
        { role: 'nextStep', order: 3, title: 'Cuatro', imageUrl: '4.jpg', alt: '4', sectionKey: 'nextStep', isVisible: true },
      ],
    });

    const sorted = sortDiagnosisSlides(deck.slides);
    expect(sorted.map((slide) => slide.order)).toEqual([0, 1, 2, 3]);
  });

  it('filters only visible slides with imageUrl', () => {
    const deck = normalizeDiagnosisSlideDeck({
      slides: [
        { role: 'cover', order: 0, title: 'Uno', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true },
        { role: 'strengths', order: 1, title: 'Dos', imageUrl: '', alt: '2', sectionKey: 'strengths', isVisible: true },
        { role: 'opportunities', order: 2, title: 'Tres', imageUrl: '3.jpg', alt: '3', sectionKey: 'opportunities', isVisible: false },
        { role: 'nextStep', order: 3, title: 'Cuatro', imageUrl: '4.jpg', alt: '4', sectionKey: 'nextStep', isVisible: true },
      ],
    });

    expect(getVisibleDiagnosisSlides(deck).map((slide) => slide.title)).toEqual(['Uno', 'Cuatro']);
  });

  it('calculates EMPTY, INCOMPLETE and READY', () => {
    const emptyDeck = normalizeDiagnosisSlideDeck({ slides: [] });
    const incompleteDeck = normalizeDiagnosisSlideDeck({
      slides: [
        { role: 'cover', order: 0, title: 'Uno', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true },
        { role: 'strengths', order: 1, title: 'Dos', imageUrl: '2.jpg', alt: '2', sectionKey: 'strengths', isVisible: true },
      ],
    });
    const readyDeck = normalizeDiagnosisSlideDeck({
      slides: [
        { role: 'cover', order: 0, title: 'Uno', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true },
        { role: 'strengths', order: 1, title: 'Dos', imageUrl: '2.jpg', alt: '2', sectionKey: 'strengths', isVisible: true },
        { role: 'opportunities', order: 2, title: 'Tres', imageUrl: '3.jpg', alt: '3', sectionKey: 'opportunities', isVisible: true },
        { role: 'nextStep', order: 3, title: 'Cuatro', imageUrl: '4.jpg', alt: '4', sectionKey: 'nextStep', isVisible: true },
      ],
    });

    expect(calculateDiagnosisSlideDeckStatus(emptyDeck.slides)).toBe('EMPTY');
    expect(calculateDiagnosisSlideDeckStatus(incompleteDeck.slides)).toBe('INCOMPLETE');
    expect(calculateDiagnosisSlideDeckStatus(readyDeck.slides)).toBe('READY');
  });

  it('preserves existing structured fields when inserting slideDeck', () => {
    const deck = normalizeDiagnosisSlideDeck({
      slides: [{ role: 'cover', order: 0, title: 'Uno', imageUrl: '1.jpg', alt: '1', sectionKey: 'executiveReading', isVisible: true }],
    });
    const diagnosis: ProspectDiagnosis = {
      structured: {
        quickWin: 'Mantener CTA',
        sections: { executiveReading: 'Texto existente' },
      },
    };

    const merged = mergeDiagnosisSlideDeckIntoStructured(diagnosis.structured, deck);

    expect(merged.quickWin).toBe('Mantener CTA');
    expect((merged.slideDeck as { slides: Array<{ title: string }> }).slides[0].title).toBe('Uno');
  });

  it('removes slide numbering prefixes from display titles', () => {
    expect(getDisplaySlideTitle('Slide 2 - Lo que ya esta bien')).toBe('Lo que ya esta bien');
    expect(getDisplaySlideTitle('Slide 3: Oportunidades principales')).toBe('Oportunidades principales');
    expect(getDisplaySlideTitle('Slide 4 — Siguiente paso recomendado')).toBe('Siguiente paso recomendado');
    expect(getDisplaySlideTitle('Diagnostico Express - Evo Self')).toBe('Diagnostico Express - Evo Self');
  });
});
