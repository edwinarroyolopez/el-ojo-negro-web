'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { DiagnosisSlideAsset } from '../types';

const Shell = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 1120px) {
    grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.62fr);
    align-items: start;
  }
`;

const StageColumn = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const Stage = styled.div`
  position: relative;
  min-height: 340px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 30px;
  border: ${({ theme }) => theme.borders.subtle};
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.28));
  box-shadow: ${({ theme }) => theme.shadows.glow};
  cursor: zoom-in;

  @media (max-width: 760px) {
    min-height: 260px;
    min-width: 0;
    border-radius: 26px;
  }
`;

const StageTouchArea = styled.button`
  appearance: none;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: inherit;
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

const StageActions = styled.div`
  position: absolute;
  inset: 1rem 1rem auto auto;
  display: flex;
  gap: 0.6rem;

  @media (max-width: 760px) {
    display: none;
  }
`;

const MobileExpandHint = styled.div`
  position: absolute;
  inset: auto 0 0;
  display: none;
  justify-content: flex-start;
  padding: 0 0.9rem 0.9rem;
  pointer-events: none;

  @media (max-width: 760px) {
    display: flex;
  }
`;

const MobileExpandPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 40px;
  border-radius: 999px;
  padding: 0.62rem 0.92rem;
  background: rgba(8, 8, 8, 0.72);
  border: 1px solid rgba(205, 180, 124, 0.2);
  color: ${({ theme }) => theme.colors.text};
  backdrop-filter: blur(10px);
  font-size: ${({ theme }) => theme.typography.size.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.26);
`;

const GhostIconButton = styled.button`
  appearance: none;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(8, 8, 8, 0.58);
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: rgba(18, 18, 18, 0.8);
  }
`;

const StageFooter = styled.div`
  display: grid;
  gap: 0.75rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: 28px;
  padding: 1.15rem 1.2rem 1.25rem;
  background:
    radial-gradient(circle at 100% 0%, rgba(205,180,124,0.08), transparent 28%),
    linear-gradient(135deg, rgba(255,255,255,0.045), rgba(255,255,255,0.02));

  @media (max-width: 760px) {
    gap: 0.6rem;
    padding: 0;
    border: 0;
    background: transparent;
  }
`;

const Kicker = styled.small`
  display: block;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
`;

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.8rem, 4vw, 3.4rem);
  line-height: 0.94;

  @media (max-width: 760px) {
    font-size: clamp(1.7rem, 8.4vw, 2.4rem);
    line-height: 0.98;
  }
`;

const Caption = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  max-width: 64ch;

  @media (max-width: 760px) {
    display: none;
  }
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    display: grid;
    gap: 0.5rem;
  }
`;

const Counter = styled.span`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;

  @media (min-width: 761px) {
    display: none;
  }
`;

const MobileCaption = styled.p`
  display: none;

  @media (max-width: 760px) {
    display: block;
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.typography.size.sm};
    line-height: 1.55;
  }
`;

const Rail = styled.div`
  display: grid;
  gap: 0.75rem;

  @media (max-width: 1120px) {
    grid-auto-flow: column;
    grid-auto-columns: minmax(112px, 32%);
    overflow-x: auto;
    scrollbar-width: none;
    padding-top: 0.25rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  appearance: none;
  text-align: left;
  border-radius: 22px;
  padding: 0.85rem;
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 0.8rem;
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
    padding: 0.45rem;
    border-radius: 18px;
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
    font-size: 1rem;
  }

  span {
    display: block;
    margin-top: 0.35rem;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
    line-height: 1.5;
  }

  @media (max-width: 1120px) {
    display: none;
  }
`;

const FullscreenOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  display: ${({ $open }) => ($open ? 'grid' : 'none')};
  background: rgba(4, 4, 4, 0.94);
  backdrop-filter: blur(14px);
  z-index: ${({ theme }) => theme.zIndex.modal + 10};
  padding: 0.8rem;

  @media (max-width: 760px) {
    padding: 0.5rem;
  }
`;

const FullscreenShell = styled.div`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.4rem;
  width: min(1540px, 100%);
  margin: 0 auto;
`;

