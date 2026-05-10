'use client';

import { useState } from 'react';
import styled from 'styled-components';
import type { DiagnosisSlideAsset } from '../types';

const Shell = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 1120px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.58fr);
    align-items: start;
  }
`;

const Stage = styled.div`
  position: relative;
  min-height: 340px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 28px;
  border: ${({ theme }) => theme.borders.subtle};
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.24));

  @media (max-width: 760px) {
    min-height: 240px;
    border-radius: 24px;
  }
`;

const StageImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Fallback = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSoft};
  background: radial-gradient(circle at 50% 0%, rgba(205,180,124,0.16), transparent 42%), #111;
`;

const Overlay = styled.div`
  position: absolute;
  inset: auto 0 0;
  padding: clamp(1rem, 3vw, 2rem);
  background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.88));
`;

const Kicker = styled.small`
  display: block;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
`;

const Title = styled.h3`
  margin: 0.65rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 4.6rem);
  line-height: 0.92;
`;

const Caption = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  max-width: 64ch;
`;

const Rail = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (max-width: 1120px) {
    grid-auto-flow: column;
    grid-auto-columns: minmax(220px, 72%);
    overflow-x: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  appearance: none;
  text-align: left;
  border-radius: 22px;
  padding: 0.75rem;
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 0.75rem;
  background: ${({ $active }) => ($active ? 'rgba(205, 180, 124, 0.08)' : 'rgba(255,255,255,0.03)')};
  border: 1px solid
    ${({ theme, $active }) => ($active ? 'rgba(205, 180, 124, 0.44)' : theme.colors.border)};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const ThumbVisual = styled.div`
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-radius: 14px;
  background: #151515;
  border: ${({ theme }) => theme.borders.subtle};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ThumbMeta = styled.div`
  align-self: center;

  strong {
    display: block;
    line-height: 1.25;
  }

  span {
    display: block;
    margin-top: 0.35rem;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
    line-height: 1.5;
  }
`;

type Props = {
  slides: DiagnosisSlideAsset[];
};

export function PublicDiagnosisGallery({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  if (!slides.length) {
    return null;
  }

  const activeSlide = slides[Math.min(activeIndex, slides.length - 1)];

  return (
    <Shell>
      <Stage>
        {imageFailed ? (
          <Fallback>Imagen no disponible</Fallback>
        ) : (
          <StageImage
            src={activeSlide.imageUrl}
            alt={activeSlide.alt || activeSlide.title}
            onError={() => setImageFailed(true)}
          />
        )}
        <Overlay>
          <Kicker>{`${activeIndex + 1}/${slides.length}`}</Kicker>
          <Title>{activeSlide.title}</Title>
          {activeSlide.caption ? <Caption>{activeSlide.caption}</Caption> : null}
        </Overlay>
      </Stage>

      <Rail>
        {slides.map((slide, index) => (
          <ThumbButton
            key={slide.id}
            type="button"
            $active={index === activeIndex}
            onClick={() => {
              setActiveIndex(index);
              setImageFailed(false);
            }}
          >
            <ThumbVisual>
              {slide.thumbnailUrl || slide.imageUrl ? (
                <img src={slide.thumbnailUrl || slide.imageUrl} alt={slide.alt || slide.title} />
              ) : (
                <Fallback>Preview</Fallback>
              )}
            </ThumbVisual>
            <ThumbMeta>
              <strong>{slide.title}</strong>
              <span>{slide.caption || 'Slide del diagnostico publico.'}</span>
            </ThumbMeta>
          </ThumbButton>
        ))}
      </Rail>
    </Shell>
  );
}
