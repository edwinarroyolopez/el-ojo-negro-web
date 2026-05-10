'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Globe, Instagram, Link2, PanelRight } from 'lucide-react';
import type { Prospect } from '../types';
import {
  getDiagnosisBoardStatusLabel,
  getDiagnosisBoardStatusTone,
  getDiagnosisDeckSummary,
  getExternalUrl,
  getInstagramUrl,
  getProspectConfidenceScore,
  getProspectOpportunityScore,
  getPublicDiagnosisPath,
} from '../utils/diagnostics-command-board.utils';

const Wrapper = styled.section`
  margin-top: 1rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: 30px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.024);
`;

const Head = styled.div`
  padding: 1.1rem 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  border-bottom: ${({ theme }) => theme.borders.subtle};

  h3 {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 1.6rem;
    font-weight: ${({ theme }) => theme.typography.weight.semibold};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`;

const Scroll = styled.div`
  overflow-x: auto;
`;

const Matrix = styled.div`
  min-width: 980px;
`;

const Row = styled.div<{ $header?: boolean; $active?: boolean }>`
  display: grid;
  grid-template-columns: minmax(240px, 1.25fr) 130px 130px 130px 170px 180px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: ${({ $header, $active }) => {
    if ($header) return 'rgba(255, 255, 255, 0.025)';
    if ($active) return 'rgba(205, 180, 124, 0.06)';
    return 'transparent';
  }};

  &:last-child {
    border-bottom: 0;
  }
`;

const Cell = styled.div`
  min-width: 0;
  padding: 0.95rem 1rem;

  strong,
  span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    margin-top: 0.2rem;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`;

const HeaderCell = styled(Cell)`
  color: ${({ theme }) => theme.colors.textSoft};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const Pill = styled.span<{ $tone: 'green' | 'gold' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 0.55rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme, $tone }) => ($tone === 'green' ? theme.colors.success : $tone === 'gold' ? theme.colors.accent : theme.colors.textMuted)};
  background: ${({ $tone }) => ($tone === 'green' ? 'rgba(113, 178, 132, 0.1)' : $tone === 'gold' ? 'rgba(205, 180, 124, 0.08)' : 'rgba(255, 255, 255, 0.03)')};
  font-size: 0.68rem;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  width: fit-content;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const IconLink = styled.a<{ $disabled?: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radius.pill};
  display: grid;
  place-items: center;
  border: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.textSoft : theme.colors.textMuted)};
  text-decoration: none;
  background: rgba(255, 255, 255, 0.026);
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  transition: transform 180ms ease, border-color 180ms ease, color 180ms ease;

  &:hover {
    color: ${({ theme, $disabled }) => ($disabled ? theme.colors.textSoft : theme.colors.text)};
    border-color: ${({ theme, $disabled }) => ($disabled ? theme.colors.border : theme.colors.borderStrong)};
    transform: ${({ $disabled }) => ($disabled ? 'none' : 'translateY(-1px)')};
  }
`;

const IconLinkInternal = styled(Link)`
  width: 34px;
  height: 34px;
  border-radius: ${({ theme }) => theme.radius.pill};
  display: grid;
  place-items: center;
  border: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  background: rgba(255, 255, 255, 0.026);
  transition: transform 180ms ease, border-color 180ms ease, color 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    transform: translateY(-1px);
  }
`;

export function DiagnosticsComparisonMatrix({
  prospects,
  selectedId,
}: {
  prospects: Prospect[];
  selectedId?: string | null;
}) {
  return (
    <Wrapper>
      <Head>
        <div>
          <h3>Comparación compacta</h3>
          <p>Soporte de lectura rápida sin convertir la experiencia en tabla principal.</p>
        </div>
      </Head>
      <Scroll>
        <Matrix>
          <Row $header>
            <HeaderCell>Prospecto</HeaderCell>
            <HeaderCell>Estado</HeaderCell>
            <HeaderCell>Oportunidad</HeaderCell>
            <HeaderCell>Confianza</HeaderCell>
            <HeaderCell>Deck / Publicación</HeaderCell>
            <HeaderCell>Accesos</HeaderCell>
          </Row>
          {prospects.map((prospect) => {
            const websiteUrl = getExternalUrl(prospect.normalizedWebsite ?? prospect.website);
            const instagramUrl = getInstagramUrl(prospect.normalizedInstagram ?? prospect.instagram);
            const publicPath = getPublicDiagnosisPath(prospect);

            return (
              <Row key={prospect.id} $active={selectedId === prospect.id}>
                <Cell>
                  <strong>{prospect.name}</strong>
                  <span>{[prospect.category, prospect.city].filter(Boolean).join(' · ') || 'Prospecto privado'}</span>
                </Cell>
                <Cell>
                  <Pill $tone={getDiagnosisBoardStatusTone(prospect)}>{getDiagnosisBoardStatusLabel(prospect)}</Pill>
                </Cell>
                <Cell>
                  <strong>{getProspectOpportunityScore(prospect)}</strong>
                  <span>potencial</span>
                </Cell>
                <Cell>
                  <strong>{getProspectConfidenceScore(prospect)}</strong>
                  <span>evidencia</span>
                </Cell>
                <Cell>
                  <strong>{getDiagnosisDeckSummary(prospect)}</strong>
                  <span>{publicPath ? 'Publicable' : 'Privado'}</span>
                </Cell>
                <Cell>
                  <Actions>
                    <IconLink href={websiteUrl ?? '#'} target="_blank" rel="noreferrer" title="Web" $disabled={!websiteUrl}>
                      <Globe size={15} />
                    </IconLink>
                    <IconLink href={instagramUrl ?? '#'} target="_blank" rel="noreferrer" title="Instagram" $disabled={!instagramUrl}>
                      <Instagram size={15} />
                    </IconLink>
                    {publicPath ? (
                      <IconLinkInternal href={publicPath} title="Página pública">
                        <Link2 size={15} />
                      </IconLinkInternal>
                    ) : (
                      <IconLink href="#" title="Aún no publicada" $disabled>
                        <Link2 size={15} />
                      </IconLink>
                    )}
                    <IconLinkInternal href={`/dashboard/prospects/${prospect.id}`} title="Detalle interno">
                      <PanelRight size={15} />
                    </IconLinkInternal>
                  </Actions>
                </Cell>
              </Row>
            );
          })}
        </Matrix>
      </Scroll>
    </Wrapper>
  );
}
