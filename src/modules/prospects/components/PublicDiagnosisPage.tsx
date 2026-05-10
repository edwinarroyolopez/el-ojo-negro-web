'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import styled from 'styled-components';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { prospectsService } from '../services/prospects.service';
import { DiagnosisPreview } from './DiagnosisPreview';
import { DiagnosisStoryline } from './DiagnosisStoryline';
import { PublicDiagnosisGallery } from './PublicDiagnosisGallery';
import { getDiagnosisSlideDeck, getVisibleDiagnosisSlides } from '../utils/diagnosis-slide-deck.utils';

const Page = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 1.25rem;
  display: grid;
  gap: 1.2rem;
`;

const Shell = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.xl};
  overflow: hidden;
  background: radial-gradient(circle at 80% 0%, rgba(205,180,124,0.13), transparent 34%), #090909;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.25rem;
  border-bottom: ${({ theme }) => theme.borders.subtle};
  background: rgba(9, 9, 9, 0.74);
  backdrop-filter: blur(12px);

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: start;
  }
`;

const Brand = styled.div`
  font-family: ${({ theme }) => theme.typography.fontSerif};
  letter-spacing: 0.14em;

  small {
    display: block;
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.accent};
    font-family: ${({ theme }) => theme.typography.fontSans};
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.typography.size.xs};
  }
`;

const Main = styled.div`
  display: grid;
  gap: 1.2rem;
  padding: clamp(1.4rem, 4vw, 2.75rem);
`;

const Hero = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: 1fr 0.72fr;
    align-items: center;
  }
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h1`
  margin: 0.8rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  margin: 0.95rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 60ch;
  line-height: 1.8;
`;

const Sigil = styled(Card)`
  min-height: 300px;
  display: grid;
  place-items: center;
  text-align: center;
  background: linear-gradient(180deg, rgba(205,180,124,0.09), rgba(255,255,255,0.025));
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const Note = styled.div`
  border: ${({ theme }) => theme.borders.emphasized};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem 1.1rem;
  width: min(100%, 72ch);
  background: rgba(205, 180, 124, 0.07);
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function PublicDiagnosisPage({ slug }: { slug: string }) {
  const diagnosisQuery = useQuery({
    queryKey: ['public-diagnosis', slug],
    queryFn: () => prospectsService.getPublicDiagnosis(slug),
  });

  if (diagnosisQuery.isLoading) {
    return <Page><Card>Cargando diagnóstico público...</Card></Page>;
  }

  if (!diagnosisQuery.data) {
    return <Page><Card>No fue posible cargar este diagnóstico.</Card></Page>;
  }

  const data = diagnosisQuery.data;
  const website = data.prospect.website;
  const instagram = data.prospect.instagram?.startsWith('http')
    ? data.prospect.instagram
    : data.prospect.instagram
      ? `https://instagram.com/${data.prospect.instagram.replace('@', '')}`
      : undefined;
  const structured = (data.diagnosis.structured ?? {}) as Record<string, unknown>;
  const whatsappUrl = typeof structured.whatsappUrl === 'string' ? structured.whatsappUrl : undefined;
  const visibleSlides = getVisibleDiagnosisSlides(getDiagnosisSlideDeck(data.diagnosis, data.prospect.name));

  return (
    <Page>
      <Shell>
        <Header>
          <Brand>
            EL OJO NEGRO
            <small>Diagnóstico Express de Presencia Digital</small>
          </Brand>
          <span style={{ color: '#b5aea1', fontSize: '0.85rem' }}>{`/diagnosticos/${slug}`}</span>
        </Header>

        <Main>
          <Hero>
            <div>
              <Kicker>Observación externa basada en fuentes públicas disponibles.</Kicker>
              <Title>{data.prospect.name}</Title>
              <Lead>{[data.prospect.city, data.prospect.category].filter(Boolean).join(' · ')}</Lead>
              <Lead>{data.diagnosis.summary || 'Hay una oportunidad visible para ordenar mejor recorrido, claridad y confianza digital.'}</Lead>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.35rem' }}>
                {website ? (
                  <a href={website} target="_blank" rel="noreferrer">
                    <Button>Solicitar conversación</Button>
                  </a>
                ) : null}
                {whatsappUrl || instagram ? (
                  <a href={whatsappUrl || instagram} target="_blank" rel="noreferrer">
                    <Button variant="secondary">Escribir por WhatsApp</Button>
                  </a>
                ) : null}
                <Link href="/login">
                  <Button variant="ghost">Hablar con El Ojo Negro</Button>
                </Link>
              </div>
            </div>

            <Sigil>
              <div>
                <svg viewBox="0 0 220 120" aria-hidden="true" style={{ width: 'min(320px, 100%)' }}>
                  <path d="M20 60 Q60 18 110 18 Q160 18 200 60 Q160 102 110 102 Q60 102 20 60Z" fill="none" stroke="#f2ede4" strokeWidth="4" />
                  <line x1="110" y1="10" x2="110" y2="110" stroke="#cdb47c" strokeWidth="4" />
                  <circle cx="110" cy="60" r="26" fill="none" stroke="#cdb47c" strokeWidth="4" />
                </svg>
                <p style={{ fontFamily: 'var(--font-serif), serif', fontSize: '2rem', letterSpacing: '0.18em', margin: '1rem 0 0' }}>EL OJO NEGRO</p>
                <p style={{ color: '#cdb47c', letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.76rem' }}>{data.brand.archetype}</p>
              </div>
            </Sigil>
          </Hero>

          {visibleSlides.length > 0 ? (
            <>
              <PublicDiagnosisGallery slides={visibleSlides} />
              <DiagnosisStoryline prospect={data.prospect} diagnosis={data.diagnosis} />
            </>
          ) : (
            <DiagnosisPreview prospect={data.prospect} diagnosis={data.diagnosis} />
          )}

          <Note>
            <strong>Nota de lectura:</strong> este diagnóstico no afirma pérdidas ni promete resultados. Propone escenarios visibles de mejora para claridad, confianza y recorrido comercial.
          </Note>
        </Main>
      </Shell>
    </Page>
  );
}
