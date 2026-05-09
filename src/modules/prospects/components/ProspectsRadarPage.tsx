'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/Card';
import { useProspects } from '../hooks/useProspects';
import { useProspectMetrics } from '../hooks/useProspectMetrics';
import type { ProspectListParams } from '../types';
import { ProspectCard } from './ProspectCard';
import { ProspectFilters } from './ProspectFilters';

const Page = styled.div`
  display: grid;
  gap: 1.15rem;
`;

const Hero = styled(Card)`
  padding: clamp(1.5rem, 3vw, 2.4rem);
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h1`
  margin: 0.75rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2.2rem, 5vw, 4.2rem);
  line-height: 0.98;
`;

const Lead = styled.p`
  margin: 0.85rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 72ch;
`;

const Metrics = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled(Card)`
  display: grid;
  gap: 0.35rem;

  strong {
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`;

const Progress = styled.div`
  width: 100%;
  height: 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #cdb47c, rgba(242, 237, 228, 0.94));
  }
`;

const Grid = styled.section`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export function ProspectsRadarPage() {
  const [filters, setFilters] = useState<ProspectListParams>({
    page: 1,
    limit: 24,
    sort: 'growth',
    search: '',
    status: '',
    priority: '',
    category: '',
    city: '',
  });

  const prospectsQuery = useProspects(filters);
  const metricsQuery = useProspectMetrics();

  const categories = useMemo(
    () => [...new Set((prospectsQuery.data?.items ?? []).map((item) => item.category).filter(Boolean))] as string[],
    [prospectsQuery.data?.items],
  );

  const cities = useMemo(
    () => [...new Set((prospectsQuery.data?.items ?? []).map((item) => item.city).filter(Boolean))] as string[],
    [prospectsQuery.data?.items],
  );

  const dailyProgress = metricsQuery.data
    ? Math.min((metricsQuery.data.contactedToday / Math.max(metricsQuery.data.dailyGoal, 1)) * 100, 100)
    : 0;

  return (
    <Page>
      <Hero>
        <Kicker>Radar · centro de mando</Kicker>
        <Title>Radar de Percepción Comercial</Title>
        <Lead>
          Prospectos ordenados por score, estado y próxima acción. Esto debe sentirse como centro de mando, no como Excel con corbata.
        </Lead>
      </Hero>

      <Metrics>
        <Metric>
          <strong>{metricsQuery.data?.total ?? 0}</strong>
          <span>Total</span>
        </Metric>
        <Metric>
          <strong>{metricsQuery.data?.published ?? 0}</strong>
          <span>Publicados</span>
        </Metric>
        <Metric>
          <strong>{metricsQuery.data?.contactedToday ?? 0}/{metricsQuery.data?.dailyGoal ?? 10}</strong>
          <span>Contactados hoy</span>
          <Progress>
            <span style={{ width: `${dailyProgress}%` }} />
          </Progress>
        </Metric>
        <Metric>
          <strong>{metricsQuery.data?.responded ?? 0}</strong>
          <span>Respuestas</span>
        </Metric>
        <Metric>
          <strong>{metricsQuery.data?.meetings ?? 0}</strong>
          <span>Reuniones</span>
        </Metric>
        <Metric>
          <strong>{metricsQuery.data?.won ?? 0}</strong>
          <span>Ganados</span>
        </Metric>
      </Metrics>

      <Card>
        <ProspectFilters values={filters} categories={categories} cities={cities} onChange={setFilters} />
      </Card>

      <Grid>
        {(prospectsQuery.data?.items ?? []).map((prospect) => (
          <ProspectCard key={prospect.id} prospect={prospect} />
        ))}
      </Grid>

      {!prospectsQuery.isLoading && (prospectsQuery.data?.items?.length ?? 0) === 0 ? (
        <Card>
          <Lead>No hay prospectos para estos filtros todavía.</Lead>
        </Card>
      ) : null}
    </Page>
  );
}
