'use client';

import styled from 'styled-components';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { DiagnosisSeoMetadata } from '../utils/diagnosis-seo.utils';

const Shell = styled(Card)`
  display: grid;
  gap: 1rem;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
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

const StatusPill = styled.div<{ $status: DiagnosisSeoMetadata['status'] }>`
  display: inline-flex;
  align-items: center;
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

const Preview = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: 760px) {
    grid-template-columns: minmax(0, 1fr) 132px;
    align-items: start;
  }
`;

const CopyBlock = styled.div`
  display: grid;
  gap: 0.6rem;
  min-width: 0;
`;

const PreviewTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.3rem;
  line-height: 1.05;
`;

const PreviewDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.xs};
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const Thumb = styled.div`
  aspect-ratio: 1.2 / 1;
  border-radius: ${({ theme }) => theme.radius.lg};
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
  text-align: center;
  padding: 0.8rem;
`;

function getStatusLabel(status: DiagnosisSeoMetadata['status']) {
  if (status === 'READY') return 'Configurado';
  if (status === 'INCOMPLETE') return 'Incompleto';
  return 'Sin configurar';
}

export function DiagnosisSeoSummaryCard({
  seo,
  onEdit,
}: {
  seo: DiagnosisSeoMetadata;
  onEdit: () => void;
}) {
  const hasPreview = Boolean(seo.title || seo.description || seo.imageUrl);

  return (
    <Shell>
      <Top>
        <div>
          <Kicker>SEO para WhatsApp</Kicker>
          <Title>{seo.status === 'READY' ? 'Preview listo para compartir' : 'Aun sin configurar'}</Title>
          <Lead>
            Define como se vera este diagnostico cuando el link viaje por WhatsApp: titulo,
            descripcion e imagen editorial.
          </Lead>
        </div>

        <StatusPill $status={seo.status}>{getStatusLabel(seo.status)}</StatusPill>
      </Top>

      <Preview>
        <CopyBlock>
          <PreviewTitle>{seo.title || 'Sin titulo SEO todavia'}</PreviewTitle>
          <PreviewDescription>
            {seo.description || 'Aun no hay descripcion ni portada configurada para este link.'}
          </PreviewDescription>
          <Meta>
            <span>{seo.title ? `${seo.title.length} caracteres en titulo` : 'Titulo pendiente'}</span>
            <span>
              {seo.imageUrl ? 'Imagen editorial cargada' : 'Imagen pendiente'}
            </span>
          </Meta>
        </CopyBlock>

        <Thumb>
          {seo.imageUrl ? (
            <img src={seo.imageUrl} alt={seo.imageAlt || seo.title || 'Preview SEO'} />
          ) : (
            <Placeholder>{hasPreview ? 'Falta portada' : 'Sin portada'}</Placeholder>
          )}
        </Thumb>
      </Preview>

      <div>
        <Button onClick={onEdit}>{seo.status === 'EMPTY' ? 'Configurar SEO' : 'Editar SEO'}</Button>
      </div>
    </Shell>
  );
}
