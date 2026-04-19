'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  applications,
  entryCriteria,
  perceptionLayer,
  pillars,
  principles,
} from '@/modules/landing/data/landing-content';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LandingHero } from '@/modules/landing/components/LandingHero';

const Section = styled.section`
  border-bottom: ${({ theme }) => theme.borders.subtle};
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 5rem 1.25rem;
`;

const Eyebrow = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.32em;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Heading = styled.h2`
  margin: 0.75rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 3.5rem);
`;

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const GridTwo = styled.div`
  display: grid;
  gap: 1.25rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Principles = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const Principle = styled(Card)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
`;

const Step = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.accent};
  border: ${({ theme }) => theme.borders.emphasized};
  background: ${({ theme }) => theme.colors.accentMuted};
`;

const Quote = styled.blockquote`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.15;
`;

const Manifesto = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.lg};
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 64ch;
`;

const InlineAction = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.size.sm};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0;
  margin-top: 1rem;
  cursor: pointer;
  transition: opacity 180ms ease;

  &:hover {
    opacity: 0.86;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 4px;
  }
`;

const DialogBackdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  border: 0;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(5px);
`;

const DialogPanel = styled.div`
  position: fixed;
  inset: auto 1rem 1rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  margin: 0 auto;
  max-width: 760px;
  max-height: min(82vh, 780px);
  overflow: auto;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: ${({ theme }) => theme.borders.subtle};
  background: linear-gradient(180deg, rgba(18, 18, 18, 0.98), rgba(12, 12, 12, 0.98));
  box-shadow: ${({ theme }) => theme.shadows.glow};
  padding: 1.5rem;

  @media (min-width: 840px) {
    inset: auto 0 2.25rem;
    padding: 2rem;
  }
`;

const DialogHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

const DialogTitle = styled.h3`
  margin: 0.5rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.6rem, 4vw, 2.4rem);
`;

const CloseButton = styled.button`
  appearance: none;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.panel};
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.45rem 0.85rem;
  cursor: pointer;
`;

const LayerList = styled.ul`
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.7rem;
`;

