'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { ArrowUpRight, Copy, Globe, Instagram, Link2, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Prospect } from '../types';
import {
  getDiagnosisBoardStatusLabel,
  getDiagnosisDeckSummary,
  getExternalUrl,
  getInstagramUrl,
  getProspectConfidenceScore,
  getProspectNextBestAction,
  getProspectOpportunityScore,
  getPublicDiagnosisPath,
} from '../utils/diagnostics-command-board.utils';

const Panel = styled.aside`
  position: sticky;
  top: 5.75rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: 32px;
  overflow: hidden;
  background: radial-gradient(circle at 82% 0%, rgba(205, 180, 124, 0.14), transparent 35%), rgba(18, 17, 15, 0.86);
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: 1180px) {
    position: static;
  }
`;

const Visual = styled.div`
  min-height: 210px;
  padding: 1.5rem;
  display: grid;
  align-content: end;
  gap: 0.4rem;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.76)), radial-gradient(circle at 62% 18%, rgba(205, 180, 124, 0.32), transparent 34%), linear-gradient(135deg, #18130e, #101514 52%, #070707);
  border-bottom: ${({ theme }) => theme.borders.subtle};
`;

const Eyebrow = styled.small`
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  font-size: 0.68rem;
`;

const Name = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 0.9;
  letter-spacing: -0.045em;
`;

const Body = styled.div`
  padding: 1.25rem;
  display: grid;
  gap: 1rem;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.9rem;
  background: rgba(255, 255, 255, 0.03);

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }

  strong {
    display: block;
    margin-top: 0.45rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 1.5rem;
  }
`;

const SectionTitle = styled.p`
  margin: 0 0 0.45rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const Insight = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem;
  background: rgba(0, 0, 0, 0.16);

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
  }
`;

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const QuickLink = styled.a<{ $disabled?: boolean }>`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.95rem;
  text-decoration: none;
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.textSoft : theme.colors.text)};
  background: rgba(255, 255, 255, 0.025);
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
  opacity: ${({ $disabled }) => ($disabled ? 0.68 : 1)};
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover {
    transform: ${({ $disabled }) => ($disabled ? 'none' : 'translateY(-1px)')};
    border-color: ${({ theme, $disabled }) => ($disabled ? theme.colors.border : theme.colors.borderStrong)};
  }

  span {
    display: block;
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.92rem;
  }
`;

const QuickLinkInternal = styled(Link)`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.95rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.025);
  transition: transform 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  span {
    display: block;
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }

  strong {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.92rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

function getLinkLabel(url: string | null, fallback: string) {
  if (!url) return fallback;
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export function DiagnosticsFocusPanel({
  prospect,
  onCopyContext,
  onCopyPublicLink,
}: {
  prospect: Prospect;
  onCopyContext: (prospect: Prospect) => void;
  onCopyPublicLink: (prospect: Prospect) => void;
}) {
  const websiteUrl = getExternalUrl(prospect.normalizedWebsite ?? prospect.website);
  const instagramUrl = getInstagramUrl(prospect.normalizedInstagram ?? prospect.instagram);
  const publicPath = getPublicDiagnosisPath(prospect);
  const summary = prospect.diagnosis.summary ?? prospect.diagnosis.publicNotes ?? prospect.description ?? prospect.evidenceNotes ?? 'Sin lectura rápida todavía.';

  return (
    <Panel aria-label="Prospecto seleccionado">
      <Visual>
        <Eyebrow>{[prospect.category, prospect.city].filter(Boolean).join(' · ') || 'Diagnóstico privado'}</Eyebrow>
        <Name>{prospect.name}</Name>
      </Visual>

      <Body>
        <StatGrid>
          <StatCard>
            <span>Oportunidad</span>
            <strong>{getProspectOpportunityScore(prospect)}</strong>
          </StatCard>
          <StatCard>
            <span>Confianza</span>
            <strong>{getProspectConfidenceScore(prospect)}</strong>
          </StatCard>
          <StatCard>
            <span>Deck</span>
            <strong>{getDiagnosisDeckSummary(prospect).replace('Deck ', '')}</strong>
          </StatCard>
          <StatCard>
            <span>Estado</span>
            <strong>{getDiagnosisBoardStatusLabel(prospect)}</strong>
          </StatCard>
        </StatGrid>

        <div>
          <SectionTitle>Lectura rápida</SectionTitle>
          <Insight>
            <p>{summary}</p>
          </Insight>
        </div>

        <div>
          <SectionTitle>Siguiente mejor acción</SectionTitle>
          <Insight>
            <p>{getProspectNextBestAction(prospect)}</p>
          </Insight>
        </div>

        <div>
          <SectionTitle>Accesos rápidos</SectionTitle>
          <Links>
            <QuickLink href={websiteUrl ?? '#'} target="_blank" rel="noreferrer" $disabled={!websiteUrl}>
              <span>Web</span>
              <strong><Globe size={15} /> {getLinkLabel(websiteUrl, 'Sin web')}</strong>
            </QuickLink>
            <QuickLink href={instagramUrl ?? '#'} target="_blank" rel="noreferrer" $disabled={!instagramUrl}>
              <span>Instagram</span>
              <strong><Instagram size={15} /> {getLinkLabel(instagramUrl, 'Sin Instagram')}</strong>
            </QuickLink>
            {publicPath ? (
              <QuickLinkInternal href={publicPath}>
                <span>Página pública</span>
                <strong><Link2 size={15} /> {publicPath}</strong>
              </QuickLinkInternal>
            ) : (
              <QuickLink href="#" $disabled>
                <span>Página pública</span>
                <strong><Link2 size={15} /> Aún no publicada</strong>
              </QuickLink>
            )}
            <QuickLinkInternal href={`/dashboard/prospects/${prospect.id}`}>
              <span>Detalle interno</span>
              <strong><PanelRight size={15} /> /dashboard/prospects/{prospect.id}</strong>
            </QuickLinkInternal>
          </Links>
        </div>

        <Actions>
          <Link href={`/dashboard/prospects/${prospect.id}`}>
            <Button>
              Abrir detalle <ArrowUpRight size={16} />
            </Button>
          </Link>
          {publicPath ? (
            <Link href={publicPath}>
              <Button variant="secondary">Ver página pública</Button>
            </Link>
          ) : (
            <Button variant="secondary" disabled>Aún no publicada</Button>
          )}
          <Button variant="secondary" onClick={() => onCopyContext(prospect)}>
            <Copy size={16} /> Copiar contexto
          </Button>
          {publicPath ? (
            <Button variant="ghost" onClick={() => onCopyPublicLink(prospect)}>Copiar link público</Button>
          ) : null}
        </Actions>
      </Body>
    </Panel>
  );
}
