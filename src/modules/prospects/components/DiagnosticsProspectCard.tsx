'use client';

import styled from 'styled-components';
import type { Prospect } from '../types';
import {
  getDiagnosisBoardStatusLabel,
  getDiagnosisBoardStatusTone,
  getDiagnosisDeckSummary,
  getProspectConfidenceScore,
  getProspectOpportunityScore,
} from '../utils/diagnostics-command-board.utils';

const CardButton = styled.button<{ $active: boolean }>`
  appearance: none;
  width: 100%;
  border: ${({ theme, $active }) => ($active ? theme.borders.emphasized : theme.borders.subtle)};
  border-radius: 26px;
  padding: 1rem;
  background: ${({ $active }) => ($active ? 'radial-gradient(circle at 100% 0%, rgba(205, 180, 124, 0.16), transparent 36%), rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.025)')};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) 126px;
  gap: 1rem;
  text-align: left;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
  box-shadow: ${({ theme, $active }) => ($active ? theme.shadows.glow : 'none')};

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Rank = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(205, 180, 124, 0.28);
  background: rgba(205, 180, 124, 0.08);
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.25rem;

  @media (max-width: 760px) {
    display: none;
  }
`;

const Main = styled.div`
  min-width: 0;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  letter-spacing: -0.02em;
`;

const Pill = styled.span<{ $tone?: 'green' | 'gold' | 'neutral' | 'red' }>`
  display: inline-flex;
  align-items: center;
  min-height: 25px;
  padding: 0 0.6rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme, $tone }) => {
    if ($tone === 'green') return theme.colors.success;
    if ($tone === 'gold') return theme.colors.accent;
    if ($tone === 'red') return theme.colors.danger;
    return theme.colors.textSoft;
  }};
  background: ${({ $tone }) => {
    if ($tone === 'green') return 'rgba(113, 178, 132, 0.1)';
    if ($tone === 'gold') return 'rgba(205, 180, 124, 0.08)';
    if ($tone === 'red') return 'rgba(187, 111, 111, 0.1)';
    return 'rgba(255, 255, 255, 0.03)';
  }};
  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const Summary = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  font-size: 0.92rem;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.8rem;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Scores = styled.div`
  display: grid;
  gap: 0.6rem;
  align-content: center;
`;

const ScoreLabel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textSoft};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Bar = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(205, 180, 124, 0.8), rgba(242, 237, 228, 0.95));
  }
`;

function formatEditedAt(value?: string) {
  if (!value) return 'Sin edición reciente';

  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function getPriorityTone(priority?: Prospect['priority']) {
  if (priority === 'CRITICAL') return 'red';
  if (priority === 'HIGH') return 'gold';
  return 'neutral';
}

export function DiagnosticsProspectCard({
  prospect,
  index,
  selected,
  onSelect,
}: {
  prospect: Prospect;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const summary = prospect.diagnosis.summary ?? prospect.diagnosis.publicNotes ?? prospect.description ?? prospect.evidenceNotes ?? 'Diagnóstico sin resumen breve todavía.';
  const opportunity = getProspectOpportunityScore(prospect);
  const confidence = getProspectConfidenceScore(prospect);

  return (
    <CardButton $active={selected} onClick={onSelect} aria-pressed={selected} aria-label={`Seleccionar ${prospect.name}`}>
      <Rank>{index + 1}</Rank>
      <Main>
        <Top>
          <Title>{prospect.name}</Title>
          <Pill $tone={getDiagnosisBoardStatusTone(prospect)}>{getDiagnosisBoardStatusLabel(prospect)}</Pill>
          <Pill $tone={getPriorityTone(prospect.priority)}>{prospect.priority}</Pill>
          <Pill>{getDiagnosisDeckSummary(prospect)}</Pill>
        </Top>
        <Summary>{summary}</Summary>
        <Meta>
          <span>{prospect.category || 'Sin categoría'}</span>
          <span>{prospect.city || 'Sin ciudad'}</span>
          <span>Actualizado: {formatEditedAt(prospect.diagnosis.lastEditedAt ?? prospect.updatedAt)}</span>
        </Meta>
      </Main>
      <Scores>
        <div>
          <ScoreLabel>
            <span>Oportunidad</span>
            <strong>{opportunity}</strong>
          </ScoreLabel>
          <Bar>
            <span style={{ width: `${opportunity}%` }} />
          </Bar>
        </div>
        <div>
          <ScoreLabel>
            <span>Confianza</span>
            <strong>{confidence}</strong>
          </ScoreLabel>
          <Bar>
            <span style={{ width: `${confidence}%` }} />
          </Bar>
        </div>
      </Scores>
    </CardButton>
  );
}
