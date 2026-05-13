'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  AlertTriangle,
  CheckCircle,
  Copy,
  Instagram,
  Save,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { InstagramResearchData, Prospect } from '../types';
import {
  buildInstagramResearchPrompt,
  getInstagramFollowersValue,
  getInstagramPostsValue,
  getInstagramSummary,
  parseInstagramResearchJson,
} from '../utils/instagram-research.utils';

const Overlay = styled.button`
  position: fixed;
  inset: 0;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(14px);
  z-index: ${({ theme }) => theme.zIndex.modal + 2};
`;

const Shell = styled.div`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: min(1100px, calc(100vw - 2rem));
  height: min(92vh, 920px);
  z-index: ${({ theme }) => theme.zIndex.modal + 3};

  @media (max-width: 900px) {
    inset: 1rem;
    transform: none;
    width: auto;
    height: calc(100dvh - 2rem);
  }
`;

const Container = styled(Card)`
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  background:
    radial-gradient(circle at 84% 0%, rgba(205,180,124,0.14), transparent 26%),
    linear-gradient(180deg, rgba(18,19,22,0.99), rgba(10,11,14,0.99));
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: ${({ theme }) => theme.borders.subtle};
`;

const TitleWrap = styled.div`
  min-width: 0;
`;

const Title = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.8rem, 3vw, 2.7rem);
`;

const Lead = styled.p`
  margin: 0.45rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TabRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 1rem 0;
`;

const TabButton = styled.button<{ $active: boolean }>`
  appearance: none;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? 'rgba(205,180,124,0.12)' : 'rgba(255,255,255,0.04)')};
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.textSoft)};
  font: inherit;
  font-weight: ${({ theme }) => theme.typography.weight.semibold};
  padding: 0.7rem 0.95rem;
  cursor: pointer;
`;

const Body = styled.div`
  min-height: 0;
  overflow-y: auto;
  display: grid;
  gap: 1rem;
  padding-bottom: 1rem;
`;

const Panel = styled.section`
  display: grid;
  gap: 1rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem;
`;

const Summary = styled.div`
  border-radius: ${({ theme }) => theme.radius.xl};
  border: ${({ theme }) => theme.borders.subtle};
  padding: 1rem;
  background: rgba(205, 180, 124, 0.06);
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.65;
  white-space: pre-wrap;
`;

const ScoreGrid = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const ScoreCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.95rem;
  background: rgba(26, 33, 48, 0.46);

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 0.4rem;
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
`;

