'use client';

import styled from 'styled-components';
import { applications, pillars, principles } from '@/modules/landing/data/landing-content';
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

export function ElOjoNegroLanding() {
  return (
    <>
      <LandingHero />

      <Section id="manifiesto">
        <Container>
          <GridTwo>
            <div>
              <Eyebrow>Analisis</Eyebrow>
              <Heading>Una firma construida desde la mirada</Heading>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <Muted>
                EL OJO NEGRO une simbolo, oficio y expansion: el ojo como lectura profunda, Arquitecto de Percepcion como
                metodo y LIMITLESS como alcance.
              </Muted>
              <Muted>
                No compite por volumen de ejecucion. Compite por criterio. Su valor aparece cuando algo sustancial deja de
                parecer ordinario y empieza a ocupar su lugar real.
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
              <Heading>Transformar percepcion. Elevar valor.</Heading>
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
                La transformacion no nace del ruido. Nace de observar, destilar y elevar. Este metodo convierte intuicion
                en direccion visible.
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
            </Card>

            <Card style={{ background: 'rgba(205, 180, 124, 0.08)' }}>
              <Eyebrow>Declaracion</Eyebrow>
              <Quote>
                Mi activo no son las manos.
                <br />
                Son los ojos.
              </Quote>
              <Muted style={{ marginTop: '1rem' }}>
                No fabrico talento. Lo detecto, lo ordeno y lo elevo. Donde otros ven rutina, veo potencial. Donde otros
                ven oficio, veo identidad.
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
            Una firma para revelar valor, elevar presencia y transformar como el mundo percibe lo que ya tiene sustancia.
            Sin gritar. Sin exagerar. Sin traicionar la esencia.
          </Manifesto>
          <Eyebrow style={{ marginTop: '2rem' }}>EL OJO NEGRO - LIMITLESS</Eyebrow>
        </Container>
      </Section>
    </>
  );
}