const LayerItem = styled.li`
  display: grid;
  grid-template-columns: 8px 1fr;
  gap: 0.8rem;
  align-items: flex-start;
  padding: 0.8rem;
  border-radius: 14px;
  border: ${({ theme }) => theme.borders.subtle};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    margin-top: 0.45rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export function ElOjoNegroLanding() {
  const [openLayer, setOpenLayer] = useState<'criteria' | 'perception' | null>(null);

  const activeLayer = useMemo(() => {
    if (openLayer === 'criteria') {
      return {
        eyebrow: 'Criterio',
        title: entryCriteria.title,
        intro: entryCriteria.intro,
        points: entryCriteria.steps,
        closing: entryCriteria.closing,
      };
    }

    if (openLayer === 'perception') {
      return {
        eyebrow: 'Lectura',
        title: perceptionLayer.title,
        intro: perceptionLayer.intro,
        points: perceptionLayer.points,
        closing: perceptionLayer.signature,
      };
    }

    return null;
  }, [openLayer]);

  useEffect(() => {
    if (!openLayer) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenLayer(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [openLayer]);

  return (
    <>
      <LandingHero onOpenCriteria={() => setOpenLayer('criteria')} />

      <Section id="manifiesto">
        <Container>
          <GridTwo>
            <div>
              <Eyebrow>Analisis</Eyebrow>
              <Heading>Una mirada que no persuade: revela</Heading>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Muted>
                EL OJO NEGRO une simbolo, oficio y expansion: el ojo como lectura profunda, Arquitecto de Percepcion como
                metodo y LIMITLESS como alcance.
              </Muted>
              <Muted>
                No compite por volumen ni por ruido. Opera donde una lectura precisa puede reordenar presencia, autoridad y
                valor percibido.
              </Muted>
            </div>
          </GridTwo>
        </Container>
      </Section>

      <Section>
        <Container>
          <div style={{ display: 'grid', gap: '1.4rem' }}>
            <div>
              <Eyebrow>Pilares</Eyebrow>
              <Heading>Decir menos. Transformar mas.</Heading>
            </div>
            <GridTwo>
              {pillars.map((item) => (
                <Card key={item.title}>
                  <div style={{ width: 64, height: 1, background: '#cdb47c', marginBottom: '1rem' }} />
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.7rem' }}>{item.title}</h3>
                  <Muted style={{ marginTop: '0.75rem' }}>{item.body}</Muted>
                </Card>
              ))}
            </GridTwo>
          </div>
        </Container>
      </Section>

      <Section id="metodo">
        <Container>
          <GridTwo>
            <div>
              <Eyebrow>Metodo</Eyebrow>
              <Heading>Quod tango muto</Heading>
              <Manifesto>
                La transformacion no nace del ruido. Nace de observar, destilar y elevar. Primero lectura. Luego forma.
                Despues, presencia.
              </Manifesto>
            </div>
            <Principles>
              {principles.map((step, index) => (
                <Principle key={step}>
                  <Step>{`0${index + 1}`}</Step>
                  <span>{step}</span>
                </Principle>
              ))}
            </Principles>
          </GridTwo>
        </Container>
      </Section>

      <Section>
        <Container>
          <GridTwo>
            <Card>
              <Eyebrow>Territorio</Eyebrow>
              <Heading style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>Donde vive esta vision</Heading>
              <div style={{ display: 'grid', gap: '0.8rem', marginTop: '1rem' }}>
                {applications.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.65rem',
                      padding: '0.8rem',
                      borderRadius: '14px',
                      border: '1px solid rgba(242, 237, 228, 0.12)',
                    }}
                  >
                    <span
                      aria-hidden
                      style={{ width: 8, height: 8, borderRadius: '999px', marginTop: 8, background: '#cdb47c' }}
                    />
                    <Muted>{item}</Muted>
                  </div>
                ))}
              </div>
              <InlineAction type="button" onClick={() => setOpenLayer('perception')} aria-haspopup="dialog">
                Ver capa de lectura
              </InlineAction>
            </Card>

            <Card style={{ background: 'rgba(205, 180, 124, 0.08)' }}>
              <Eyebrow>Declaracion</Eyebrow>
              <Quote>
                Mi mirada es mi activo.
                <br />
                Quod observo muto.
              </Quote>
              <Muted style={{ marginTop: '1rem' }}>
                No fabrico talento. Lo detecto, lo ordeno y lo elevo. Donde otros ven rutina, aqui se revela identidad,
                posicion y autoridad.
              </Muted>
            </Card>
          </GridTwo>
        </Container>
      </Section>

      <Section style={{ borderBottom: 'none' }}>
        <Container style={{ textAlign: 'center' }}>
          <Eyebrow>Cierre</Eyebrow>
          <Heading>Arquitecto de Percepcion</Heading>
          <Manifesto style={{ marginInline: 'auto', marginTop: '1rem' }}>
            Una firma para negocios, talentos y oficios con sustancia real. Revela valor, eleva presencia y transforma
            percepcion sin gritar ni exagerar.
          </Manifesto>
          <Eyebrow style={{ marginTop: '2rem' }}>EL OJO NEGRO - LIMITLESS</Eyebrow>
        </Container>
      </Section>

      {activeLayer ? (
        <>
          <DialogBackdrop aria-label="Cerrar capa" onClick={() => setOpenLayer(null)} />
          <DialogPanel role="dialog" aria-modal="true" aria-label={activeLayer.title}>
            <DialogHead>
              <div>
                <Eyebrow>{activeLayer.eyebrow}</Eyebrow>
                <DialogTitle>{activeLayer.title}</DialogTitle>
              </div>
              <CloseButton type="button" onClick={() => setOpenLayer(null)}>
                Cerrar
              </CloseButton>
            </DialogHead>

            <Muted style={{ marginTop: '1rem' }}>{activeLayer.intro}</Muted>
            <LayerList>
              {activeLayer.points.map((point) => (
                <LayerItem key={point}>
                  <Muted>{point}</Muted>
                </LayerItem>
              ))}
            </LayerList>
            <Manifesto style={{ marginTop: '1.2rem' }}>{activeLayer.closing}</Manifesto>
            <div style={{ marginTop: '1.2rem' }}>
              <Button type="button" variant="secondary" onClick={() => setOpenLayer(null)}>
                Volver a la lectura
              </Button>
            </div>
          </DialogPanel>
        </>
      ) : null}
    </>
  );
}
