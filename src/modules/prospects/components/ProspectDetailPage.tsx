'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  ArrowUpRight,
  Globe,
  Instagram,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useProspect } from '../hooks/useProspect';
import { prospectsService } from '../services/prospects.service';
import type { Prospect, ProspectStatus } from '../types';
import {
  buildResearchPrompt,
  buildWhatsAppMessage,
  diagnosisToGeneratedJson,
  validateGeneratedDiagnosisJson,
} from '../utils';
import { buildSlidesGenerationPrompt } from '../utils/slides-prompt.utils';
import { CopyPromptPanel } from './CopyPromptPanel';
import { DiagnosisEditor } from './DiagnosisEditor';
import { DiagnosisPreview } from './DiagnosisPreview';
import { CommercialNorthModal } from './CommercialNorthModal';
import { OutreachScriptModal } from './OutreachScriptModal';
import { ProspectPriorityBadge, ProspectStatusBadge } from './ProspectStatusBadge';

const Page = styled.div`
  display: grid;
  gap: 1.15rem;
  max-width: 1540px;
  margin: 0 auto;
  width: 100%;
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

const TwoCol = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  }
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.85rem;
`;

const RowList = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.03);

  span {
    color: ${({ theme }) => theme.colors.textSoft};
  }

  strong {
    min-width: 0;
    text-align: right;
  }
`;

const ExternalValue = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  word-break: break-word;
  transition: color 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Select = styled.select`
  width: 100%;
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 0.9rem;
`;

const Notes = styled.textarea`
  width: 100%;
  min-height: 130px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.95rem;
`;

const ScoreGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-top: 1rem;
`;

const ScoreCard = styled.div`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.95rem;
  background: rgba(255, 255, 255, 0.03);

  span {
    display: block;
    color: ${({ theme }) => theme.colors.textSoft};
  }

  strong {
    display: block;
    margin-top: 0.35rem;
    font-size: 1.8rem;
    font-family: ${({ theme }) => theme.typography.fontSerif};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const HelperCard = styled(Card)`
  display: grid;
  gap: 0.85rem;
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: grid;
  gap: 0.35rem;
