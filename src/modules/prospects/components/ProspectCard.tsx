'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { ArrowUpRight, Globe, Instagram } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Prospect } from '../types';
import { ProspectPriorityBadge, ProspectStatusBadge } from './ProspectStatusBadge';

const Wrapper = styled(Card)`
  display: grid;
  gap: 1rem;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.panelStrong};
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.45rem;
`;

const ScoreRing = styled.div<{ $score: number }>`
  width: 68px;
  height: 68px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.3rem;
  position: relative;
  border: 1px solid rgba(205, 180, 124, 0.32);
  background: ${({ $score }) => `conic-gradient(#cdb47c ${$score}%, rgba(255,255,255,0.06) 0)`};

  &::before {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: inherit;
    background: ${({ theme }) => theme.colors.backgroundElevated};
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Lead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 38px;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: ${({ theme }) => theme.borders.subtle};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.03);
  transition: all 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.panelStrong};
  }
`;

const Signals = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Signal = styled.span`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.34rem 0.66rem;
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.03);
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
`;

const ScoreMeta = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

export function ProspectCard({ prospect }: { prospect: Prospect }) {
  const growth = Math.round(prospect.scores.growthOpportunityScore ?? 0);
  const confidence = Math.round(prospect.scores.confidenceScore ?? 0);
  const websiteUrl = prospect.website?.startsWith('http')
    ? prospect.website
    : prospect.website
      ? `https://${prospect.website}`
      : null;
  const instagramUrl = prospect.instagram?.startsWith('http')
    ? prospect.instagram
    : prospect.instagram
      ? `https://instagram.com/${prospect.instagram.replace('@', '')}`
      : null;
  const signals = [
    prospect.website ? 'Web presente' : '',
    prospect.instagram ? 'Instagram presente' : '',
    prospect.outreach?.whatsappMessage || prospect.phones.length ? 'WhatsApp visible' : '',
    prospect.city || '',
  ].filter(Boolean);

  return (
    <Wrapper>
      <Head>
        <div>
          <Title>{prospect.name}</Title>
          <Lead>
            {[prospect.category, prospect.city].filter(Boolean).join(' · ') || 'Prospecto importado'}
          </Lead>
        </div>
        <ScoreRing $score={Math.min(Math.max(growth, 0), 100)}>
          <span>{growth}</span>
        </ScoreRing>
      </Head>

      <Meta>
        <ProspectStatusBadge status={prospect.status} />
        <ProspectPriorityBadge priority={prospect.priority} />
      </Meta>

      <Signals>
        {signals.map((signal) => (
          <Signal key={signal}>{signal}</Signal>
        ))}
      </Signals>

      {websiteUrl || instagramUrl ? (
        <LinkRow>
          {websiteUrl ? (
            <ExternalLink href={websiteUrl} target="_blank" rel="noreferrer" aria-label={`Abrir sitio web de ${prospect.name} en nueva pestaña`}>
              <Globe size={15} /> Sitio web
              <ArrowUpRight size={14} />
            </ExternalLink>
          ) : null}
          {instagramUrl ? (
            <ExternalLink href={instagramUrl} target="_blank" rel="noreferrer" aria-label={`Abrir Instagram de ${prospect.name} en nueva pestaña`}>
              <Instagram size={15} /> Instagram
              <ArrowUpRight size={14} />
            </ExternalLink>
          ) : null}
        </LinkRow>
      ) : (
        <Lead>Sin canal principal identificado aún.</Lead>
      )}

      <Footer>
        <ScoreMeta>
          <span>Growth {growth}</span>
          <span>Confianza {confidence}</span>
        </ScoreMeta>

        <Link href={`/dashboard/prospects/${prospect.id}`}>
          <Button>
            Ver detalle <ArrowUpRight size={16} />
          </Button>
        </Link>
      </Footer>
    </Wrapper>
  );
}
