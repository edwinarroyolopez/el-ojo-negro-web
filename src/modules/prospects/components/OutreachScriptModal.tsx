'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { X, Copy, PhoneCall, CheckCircle2, Compass } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Prospect } from '../types';
import {
  buildOutreachScriptBundle,
  buildOutreachScriptSections,
} from '../utils/outreach-script.utils';

const Overlay = styled.button<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(8px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const Shell = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: ${({ $open }) =>
    $open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -48%) scale(0.98)'};
  width: min(1040px, calc(100vw - 2rem));
  max-height: min(88vh, 980px);
  overflow: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};

  @media (max-width: 760px) {
    inset: auto 1rem 1rem 1rem;
    transform: ${({ $open }) => ($open ? 'translate(0, 0)' : 'translate(0, 8px)')};
    width: auto;
    max-height: 86vh;
  }
`;

const Container = styled(Card)`
  padding: 1.2rem;
  background: linear-gradient(180deg, rgba(17,17,17,0.98), rgba(9,9,9,0.98));
  box-shadow: ${({ theme }) => theme.shadows.glow};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: start;
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h2`
  margin: 0.45rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 4vw, 3rem);
`;

const Lead = styled.p`
  margin: 0.8rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 76ch;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SectionGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.2rem;

  @media (min-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const SectionCard = styled(Card)`
  padding: 1rem;
  display: grid;
  gap: 0.85rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: start;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.4rem;
`;

const SectionText = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ${({ theme }) => theme.typography.fontSans};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

type Props = {
  prospect: Prospect | null;
  open: boolean;
  onClose: () => void;
  publicUrl?: string;
  onMarkContacted?: () => void | Promise<void>;
  onOpenCommercialNorth?: () => void;
};

export function OutreachScriptModal({
  prospect,
  open,
  onClose,
  publicUrl,
  onMarkContacted,
  onOpenCommercialNorth,
}: Props) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!prospect) return null;

  const sections = buildOutreachScriptSections(prospect, publicUrl);
  const fullScript = buildOutreachScriptBundle(prospect, publicUrl);

  async function handleCopy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copiado`);
  }

  return (
    <>
      <Overlay $open={open} aria-hidden={!open} onClick={onClose} />
      <Shell $open={open} role="dialog" aria-modal="true" aria-label="Guion de apertura comercial">
        <Container>
          <Header>
            <div>
              <Kicker>Outreach privado</Kicker>
              <Title>Guion de apertura comercial</Title>
              <Lead>
                Este guion no es contenido público. Su objetivo es conseguir permiso para enviar el diagnóstico express gratuito de El Ojo Negro con un lenguaje sobrio, estratégico y sereno.
              </Lead>
            </div>

            <Button variant="ghost" onClick={onClose} aria-label="Cerrar modal de guion comercial">
              <X size={16} /> Cerrar
            </Button>
          </Header>

          <Actions>
            <Button variant="secondary" onClick={() => handleCopy(fullScript, 'Guion completo')}>
              <Copy size={16} /> Copiar guion completo
            </Button>
            {onOpenCommercialNorth ? (
              <Button variant="ghost" onClick={onOpenCommercialNorth}>
                <Compass size={16} /> Ver norte comercial
              </Button>
            ) : null}
            {onMarkContacted ? (
              <Button onClick={onMarkContacted}>
                <CheckCircle2 size={16} /> Marcar como contactado
              </Button>
            ) : null}
          </Actions>

          <SectionGrid>
            {sections.map((section) => (
              <SectionCard key={section.key}>
                <SectionHeader>
                  <SectionTitle>{section.title}</SectionTitle>
                  <Button
                    variant="ghost"
                    onClick={() => handleCopy(section.text, section.title)}
                  >
                    <Copy size={15} /> Copiar
                  </Button>
                </SectionHeader>
                <SectionText>{section.text}</SectionText>
              </SectionCard>
            ))}
          </SectionGrid>

          <Actions>
            <Button variant="ghost" onClick={onClose}>
              <PhoneCall size={16} /> Cerrar
            </Button>
          </Actions>
        </Container>
      </Shell>
    </>
  );
}