const FullscreenStageWrap = styled.div`
  min-height: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 0.75rem;
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const FullscreenStage = styled.div`
  min-height: 0;
  height: min(84vh, 1120px);
  border-radius: 28px;
  overflow: hidden;
  border: ${({ theme }) => theme.borders.subtle};
  background: #0f0f0f;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 760px) {
    height: min(72vh, 860px);
    border-radius: 22px;
  }
`;

const NavButton = styled.button`
  appearance: none;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255,255,255,0.04);
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: rgba(255,255,255,0.08);
  }

  @media (min-width: 761px) {
    margin-inline: -0.22rem;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const MobileNavLeft = styled(NavButton)`
  display: none;

  @media (max-width: 760px) {
    border-radius: 16px;

    display: inline-flex;
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    left: 0.7rem;
  }
`;

const MobileNavRight = styled(NavButton)`
  display: none;

  @media (max-width: 760px) {
    border-radius: 16px;

    display: inline-flex;
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    right: 0.7rem;
  }
`;

const FullscreenFooter = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const QuietCloseButton = styled.button`
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 999px;
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(8, 8, 8, 0.72);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  backdrop-filter: blur(12px);
  z-index: 3;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: rgba(18, 18, 18, 0.9);
  }

  @media (max-width: 760px) {
    top: 0.5rem;
    right: 0.5rem;
    width: 40px;
    height: 40px;
  }
`;

const FullscreenCounter = styled.div`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  z-index: 3;

  @media (max-width: 760px) {
    top: 0.6rem;
    left: 0.6rem;
    font-size: 0.68rem;
  }
`;

const FullscreenInfoBand = styled.div`
  display: grid;
  gap: 0.18rem;
  width: min(820px, 100%);
  margin: 0 auto;
  text-align: center;
  transform: translateY(-0.08rem);

  ${Title} {
    font-size: clamp(1.05rem, 2vw, 1.5rem);
    line-height: 0.98;
  }

  ${Caption} {
    display: block;
    margin-inline: auto;
    max-width: 54ch;
    font-size: ${({ theme }) => theme.typography.size.xs};
  }

  @media (max-width: 760px) {
    transform: translateY(0);

    ${Title} {
      font-size: clamp(0.95rem, 4.8vw, 1.15rem);
    }
  }
`;

const FullscreenThumbRail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(120px, 152px);
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 760px) {
    grid-auto-columns: minmax(98px, 116px);
  }