const Chip = styled.span<{ $tone?: 'warning' | 'success' | 'muted' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 36px;
  padding: 0.45rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme, $tone }) =>
    $tone === 'warning'
      ? 'rgba(255, 184, 77, 0.35)'
      : $tone === 'success'
        ? 'rgba(55, 211, 153, 0.28)'
        : 'rgba(205, 180, 124, 0.22)'};
  background: ${({ $tone }) =>
    $tone === 'warning'
      ? 'rgba(255, 184, 77, 0.08)'
      : $tone === 'success'
        ? 'rgba(55, 211, 153, 0.1)'
        : 'rgba(255, 255, 255, 0.04)'};
  color: ${({ theme, $tone }) =>
    $tone === 'warning'
      ? theme.colors.warning
      : $tone === 'success'
        ? '#7af0c4'
        : theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const MetricGrid = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
`;

const MetricCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: rgba(28, 35, 48, 0.55);
  padding: 0.9rem;

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 0.35rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TwoCol = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 0.92rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const Textarea = styled.textarea<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 260px;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  background: rgba(10, 12, 16, 0.86);
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  resize: vertical;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  line-height: 1.6;
`;

const FinePrint = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.55;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const PreviewRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const PreviewItem = styled.div`
  min-width: 140px;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.8rem 0.9rem;
  background: rgba(255, 255, 255, 0.03);

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
    text-transform: uppercase;
  }

  strong {
    display: block;
    margin-top: 0.3rem;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  border-top: ${({ theme }) => theme.borders.subtle};
  padding-top: 1rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

type InstagramResearchModalProps = {
  prospect: Prospect;
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: InstagramResearchData) => Promise<void>;
  isSaving?: boolean;
};

type TabKey = 'LECTURA' | 'PROMPT' | 'JSON' | 'REFINAR';

const TABS: TabKey[] = ['LECTURA', 'PROMPT', 'JSON', 'REFINAR'];

function renderValue(value: string | number | null | undefined) {
  return value ?? 'unavailable';
}

function asInstagramResearchData(
  data?: Prospect['data_instagram'],
): InstagramResearchData | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }

  return data as InstagramResearchData;
}

function toStringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : [];
}

function getFreshnessLabel(data?: Prospect['data_instagram']) {
  const normalized = asInstagramResearchData(data);
  if (!normalized) return null;

  const observed = Array.isArray(normalized.observedMetrics)
    ? normalized.observedMetrics
    : [];
  const freshness = observed.find((metric) => metric.freshness)?.freshness;
  return freshness ?? null;
}

export function InstagramResearchModal({
  prospect,
  isOpen,
  onClose,
  onSave,
  isSaving = false,
}: InstagramResearchModalProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('LECTURA');
  const [rawJson, setRawJson] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    setActiveTab('LECTURA');
    setRawJson(
      prospect.data_instagram ? JSON.stringify(prospect.data_instagram, null, 2) : '',
    );
  }, [isOpen, prospect.data_instagram]);

  const prompt = useMemo(() => buildInstagramResearchPrompt(prospect), [prospect]);
  const validation = useMemo(() => parseInstagramResearchJson(rawJson), [rawJson]);
  const previewPayload = validation.payload;
  const refinementPrompt = useMemo(() => {
    if (!prospect.data_instagram) return '';

    return [
      'Refiná esta lectura de Instagram sin inventar datos ni completar huecos con supuestos.',
      'Mejorá precisión, separación entre observed / estimated / benchmark y claridad ejecutiva para Growth Partner.',
      'Respondé SOLO con un único JSON válido manteniendo el mismo esquema y `doNotInvent=true`.',
      '',
      'JSON actual:',
      JSON.stringify(prospect.data_instagram, null, 2),
    ].join('\n');
  }, [prospect.data_instagram]);

  if (!isOpen) return null;

  async function handleCopyPrompt(value: string, message: string) {
    await navigator.clipboard.writeText(value);
    toast.success(message);
  }

  function handleValidate() {
    if (!validation.isValid) {
      toast.error(validation.error || 'El JSON no es válido');
      return;
    }

    if (validation.payload?.channel !== 'instagram') {
      toast.warning('El JSON es válido, pero `channel` no es `instagram`.');
      return;
    }

    if (validation.payload?.doNotInvent !== true) {
      toast.warning('JSON válido, pero falta confirmar `doNotInvent=true`.');
      return;
    }

    toast.success('JSON de Instagram válido');
  }

  async function handleSave() {
    if (!validation.isValid || !validation.payload) {
      toast.error(validation.error || 'El JSON no es válido');
      return;
    }

    if (validation.payload.channel !== 'instagram') {
      toast.warning('Guardando lectura válida con `channel` distinto de `instagram`.');
    }

    if (validation.payload.doNotInvent !== true) {
      toast.warning('Guardando lectura sin `doNotInvent=true`. Revisá la fuente luego.');
    }

    await onSave(validation.payload);
  }

  const instagramData = asInstagramResearchData(prospect.data_instagram);
  const followers = getInstagramFollowersValue(instagramData);
  const posts = getInstagramPostsValue(instagramData);
  const summary = getInstagramSummary(instagramData);
  const freshness = getFreshnessLabel(instagramData);
  const topStrengths = toStringList(instagramData?.topStrengths);
  const topFrictions = toStringList(instagramData?.topFrictions);
  const opportunities = toStringList(instagramData?.opportunities);
  const risks = toStringList(instagramData?.risks);

  return (
    <>
      <Overlay type="button" aria-label="Cerrar modal de Instagram" onClick={onClose} />
      <Shell>
        <Container>
          <Header>
            <TitleWrap>
              <Title><Instagram size={20} style={{ marginRight: '0.55rem', verticalAlign: 'text-bottom' }} />Instagram</Title>
              <Lead>Lectura de tracción, deseo y ruta de decisión</Lead>
            </TitleWrap>
            <Button type="button" variant="ghost" onClick={onClose} aria-label="Cerrar modal de Instagram">
              <X size={18} />
            </Button>
          </Header>

          <TabRow>
            {TABS.map((tab) => (
              <TabButton
                key={tab}
                type="button"
                $active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </TabButton>
            ))}
          </TabRow>

          <Body>
            {activeTab === 'LECTURA' ? (
              !instagramData ? (
                <Panel>
                  <FinePrint>
                    Aún no hay lectura de Instagram. Copia el prompt, ejecútalo con AI y pega el JSON.
                  </FinePrint>
                </Panel>
              ) : (
                <>
                  {summary ? <Summary>{summary}</Summary> : null}

                  <ScoreGrid>
                    <ScoreCard><span>Presencia</span><strong>{renderValue(instagramData.presenceScore)}</strong></ScoreCard>
                    <ScoreCard><span>Consistencia</span><strong>{renderValue(instagramData.consistencyScore)}</strong></ScoreCard>
                    <ScoreCard><span>Interacción</span><strong>{renderValue(instagramData.interactionHealthScore)}</strong></ScoreCard>
                    <ScoreCard><span>Lista p/propuesta</span><strong>{renderValue(instagramData.proposalReadinessScore)}</strong></ScoreCard>
                  </ScoreGrid>

                  <ChipRow>
                    {instagramData.sourceConfidence ? <Chip>Confianza: {instagramData.sourceConfidence}</Chip> : null}
                    {instagramData.observationDate ? <Chip>Observado: {instagramData.observationDate}</Chip> : null}
                    {typeof instagramData.doNotInvent === 'boolean' ? (
                      <Chip $tone={instagramData.doNotInvent ? 'success' : 'warning'}>
                        {instagramData.doNotInvent ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                        doNotInvent {String(instagramData.doNotInvent)}
                      </Chip>
                    ) : null}
                    {freshness ? <Chip>Freshness: {freshness}</Chip> : null}
                  </ChipRow>

                  <Panel>
                    <SectionTitle>Métricas observadas</SectionTitle>
                    <MetricGrid>
                      <MetricCard><span>Followers</span><strong>{renderValue(followers)}</strong></MetricCard>
                      <MetricCard><span>Posts visibles</span><strong>{renderValue(posts)}</strong></MetricCard>
                      <MetricCard><span>Following</span><strong>{renderValue(instagramData.metrics?.following ?? instagramData.observedSignals?.followingCountObserved)}</strong></MetricCard>
                      <MetricCard><span>Cadencia 30d</span><strong>{renderValue(instagramData.metrics?.postingCadence30d ?? instagramData.observedSignals?.recentPostingCadenceObserved)}</strong></MetricCard>
                      <MetricCard><span>Engagement</span><strong>{renderValue(instagramData.metrics?.engagementRead ?? instagramData.observedSignals?.visibleEngagementSignalObserved)}</strong></MetricCard>
                    </MetricGrid>
                  </Panel>

                  <TwoCol>
                    <Panel>
                      <SectionTitle>Fortalezas</SectionTitle>
                      {topStrengths.length > 0 ? (
                        <List>{topStrengths.map((item) => <li key={item}>{item}</li>)}</List>
                      ) : <FinePrint>Sin fortalezas resumidas aún.</FinePrint>}
                    </Panel>

                    <Panel>
                      <SectionTitle>Fricciones</SectionTitle>
                      {topFrictions.length > 0 ? (
                        <List>{topFrictions.map((item) => <li key={item}>{item}</li>)}</List>
                      ) : <FinePrint>Sin fricciones resumidas aún.</FinePrint>}
                    </Panel>

                    <Panel>
                      <SectionTitle>Oportunidades</SectionTitle>
                      {opportunities.length > 0 ? (
                        <List>{opportunities.map((item) => <li key={item}>{item}</li>)}</List>
                      ) : <FinePrint>Sin oportunidades registradas aún.</FinePrint>}
                    </Panel>

                    <Panel>
                      <SectionTitle>Riesgos</SectionTitle>
                      {risks.length > 0 ? (
                        <List>{risks.map((item) => <li key={item}>{item}</li>)}</List>
                      ) : <FinePrint>Sin riesgos explícitos aún.</FinePrint>}
                    </Panel>
                  </TwoCol>

                  <Panel>
                    <SectionTitle>Siguiente pregunta</SectionTitle>
                    <FinePrint>{instagramData.recommendedNextQuestion || 'Sin pregunta sugerida todavía.'}</FinePrint>
                  </Panel>
                </>
              )
            ) : null}

            {activeTab === 'PROMPT' ? (
              <Panel>
                <FinePrint>
                  Copiá el prompt, ejecútalo con tu herramienta de análisis y traé solo JSON válido como respuesta.
                </FinePrint>
                <Textarea value={prompt} readOnly aria-label="Prompt de investigación de Instagram" />
                <ActionRow>
                  <Button type="button" onClick={() => handleCopyPrompt(prompt, 'Prompt de Instagram copiado')}>
                    <Copy size={16} /> Copiar prompt
                  </Button>
                </ActionRow>
              </Panel>
            ) : null}

            {activeTab === 'JSON' ? (
              <Panel>
                <FinePrint>
                  Pegá aquí el JSON devuelto por la AI. Se validará antes de persistirlo en `data_instagram`.
                </FinePrint>
                <Textarea
                  aria-label="Pega aqui el JSON de Instagram"
                  value={rawJson}
                  onChange={(event) => setRawJson(event.target.value)}
                  $invalid={Boolean(rawJson.trim()) && !validation.isValid}
                  placeholder='{"channel":"instagram","doNotInvent":true}'
                />
                {!validation.isValid && rawJson.trim() ? (
                  <FinePrint style={{ color: '#ff8d8d' }}>{validation.error}</FinePrint>
                ) : null}
                <ActionRow>
                  <Button type="button" variant="secondary" onClick={handleValidate}>
                    <CheckCircle size={16} /> Validar JSON
                  </Button>
                  <Button type="button" onClick={handleSave} disabled={isSaving || !validation.isValid}>
                    <Save size={16} /> {isSaving ? 'Guardando...' : 'Guardar lectura'}
                  </Button>
                </ActionRow>

                {previewPayload ? (
                  <PreviewRow>
                    <PreviewItem><span>Followers</span><strong>{renderValue(getInstagramFollowersValue(previewPayload))}</strong></PreviewItem>
                    <PreviewItem><span>Posts</span><strong>{renderValue(getInstagramPostsValue(previewPayload))}</strong></PreviewItem>
                    <PreviewItem><span>Confidence</span><strong>{renderValue(previewPayload.sourceConfidence)}</strong></PreviewItem>
                    <PreviewItem><span>Observation</span><strong>{renderValue(previewPayload.observationDate)}</strong></PreviewItem>
                  </PreviewRow>
                ) : null}
              </Panel>
            ) : null}

            {activeTab === 'REFINAR' ? (
              <Panel>
                {prospect.data_instagram ? (
                  <>
                    <FinePrint>
                      Reinyectá la lectura actual para pedir una versión más precisa sin inventar ni perder el contrato JSON.
                    </FinePrint>
                    <Textarea value={refinementPrompt} readOnly aria-label="Prompt de refinamiento de Instagram" />
                    <ActionRow>
                      <Button type="button" onClick={() => handleCopyPrompt(refinementPrompt, 'Prompt de refinamiento copiado')}>
                        <Copy size={16} /> Copiar prompt de refinamiento
                      </Button>
                    </ActionRow>
                  </>
                ) : (
                  <FinePrint>Primero guarda una lectura base.</FinePrint>
                )}
              </Panel>
            ) : null}
          </Body>

          <Footer>
            <FinePrint>
              La lectura queda disponible solo dentro del dashboard privado del prospecto.
            </FinePrint>
            <ActionRow>
              <Button type="button" variant="ghost" onClick={onClose}>Cerrar</Button>
            </ActionRow>
          </Footer>
        </Container>
      </Shell>
    </>
  );
}
