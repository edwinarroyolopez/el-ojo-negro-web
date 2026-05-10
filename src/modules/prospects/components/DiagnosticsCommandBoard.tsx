'use client';

import Link from 'next/link';
import { useDeferredValue, useMemo, useState } from 'react';
import styled from 'styled-components';
import { RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/feedback/EmptyState';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Prospect } from '../types';
import {
  filterDiagnosticsProspects,
  getDiagnosisBoardStatusLabel,
  getDiagnosisDeckSummary,
  getDiagnosticsBoardMetrics,
  getExternalUrl,
  getInstagramUrl,
  getProspectConfidenceScore,
  getProspectNextBestAction,
  getProspectOpportunityScore,
  getPublicDiagnosisPath,
  sortDiagnosticsProspects,
  type DiagnosticsQuickFilter,
  type DiagnosticsSortMode,
} from '../utils/diagnostics-command-board.utils';
import { DiagnosticsComparisonMatrix } from './DiagnosticsComparisonMatrix';
import { DiagnosticsFocusPanel } from './DiagnosticsFocusPanel';
import { DiagnosticsProspectCard } from './DiagnosticsProspectCard';

const FILTER_CHIPS: Array<{ value: DiagnosticsQuickFilter; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'published', label: 'Publicados' },
  { value: 'ready', label: 'Listos' },
  { value: 'draft', label: 'Borradores' },
  { value: 'hasDeck', label: 'Con deck' },
  { value: 'highOpportunity', label: 'Alta oportunidad' },
];

const SORT_OPTIONS: Array<{ value: DiagnosticsSortMode; label: string }> = [
  { value: 'action', label: 'Siguiente acción' },
  { value: 'opportunity', label: 'Mayor oportunidad' },
  { value: 'confidence', label: 'Mayor confianza' },
  { value: 'recent', label: 'Más reciente' },
  { value: 'name', label: 'Nombre A-Z' },
];

const Page = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 1540px;
  margin: 0 auto;
`;

const Hero = styled(Card)`
  padding: clamp(1.5rem, 3vw, 2.4rem);
  background: radial-gradient(circle at 0 0, rgba(205, 180, 124, 0.08), transparent 26%), linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 0.6rem;
  color: ${({ theme }) => theme.colors.accent};
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: ${({ theme }) => theme.typography.size.xs};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
`;

const Title = styled.h1`
  margin: 0;
  max-width: 14ch;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(3rem, 7vw, 6rem);
  line-height: 0.86;
  letter-spacing: -0.055em;
`;

const Lead = styled.p`
  margin: 0.85rem 0 0;
  max-width: 70ch;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;

  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

const Metrics = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled(Card)`
  position: relative;
  overflow: hidden;
  padding: 1.1rem;
  background: rgba(255, 255, 255, 0.03);

  &::after {
    content: '';
    position: absolute;
    inset: auto -18% -54% 56%;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(205, 180, 124, 0.14), transparent 68%);
  }

  span {
    position: relative;
    display: block;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.typography.weight.bold};
  }

  strong {
    position: relative;
    display: block;
    margin-top: 0.6rem;
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 2.2rem;
    line-height: 1;
  }
`;

const MetricNote = styled.small`
  display: block;
  margin-top: 0.35rem;
  color: ${({ theme }) => theme.colors.textSoft};
`;

const Toolbar = styled.section`
  position: sticky;
  top: 4.8rem;
  z-index: 8;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: 28px;
  padding: 0.75rem;
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto auto;
  gap: 0.75rem;
  background: rgba(12, 12, 11, 0.82);
  backdrop-filter: blur(18px);
  box-shadow: ${({ theme }) => theme.shadows.sm};

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    top: 4.4rem;
  }
`;

const SearchInput = styled.input`
  min-height: 48px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0 1rem;
  background: rgba(0, 0, 0, 0.22);
  color: ${({ theme }) => theme.colors.text};
  font: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSoft};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Chips = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Chip = styled.button<{ $active: boolean }>`
  appearance: none;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $active }) => ($active ? `linear-gradient(135deg, ${theme.colors.accent}, rgba(242, 237, 228, 0.95))` : 'rgba(255, 255, 255, 0.025)')};
  color: ${({ theme, $active }) => ($active ? theme.colors.accentForeground : theme.colors.textMuted)};
  padding: 0 0.85rem;
  min-height: 42px;
  cursor: pointer;
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const Select = styled.select`
  min-height: 48px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0 0.95rem;
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.025);
`;