`;

const FullscreenThumb = styled.button<{ $active: boolean }>`
  appearance: none;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid
    ${({ theme, $active }) => ($active ? 'rgba(205, 180, 124, 0.44)' : theme.colors.border)};
  padding: 0;
  background: ${({ $active }) => ($active ? 'rgba(205, 180, 124, 0.1)' : 'rgba(255,255,255,0.03)')};
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }
`;

type Props = {
  slides: DiagnosisSlideAsset[];
};

function mod(value: number, length: number) {
  return (value + length) % length;
}

export function PublicDiagnosisGallery({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);
  const [fullscreenFailed, setFullscreenFailed] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef(0);

  useEffect(() => {
    if (!isFullscreenOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsFullscreenOpen(false);
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => mod(current + 1, slides.length));
        setFullscreenFailed(false);
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => mod(current - 1, slides.length));
        setFullscreenFailed(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenOpen, slides.length]);

  if (!slides.length) {
    return null;
  }

  const activeSlide = slides[Math.min(activeIndex, slides.length - 1)];

  function selectSlide(index: number) {
    setActiveIndex(index);
    setImageFailed(false);
    setFullscreenFailed(false);
  }

  function move(direction: -1 | 1) {
    selectSlide(mod(activeIndex + direction, slides.length));
  }

  function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
    touchDeltaXRef.current = 0;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLElement>) {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = (event.touches[0]?.clientX ?? 0) - touchStartXRef.current;
  }

  function handleTouchEnd() {
    if (touchStartXRef.current === null) return;

    if (Math.abs(touchDeltaXRef.current) > 56) {
      move(touchDeltaXRef.current < 0 ? 1 : -1);
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  }

  return (
    <>
      <Shell>
        <StageColumn>
          <Stage>
            <StageTouchArea
              type="button"
              aria-label="Abrir slide en pantalla completa"
              onClick={() => setIsFullscreenOpen(true)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {imageFailed ? (
                <Fallback>Imagen no disponible</Fallback>
              ) : (
                <StageImage
                  src={activeSlide.imageUrl}
                  alt={activeSlide.alt || activeSlide.title}
                  onError={() => setImageFailed(true)}
                />
              )}
            </StageTouchArea>

            <StageActions>
              <GhostIconButton
                type="button"
                onClick={() => setIsFullscreenOpen(true)}
                aria-label="Ver imagen en pantalla completa"
              >
                <Expand size={18} />
              </GhostIconButton>
            </StageActions>

            <MobileExpandHint>
              <MobileExpandPill>
                <Expand size={14} /> Toca para ampliar
              </MobileExpandPill>
            </MobileExpandHint>
          </Stage>

          <StageFooter>
            <FooterTop>
              <Counter>{`${activeIndex + 1}/${slides.length}`}</Counter>
              <Kicker>Vision editorial</Kicker>
            </FooterTop>
            <MetaRow>
              <div>
                <Kicker>{`Slide ${activeIndex + 1} de ${slides.length}`}</Kicker>
                <Title>{activeSlide.title}</Title>
              </div>
              <Counter>{`${activeIndex + 1}/${slides.length}`}</Counter>
            </MetaRow>
            {activeSlide.caption ? <Caption>{activeSlide.caption}</Caption> : null}
            {activeSlide.caption ? <MobileCaption>{activeSlide.caption}</MobileCaption> : null}
          </StageFooter>
        </StageColumn>

        <Rail>
          {slides.map((slide, index) => (
            <ThumbButton
              key={slide.id}
              type="button"
              $active={index === activeIndex}
              onClick={() => selectSlide(index)}
              aria-label={slide.title}
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

      <FullscreenOverlay
        $open={isFullscreenOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Galeria en pantalla completa"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsFullscreenOpen(false);
          }
        }}
      >
        <FullscreenShell>
          <FullscreenCounter>{`${activeIndex + 1}/${slides.length}`}</FullscreenCounter>
          <QuietCloseButton type="button" onClick={() => setIsFullscreenOpen(false)} aria-label="Cerrar pantalla completa">
            <X size={18} />
          </QuietCloseButton>

          <FullscreenStageWrap>
            <NavButton type="button" onClick={() => move(-1)} aria-label="Imagen anterior">
              <ChevronLeft size={20} />
            </NavButton>

            <div style={{ position: 'relative', minHeight: 0 }}>
              <MobileNavLeft type="button" onClick={() => move(-1)} aria-label="Imagen anterior en mobile">
                <ChevronLeft size={20} />
              </MobileNavLeft>
              <FullscreenStage
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {fullscreenFailed ? (
                  <Fallback>Imagen no disponible</Fallback>
                ) : (
                  <img
                    src={activeSlide.imageUrl}
                    alt={activeSlide.alt || activeSlide.title}
                    onError={() => setFullscreenFailed(true)}
                  />
                )}
              </FullscreenStage>
              <MobileNavRight type="button" onClick={() => move(1)} aria-label="Imagen siguiente en mobile">
                <ChevronRight size={20} />
              </MobileNavRight>
            </div>

            <NavButton type="button" onClick={() => move(1)} aria-label="Imagen siguiente">
              <ChevronRight size={20} />
            </NavButton>
          </FullscreenStageWrap>

          <FullscreenFooter>
            <FullscreenInfoBand>
              <Title>{activeSlide.title}</Title>
              {activeSlide.caption ? <Caption>{activeSlide.caption}</Caption> : null}
            </FullscreenInfoBand>
            <FullscreenThumbRail>
              {slides.map((slide, index) => (
                <FullscreenThumb
                  key={`fullscreen-${slide.id}`}
                  type="button"
                  $active={index === activeIndex}
                  onClick={() => selectSlide(index)}
                  aria-label={`Abrir ${slide.title}`}
                >
                  <img src={slide.thumbnailUrl || slide.imageUrl} alt={slide.alt || slide.title} />
                </FullscreenThumb>
              ))}
            </FullscreenThumbRail>
          </FullscreenFooter>
        </FullscreenShell>
      </FullscreenOverlay>
    </>
  );
}
