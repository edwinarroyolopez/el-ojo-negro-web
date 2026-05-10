'use client';

import styled from 'styled-components';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { DiagnosisSlideDeck, DiagnosisStatus } from '../types';
import { getVisibleDiagnosisSlides } from '../utils/diagnosis-slide-deck.utils';

const Shell = styled(Card)`
  display: grid;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h3`
  margin: 0.45rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.8rem;
`;

const Lead = styled.p`
  margin: 0.65rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const StatusPill = styled.div<{ $status: DiagnosisSlideDeck['status'] }>`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 38px;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.5rem 0.85rem;
  border: 1px solid
    ${({ $status }) =>
      $status === 'READY'
        ? 'rgba(113, 178, 132, 0.36)'
        : $status === 'INCOMPLETE'
          ? 'rgba(205, 180, 124, 0.36)'
          : 'rgba(242, 237, 228, 0.14)'};
  background: ${({ $status }) =>
    $status === 'READY'
      ? 'rgba(113, 178, 132, 0.1)'
      : $status === 'INCOMPLETE'
        ? 'rgba(205, 180, 124, 0.1)'
        : 'rgba(255,255,255,0.03)'};
  color: ${({ theme, $status }) =>
    $status === 'READY'
      ? theme.colors.success
      : $status === 'INCOMPLETE'
        ? theme.colors.warning
        : theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.xs};
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
`;

const Count = styled.strong`
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.text};
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
`;

const ThumbRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
`;

const Thumb = styled.div`
  aspect-ratio: 16 / 10;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.borders.subtle};
  overflow: hidden;
  background: rgba(255,255,255,0.03);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.xs};
  text-transform: uppercase;
  letter-spacing: 0.14em;
`;

const Warning = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

function getStatusLabel(status: DiagnosisSlideDeck['status']) {
  if (status === 'READY') return 'Listo para publicar';
  if (status === 'INCOMPLETE') return 'Incompleto';
  return 'Sin slides';
}

export function DiagnosisDeckSummaryCard({
  deck,
  diagnosisStatus,
  onEdit,
}: {
  deck: DiagnosisSlideDeck;
  diagnosisStatus?: DiagnosisStatus;
  onEdit: () => void;
}) {
  const visibleSlides = getVisibleDiagnosisSlides(deck);
  const showWarning = diagnosisStatus === 'PUBLISHED' && deck.status !== 'READY';

  return (
    <Shell>
      <Top>
        <div>
          <Kicker>Deck publico</Kicker>
          <Title>Slides del diagnostico</Title>
          <Lead>Las imagenes que vera el prospecto en la pagina publica.</Lead>
        </div>

        <StatusPill $status={deck.status}>{getStatusLabel(deck.status)}</StatusPill>
      </Top>

      <MetaRow>
        <Count>{visibleSlides.length}/4</Count>
        <span style={{ color: 'var(--foreground-muted, #b5aea1)' }}>{deck.status}</span>
      </MetaRow>

      <ThumbRow>
        {deck.slides.map((slide, index) => (
          <Thumb key={slide.id}>
            {slide.imageUrl ? (
              <img src={slide.thumbnailUrl || slide.imageUrl} alt={slide.alt || slide.title} />
            ) : (
              <Placeholder>{`Slide ${index + 1}`}</Placeholder>
            )}
          </Thumb>
        ))}
      </ThumbRow>

      {showWarning ? (
        <Warning>
          El diagnostico ya esta publicado, pero el deck visual aun esta incompleto.
        </Warning>
      ) : null}

      <div>
        <Button onClick={onEdit}>Editar deck visual</Button>
      </div>
    </Shell>
  );
}
