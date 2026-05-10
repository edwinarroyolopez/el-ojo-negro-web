'use client';

import styled from 'styled-components';
import type { Prospect, ProspectDiagnosis } from '../types';
import {
  deriveMinimumSystem,
  deriveOpportunityList,
  derivePositiveSignals,
  deriveQuickWin,
  getDiagnosisScoreEntries,
  parseMarkdown,
  renderMarkdownBlocks,
} from '../utils';
import { DiagnosisDeckPreview } from './DiagnosisDeckPreview';

const Shell = styled.section`
  display: grid;
  gap: 1rem;
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h2`
  margin: 0.45rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.8rem, 4vw, 2.5rem);
`;

const Lead = styled.p`
  margin: 0.8rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Section = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1.2rem;
  background: ${({ theme }) => theme.colors.panel};
`;

const ScoreGrid = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const ScoreTile = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);

  strong {
    display: block;
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.accent};
    margin-top: 0.3rem;
  }
`;

const Opportunity = styled.div`
  padding-left: 1rem;
  border-left: 2px solid ${({ theme }) => theme.colors.accent};

  & + & {
    margin-top: 0.9rem;
  }

  h4 {
    margin: 0;
  }

  p {
    margin: 0.35rem 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Flow = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const FlowStep = styled.div`
  min-height: 88px;
  display: grid;
  place-items: center;
  text-align: center;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 0.85rem;
`;

const RichText = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};

  h2,
  h3,
  h4 {
    margin: 1rem 0 0.4rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontSerif};
  }

  p,
  ul {
    margin: 0.55rem 0 0;
  }

  ul {
    padding-left: 1.1rem;
  }
`;

type PreviewProspect = Pick<Prospect, 'name' | 'website' | 'instagram' | 'category' | 'city'>;

export function DiagnosisPreview({
  prospect,
  diagnosis,
}: {
  prospect: PreviewProspect;
  diagnosis?: ProspectDiagnosis;
}) {
  const blocks = parseMarkdown(diagnosis?.markdown);
  const scoreEntries = getDiagnosisScoreEntries(diagnosis?.scores);
  const positiveSignals = derivePositiveSignals(prospect);
  const opportunities = deriveOpportunityList(diagnosis ?? {}, prospect.name);
  const quickWin = deriveQuickWin(diagnosis ?? {});
  const minimumSystem = deriveMinimumSystem(diagnosis ?? {});

  return (
    <Shell>
      <Section>
        <Kicker>Preview</Kicker>
        <Title>{diagnosis?.title || `Diagnóstico Express — ${prospect.name}`}</Title>
        <Lead>
          {diagnosis?.summary || 'Observación externa basada en fuentes públicas disponibles.'}
        </Lead>
      </Section>

      <DiagnosisDeckPreview diagnosis={diagnosis} />

      {scoreEntries.length > 0 ? (
        <ScoreGrid>
          {scoreEntries.map((entry) => (
            <ScoreTile key={entry.label}>
              <span>{entry.label}</span>
              <strong>{entry.value}</strong>
            </ScoreTile>
          ))}
        </ScoreGrid>
      ) : null}

      <Grid>
        <Section>
          <Kicker>Señales positivas</Kicker>
          {positiveSignals.map((signal) => (
            <Opportunity key={signal}>
              <h4>{signal}</h4>
            </Opportunity>
          ))}
        </Section>

        <Section>
          <Kicker>Oportunidades principales</Kicker>
          {opportunities.map((opportunity, index) => (
            <Opportunity key={opportunity}>
              <h4>{`0${index + 1}`.slice(-2)} · Ruta de mejora</h4>
              <p>{opportunity}</p>
            </Opportunity>
          ))}
        </Section>
      </Grid>

      <Section>
        <Kicker>Mapa recomendado</Kicker>
        <Title style={{ fontSize: '2rem' }}>Instagram / Google → Landing → Confianza → WhatsApp → Agenda</Title>
        <Flow>
          <FlowStep>Instagram<br />Google</FlowStep>
          <FlowStep>Landing por servicio</FlowStep>
          <FlowStep>Pruebas y claridad</FlowStep>
          <FlowStep>WhatsApp contextual</FlowStep>
          <FlowStep>Agenda y seguimiento</FlowStep>
        </Flow>
      </Section>

      <Section>
        <Kicker>Mejora rápida</Kicker>
        <Lead>{quickWin}</Lead>
      </Section>

      <Section>
        <Kicker>Sistema minimo recomendado</Kicker>
        <Lead>{minimumSystem}</Lead>
      </Section>

      {blocks.length > 0 ? (
        <Section>
          <Kicker>Markdown renderizado</Kicker>
          <RichText>{renderMarkdownBlocks(blocks)}</RichText>
        </Section>
      ) : null}
    </Shell>
  );
}
