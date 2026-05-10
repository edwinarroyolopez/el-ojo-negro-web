'use client';

import styled from 'styled-components';
import type { ProspectDiagnosis } from '../types';
import { getDiagnosisSlideDeck, getVisibleDiagnosisSlides } from '../utils/diagnosis-slide-deck.utils';

const Shell = styled.section`
  display: grid;
  gap: 0.85rem;
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Rail = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const SlideCard = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
`;

const Visual = styled.div`
  aspect-ratio: 16 / 9;
  background: rgba(255,255,255,0.03);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Meta = styled.div`
  padding: 0.9rem;
  display: grid;
  gap: 0.35rem;

  strong {
    font-size: ${({ theme }) => theme.typography.size.sm};
  }

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
  }
`;

export function DiagnosisDeckPreview({ diagnosis }: { diagnosis?: ProspectDiagnosis }) {
  const slides = getVisibleDiagnosisSlides(getDiagnosisSlideDeck(diagnosis));

  if (!slides.length) {
    return null;
  }

  return (
    <Shell>
      <Kicker>Deck visual</Kicker>
      <Rail>
        {slides.map((slide, index) => (
          <SlideCard key={slide.id}>
            <Visual>
              <img src={slide.thumbnailUrl || slide.imageUrl} alt={slide.alt || slide.title} />
            </Visual>
            <Meta>
              <strong>{slide.title || `Slide ${index + 1}`}</strong>
              <span>{slide.caption || 'Deck listo para pagina publica.'}</span>
            </Meta>
          </SlideCard>
        ))}
      </Rail>
    </Shell>
  );
}
