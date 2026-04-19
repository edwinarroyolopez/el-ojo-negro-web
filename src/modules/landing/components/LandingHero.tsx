'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/Button';

interface LandingHeroProps {
  onOpenCriteria: () => void;
}

const Hero = styled.section`
  border-bottom: ${({ theme }) => theme.borders.subtle};
`;

const Grid = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 6.5rem 1.25rem;
  display: grid;
  gap: 3rem;

  @media (min-width: 980px) {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
`;

const Badge = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  padding: 0.35rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
`;

const Heading = styled.h1`
  margin: 1rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2.8rem, 7vw, 5.2rem);
  line-height: 0.96;
  letter-spacing: 0.02em;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Lead = styled.p`
  margin: 1.4rem 0 0;
  max-width: 56ch;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.lg};
  line-height: 1.8;
`;

const Actions = styled.div`
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Signature = styled.p`
  margin: 1rem 0 0;
  color: ${({ theme }) => theme.colors.textSoft};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const SigilCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 2rem;
  background: ${({ theme }) => theme.colors.panel};
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: relative;
  overflow: hidden;
  transition: border-color 220ms ease, transform 220ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    inset: -20% -20% auto auto;
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(205, 180, 124, 0.16), transparent 62%);
    pointer-events: none;
  }
`;

const SigilTitle = styled.p`
  margin: 1.2rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  letter-spacing: 0.2em;
  font-size: clamp(1.5rem, 4vw, 2.3rem);
`;

const SigilSub = styled.p`
  margin: 0.65rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
  letter-spacing: 0.3em;
`;

const SigilLimitless = styled.p`
  margin: 1.8rem 0 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.5em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

export function LandingHero({ onOpenCriteria }: LandingHeroProps) {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Hero>
      <Grid>
        <div>
          <Badge>
            EL OJO NEGRO <Dot /> Arquitectura de Percepcion
          </Badge>
          <Heading>
            No invento valor.
            <br />
            <Accent>Lo revelo.</Accent>
          </Heading>
          <Lead>
            El verdadero poder no se anuncia. Se percibe. EL OJO NEGRO observa, ordena y eleva como un negocio,
            talento u oficio es leido, sin traicionar su esencia.
          </Lead>
          <Signature>Arquitecto de Percepcion - Autoridad serena</Signature>
          <Actions>
            <Button type="button" onClick={() => scrollTo('manifiesto')}>
              Ver manifiesto
            </Button>
            <Button variant="secondary" type="button" onClick={() => scrollTo('metodo')}>
              Explorar metodo
            </Button>
            <Button variant="ghost" type="button" onClick={onOpenCriteria} aria-haspopup="dialog">
              Ver umbral de entrada
            </Button>
          </Actions>
        </div>

        <SigilCard>
          <svg viewBox="0 0 220 120" aria-hidden width="100%" style={{ maxWidth: 340 }}>
            <path
              d="M20 60 Q60 18 110 18 Q160 18 200 60 Q160 102 110 102 Q60 102 20 60Z"
              fill="none"
              stroke="#f2ede4"
              strokeWidth="4"
            />
            <line x1="110" y1="10" x2="110" y2="110" stroke="#cdb47c" strokeWidth="4" />
            <circle cx="110" cy="60" r="26" fill="none" stroke="#cdb47c" strokeWidth="4" />
          </svg>
          <SigilTitle>EL OJO NEGRO</SigilTitle>
          <SigilSub>Arquitecto de Percepcion</SigilSub>
          <SigilLimitless>Limitless</SigilLimitless>
        </SigilCard>
      </Grid>
    </Hero>
  );
}