const Board = styled.section`
  display: grid;
  grid-template-columns: minmax(460px, 0.95fr) minmax(380px, 0.72fr);
  gap: 1rem;
  align-items: start;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const List = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const FocusWrap = styled.div`
  min-width: 0;
`;

const EmptyWrap = styled.div`
  padding: 1.25rem 0;
`;

const SkeletonCard = styled(Card)`
  min-height: 152px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
`;

function buildCopyContext(prospect: Prospect) {
  const website = getExternalUrl(prospect.normalizedWebsite ?? prospect.website) ?? 'Sin web';
  const instagram = getInstagramUrl(prospect.normalizedInstagram ?? prospect.instagram) ?? 'Sin Instagram';

  return [
    `Prospecto: ${prospect.name}`,
    `Categoría: ${prospect.category || 'Sin categoría'}`,
    `Ciudad: ${prospect.city || 'Sin ciudad'}`,
    `Web: ${website}`,
    `Instagram: ${instagram}`,
    `Estado diagnóstico: ${getDiagnosisBoardStatusLabel(prospect)}`,
    `Resumen: ${prospect.diagnosis.summary ?? prospect.diagnosis.publicNotes ?? prospect.description ?? prospect.evidenceNotes ?? 'Sin resumen'}`,
    `Oportunidad: ${getProspectOpportunityScore(prospect)}`,
    `Confianza: ${getProspectConfidenceScore(prospect)}`,
    `Deck visual: ${getDiagnosisDeckSummary(prospect)}`,
    `Siguiente acción sugerida: ${getProspectNextBestAction(prospect)}`,
  ].join('\n');
}

async function copyToClipboard(value: string, successMessage: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(successMessage);
  } catch {
    toast.error('No fue posible copiar el contexto');
  }
}

export function DiagnosticsCommandBoard({
  prospects,
  isLoading,
  isError,
  onRetry,
}: {
  prospects: Prospect[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}) {
  const [search, setSearch] = useState('');
  const [quickFilter, setQuickFilter] = useState<DiagnosticsQuickFilter>('all');
  const [sortMode, setSortMode] = useState<DiagnosticsSortMode>('action');
  const [selectedId, setSelectedId] = useState<string | null>(prospects[0]?.id ?? null);
  const deferredSearch = useDeferredValue(search);

  const diagnosedProspects = useMemo(() => prospects, [prospects]);
  const filteredProspects = useMemo(
    () => sortDiagnosticsProspects(filterDiagnosticsProspects(diagnosedProspects, { search: deferredSearch, quickFilter }), sortMode),
    [deferredSearch, diagnosedProspects, quickFilter, sortMode],
  );

  const hasActiveFilters = search.trim().length > 0 || quickFilter !== 'all';
  const metrics = useMemo(
    () => getDiagnosticsBoardMetrics(hasActiveFilters ? filteredProspects : diagnosedProspects),
    [diagnosedProspects, filteredProspects, hasActiveFilters],
  );

  const selectedProspect = filteredProspects.find((prospect) => prospect.id === selectedId) ?? filteredProspects[0] ?? null;
  const activeSelectedId = selectedProspect?.id ?? null;

  function clearFilters() {
    setSearch('');
    setQuickFilter('all');
    setSortMode('action');
  }

  async function handleCopyContext(prospect: Prospect) {
    await copyToClipboard(buildCopyContext(prospect), 'Contexto copiado');
  }

  async function handleCopyPublicLink(prospect: Prospect) {
    const publicPath = getPublicDiagnosisPath(prospect);
    if (!publicPath) {
      toast.error('Este diagnóstico aún no tiene página pública');
      return;
    }

    await copyToClipboard(publicPath, 'Link público copiado');
  }

  return (
    <Page>
      <Hero>
        <div>
          <Eyebrow>Diagnósticos realizados</Eyebrow>
          <Title>Prospectos que ya tienen lectura.</Title>
          <Lead>
            Esta vista no existe para almacenar. Existe para decidir qué diagnóstico merece acción hoy: publicar, contactar, comparar evidencia y abrir contexto sin buscar en otra pantalla.
          </Lead>
        </div>
        <HeroActions>
          <Button variant="secondary" disabled>Exportar vista</Button>
          <Link href="/dashboard/prospects">
            <Button>Ir al radar</Button>
          </Link>
        </HeroActions>
      </Hero>

      <Metrics aria-label="Resumen de diagnósticos">
        <Metric>
          <span>Total diagnosticados</span>
          <strong>{metrics.total}</strong>
          <MetricNote>{hasActiveFilters ? 'Resultados filtrados' : 'Base total diagnosticada'}</MetricNote>
        </Metric>
        <Metric>
          <span>Publicados</span>
          <strong>{metrics.published}</strong>
          <MetricNote>Listos para compartir</MetricNote>
        </Metric>
        <Metric>
          <span>Listos para actuar</span>
          <strong>{metrics.readyToAct}</strong>
          <MetricNote>Publicado o ready con deck completo</MetricNote>
        </Metric>
        <Metric>
          <span>Promedio oportunidad</span>
          <strong>{metrics.averageOpportunity}</strong>
          <MetricNote>Score comercial visible</MetricNote>
        </Metric>
      </Metrics>

      <Toolbar aria-label="Filtros rápidos">
        <SearchInput
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nombre, categoría, ciudad o señal..."
          aria-label="Buscar diagnósticos"
        />
        <Chips role="group" aria-label="Estado del diagnóstico">
          {FILTER_CHIPS.map((chip) => (
            <Chip
              key={chip.value}
              $active={quickFilter === chip.value}
              onClick={() => setQuickFilter(chip.value)}
              aria-pressed={quickFilter === chip.value}
            >
              {chip.label}
            </Chip>
          ))}
        </Chips>
        <Select value={sortMode} onChange={(event) => setSortMode(event.target.value as DiagnosticsSortMode)} aria-label="Ordenar diagnósticos">
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              Orden: {option.label}
            </option>
          ))}
        </Select>
      </Toolbar>

      {isError ? (
        <EmptyState
          title="No fue posible cargar diagnósticos."
          description="La cabina de decisión no pudo traer la lectura disponible. Puedes reintentar sin afectar el radar ni el detalle."
          action={
            <Button variant="secondary" onClick={onRetry}>
              <RotateCcw size={16} /> Reintentar
            </Button>
          }
        />
      ) : null}

      {!isError ? (
        <>
          <Board>
            <List>
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} aria-hidden="true" />)
                : filteredProspects.map((prospect, index) => (
                    <DiagnosticsProspectCard
                      key={prospect.id}
                      prospect={prospect}
                      index={index}
                      selected={activeSelectedId === prospect.id}
                      onSelect={() => setSelectedId(prospect.id)}
                    />
                  ))}

              {!isLoading && filteredProspects.length === 0 ? (
                <EmptyWrap>
                  <EmptyState
                    title="No hay diagnósticos con estos filtros."
                    description="Ajusta la búsqueda o vuelve al set completo para recuperar señal y decidir en qué lectura actuar primero."
                    action={<Button variant="secondary" onClick={clearFilters}>Limpiar filtros</Button>}
                  />
                </EmptyWrap>
              ) : null}
            </List>

            <FocusWrap>
              {isLoading ? (
                <SkeletonCard style={{ minHeight: '620px' }} aria-hidden="true" />
              ) : selectedProspect ? (
                <DiagnosticsFocusPanel
                  prospect={selectedProspect}
                  onCopyContext={handleCopyContext}
                  onCopyPublicLink={handleCopyPublicLink}
                />
              ) : null}
            </FocusWrap>
          </Board>

          {!isLoading && filteredProspects.length > 0 ? (
            <DiagnosticsComparisonMatrix prospects={filteredProspects} selectedId={activeSelectedId} />
          ) : null}
        </>
      ) : null}
    </Page>
  );
}