`;

const HelperText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const STATUSES: ProspectStatus[] = [
  'IMPORTED',
  'QUALIFIED',
  'DIAGNOSIS_PENDING',
  'DIAGNOSIS_DRAFT',
  'DIAGNOSIS_READY',
  'DIAGNOSIS_PUBLISHED',
  'CONTACTED',
  'RESPONDED',
  'MEETING_SCHEDULED',
  'PROPOSAL_SENT',
  'WON',
  'NOT_NOW',
  'DISCARDED',
];

export function ProspectDetailPage({ id }: { id: string }) {
  const prospectQuery = useProspect(id);
  const prospect = prospectQuery.data;

  if (!prospect) {
    return <Card>{prospectQuery.isLoading ? 'Cargando prospecto...' : 'No fue posible cargar el prospecto.'}</Card>;
  }

  return <ProspectDetailContent key={`${prospect.id}:${prospect.updatedAt ?? ''}`} prospect={prospect} />;
}

function ProspectDetailContent({ prospect }: { prospect: Prospect }) {
  const id = prospect.id;
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ProspectStatus>(prospect.status);
  const [internalNotes, setInternalNotes] = useState(prospect.internalNotes ?? '');
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [isCommercialNorthOpen, setIsCommercialNorthOpen] = useState(false);
  const [diagnosisJson, setDiagnosisJson] = useState(() =>
    diagnosisToGeneratedJson(prospect.diagnosis),
  );
  const diagnosisValidation = validateGeneratedDiagnosisJson(diagnosisJson);

  const updateProspectMutation = useMutation({
    mutationFn: (payload: Parameters<typeof prospectsService.updateProspect>[1]) => prospectsService.updateProspect(id, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['prospects', 'detail', id] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'metrics'] }),
      ]);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: (nextStatus: ProspectStatus) => prospectsService.updateProspectStatus(id, nextStatus),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['prospects', 'detail', id] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'metrics'] }),
      ]);
      toast.success('Estado comercial actualizado');
    },
  });

  const saveDiagnosisMutation = useMutation({
    mutationFn: async () => {
      if (!diagnosisValidation.payload) {
        throw new Error('Diagnosis JSON is invalid');
      }

      return prospectsService.updateDiagnosis(id, {
        ...diagnosisValidation.payload,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['prospects', 'detail', id] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'list'] }),
      ]);
      toast.success('Diagnóstico guardado');
    },
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      if (!diagnosisValidation.payload) {
        throw new Error('Diagnosis JSON is invalid');
      }

      await prospectsService.updateDiagnosis(id, {
        ...diagnosisValidation.payload,
      });

      return prospectsService.publishDiagnosis(id, {
        slug: diagnosisValidation.payload.slug || undefined,
        visibility: diagnosisValidation.payload.visibility,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['prospects', 'detail', id] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'metrics'] }),
      ]);
      toast.success('Diagnóstico publicado');
    },
  });

  const unpublishMutation = useMutation({
    mutationFn: () => prospectsService.unpublishDiagnosis(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['prospects', 'detail', id] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'list'] }),
        queryClient.invalidateQueries({ queryKey: ['prospects', 'metrics'] }),
      ]);
      toast.success('Diagnóstico despublicado');
    },
  });

  const prompt = buildResearchPrompt(prospect);
  const whatsappMessage = prospect.outreach.whatsappMessage || buildWhatsAppMessage(prospect);
  const publicUrl = prospect.diagnosis.slug ? `/diagnosticos/${prospect.diagnosis.slug}` : null;
  const primaryPhone = prospect.phones[0] || prospect.normalizedPrimaryPhone || '';
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
  const whatsappUrl = primaryPhone
    ? `https://wa.me/${primaryPhone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
    : null;
  const hasDiagnosisGenerated = Boolean(
    prospect.diagnosis.markdown?.trim() ||
      prospect.diagnosis.summary?.trim() ||
      ['DRAFT', 'READY', 'PUBLISHED'].includes(prospect.diagnosis.status ?? ''),
  );

  async function copyWhatsApp() {
    await navigator.clipboard.writeText(whatsappMessage);
    toast.success('Mensaje de WhatsApp copiado');
  }

  async function copySlidesPrompt() {
    const slidesPrompt = buildSlidesGenerationPrompt(prospect, { publicUrl });
    await navigator.clipboard.writeText(slidesPrompt);
    toast.success('Prompt para slides copiado');
  }

  async function markContacted() {
    await updateProspectMutation.mutateAsync({
      internalNotes,
      outreach: {
        contactAttempts: (prospect.outreach.contactAttempts ?? 0) + 1,
        lastContactedAt: new Date().toISOString(),
        whatsappMessage,
      },
    });
    await updateStatusMutation.mutateAsync('CONTACTED');
  }

  async function saveNotes() {
    await updateProspectMutation.mutateAsync({ internalNotes });
    toast.success('Notas internas guardadas');
  }

  return (
    <Page>
      <Hero>
        <Kicker>Detalle · constructor privado</Kicker>
        <Title>{prospect.name}</Title>
        <Lead>
          {[prospect.category, prospect.city].filter(Boolean).join(' · ') || 'Prospecto privado'}
        </Lead>
        <Meta>
          <ProspectStatusBadge status={prospect.status} />
          <ProspectPriorityBadge priority={prospect.priority} />
        </Meta>
        <Actions>
          <Button variant="secondary" onClick={() => setIsCommercialNorthOpen(true)}>
            ¿Por qué llamo?
          </Button>
          <Button variant="secondary" onClick={() => setIsScriptModalOpen(true)}>
            <PhoneCall size={16} /> Ver guion de contacto
          </Button>
          <Button variant="secondary" onClick={copyWhatsApp}>Copiar mensaje de WhatsApp</Button>
          <Button
            variant="secondary"
            onClick={copySlidesPrompt}
            disabled={!hasDiagnosisGenerated}
            title={
              hasDiagnosisGenerated
                ? 'Copiar prompt para slides'
                : 'Genera primero el diagnóstico para habilitar el prompt de slides'
            }
          >
            Copiar prompt para slides
          </Button>
          <Button variant="secondary" onClick={saveNotes} disabled={updateProspectMutation.isPending}>Guardar notas</Button>
          <Button onClick={markContacted} disabled={updateStatusMutation.isPending || updateProspectMutation.isPending}>Marcar contactado</Button>
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary">
                <MessageCircle size={16} /> Escribir por WhatsApp
              </Button>
            </a>
          ) : null}
          {publicUrl ? (
            <Link href={publicUrl} target="_blank">
              <Button variant="ghost">Ver página pública</Button>
            </Link>
          ) : null}
        </Actions>
      </Hero>

      <TwoCol>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <Card>
            <Kicker>Prospecto</Kicker>
            <RowList>
              <Row>
                <span>Website</span>
                <strong>
                  {websiteUrl ? (
                    <ExternalValue href={websiteUrl} target="_blank" rel="noreferrer">
                      <Globe size={15} />
                      {prospect.website}
                      <ArrowUpRight size={14} />
                    </ExternalValue>
                  ) : (
                    'Sin website'
                  )}
                </strong>
              </Row>
              <Row>
                <span>Instagram</span>
                <strong>
                  {instagramUrl ? (
                    <ExternalValue href={instagramUrl} target="_blank" rel="noreferrer">
                      <Instagram size={15} />
                      {prospect.instagram}
                      <ArrowUpRight size={14} />
                    </ExternalValue>
                  ) : (
                    'Sin Instagram'
                  )}
                </strong>
              </Row>
              <Row>
                <span>WhatsApp</span>
                <strong>
                  {whatsappUrl ? (
                    <ExternalValue href={whatsappUrl} target="_blank" rel="noreferrer">
                      <MessageCircle size={15} />
                      {primaryPhone}
                      <ArrowUpRight size={14} />
                    </ExternalValue>
                  ) : (
                    primaryPhone || 'Sin telefono'
                  )}
                </strong>
              </Row>
              <Row><span>Slug</span><strong>{prospect.diagnosis.slug || 'Se sugerirá al guardar'}</strong></Row>
            </RowList>
          </Card>

          <Card>
            <Kicker>Estado comercial editable</Kicker>
            <div style={{ marginTop: '0.85rem' }}>
              <Select value={status} onChange={(event) => setStatus(event.target.value as ProspectStatus)}>
                {STATUSES.map((entry) => (
                  <option key={entry} value={entry}>{entry}</option>
                ))}
              </Select>
            </div>
            <div style={{ marginTop: '0.85rem' }}>
              <Button variant="secondary" onClick={() => updateStatusMutation.mutate(status)} disabled={updateStatusMutation.isPending}>
                Aplicar estado
              </Button>
            </div>
          </Card>

          <Card>
            <Kicker>Scores de Panalbee</Kicker>
            <ScoreGrid>
              <ScoreCard><span>Data quality</span><strong>{Math.round(prospect.scores.dataQualityScore ?? 0)}</strong></ScoreCard>
              <ScoreCard><span>Supply fit</span><strong>{Math.round(prospect.scores.supplyFitScore ?? 0)}</strong></ScoreCard>
              <ScoreCard><span>Commerce readiness</span><strong>{Math.round(prospect.scores.commerceReadinessScore ?? 0)}</strong></ScoreCard>
              <ScoreCard><span>Growth opportunity</span><strong>{Math.round(prospect.scores.growthOpportunityScore ?? 0)}</strong></ScoreCard>
              <ScoreCard><span>Confidence</span><strong>{Math.round(prospect.scores.confidenceScore ?? 0)}</strong></ScoreCard>
            </ScoreGrid>
          </Card>

          <Card>
            <Kicker>Fuentes y notas</Kicker>
            <Lead>{prospect.description || 'Sin descripción extendida todavía.'}</Lead>
            <RowList>
              {prospect.sourceUrls.map((source) => (
                <Row key={source}>
                  <span>Fuente</span>
                  <strong>
                    <ExternalValue href={source} target="_blank" rel="noreferrer">
                      <ArrowUpRight size={14} />
                      {source}
                    </ExternalValue>
                  </strong>
                </Row>
              ))}
            </RowList>
            <div style={{ marginTop: '1rem' }}>
              <Notes value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} placeholder="Notas internas, observaciones comerciales, contexto de cuenta..." />
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <CopyPromptPanel value={prompt} />
          <HelperCard>
            <Kicker>Entregable para el prospecto</Kicker>
            <Lead style={{ marginTop: 0 }}>
              El prospecto recibe dos piezas:
            </Lead>
            <BulletList>
              <li>1. El diagnóstico publicado en esta página</li>
              <li>2. Un deck de 4 slides generado a partir del diagnóstico</li>
            </BulletList>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                onClick={copySlidesPrompt}
                disabled={!hasDiagnosisGenerated}
              >
                Copiar prompt para slides
              </Button>
            </div>
            {!hasDiagnosisGenerated ? (
              <HelperText>
                Genera primero el diagnóstico para habilitar el prompt de slides.
              </HelperText>
            ) : null}
          </HelperCard>
          <Card>
            <DiagnosisEditor
              value={diagnosisJson}
              isSaving={saveDiagnosisMutation.isPending}
              isPublishing={publishMutation.isPending}
              validation={diagnosisValidation}
              onChange={setDiagnosisJson}
              onSave={() => saveDiagnosisMutation.mutate()}
              onPublish={() => publishMutation.mutate()}
              onUnpublish={() => unpublishMutation.mutate()}
            />
          </Card>
        </div>
      </TwoCol>

      <Card>
        <Kicker>Preview interno del diagnostico</Kicker>
        <div style={{ marginTop: '1rem' }}>
          <DiagnosisPreview
            prospect={prospect}
            diagnosis={
              diagnosisValidation.payload
                ? {
                    ...prospect.diagnosis,
                    ...diagnosisValidation.payload,
                  }
                : prospect.diagnosis
            }
          />
        </div>
      </Card>

      <OutreachScriptModal
        prospect={prospect}
        open={isScriptModalOpen}
        onClose={() => setIsScriptModalOpen(false)}
        publicUrl={publicUrl || undefined}
        onMarkContacted={markContacted}
        onOpenCommercialNorth={() => setIsCommercialNorthOpen(true)}
      />

      <CommercialNorthModal
        prospect={prospect}
        open={isCommercialNorthOpen}
        onClose={() => setIsCommercialNorthOpen(false)}
      />
    </Page>
  );
}
