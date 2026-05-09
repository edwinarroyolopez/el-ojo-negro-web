'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  X,
  Copy,
  PhoneCall,
  CheckCircle2,
  Compass,
  MessageCircle,
  MessagesSquare,
  HelpCircle,
  CornerDownRight,
} from 'lucide-react';
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

const Anchor = styled.div`
  margin-top: 1rem;
  border: ${({ theme }) => theme.borders.emphasized};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 0.9rem 1rem;
  background: rgba(205, 180, 124, 0.07);
  color: ${({ theme }) => theme.colors.text};
`;

const TabRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
  appearance: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  min-height: 40px;
  padding: 0.5rem 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  cursor: pointer;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? 'rgba(205, 180, 124, 0.35)' : theme.colors.border};
  background: ${({ $active }) =>
      $active ? 'rgba(205, 180, 124, 0.08)' : 'rgba(255,255,255,0.03)'};
  color: ${({ $active, theme }) =>
      $active ? theme.colors.accent : theme.colors.textMuted};
  transition: all 180ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const SectionGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.2rem;
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

const SECTION_ICONS = {
  call: PhoneCall,
  whatsappInitial: MessageCircle,
  ifTheyReply: MessagesSquare,
  interestQuestions: HelpCircle,
  followUp: CornerDownRight,
} as const;

export function OutreachScriptModal({
  prospect,
  open,
  onClose,
  publicUrl,
  onMarkContacted,
  onOpenCommercialNorth,
}: Props) {
  const sections = prospect
    ? buildOutreachScriptSections(prospect, publicUrl)
    : [];
  const fullScript = prospect
    ? buildOutreachScriptBundle(prospect, publicUrl)
    : '';
  const [activeKey, setActiveKey] = useState<
    'call' | 'whatsappInitial' | 'ifTheyReply' | 'interestQuestions' | 'followUp'
  >('call');

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

  const activeSection =
    sections.find((section) => section.key === activeKey) ?? sections[0];

  async function handleCopy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copiado`);
  }

  return (
    <>
      <Overlay $open={open} aria-hidden={!open} onClick={onClose} />
      <Shell $open={open} role="dialog" aria-modal="true" aria-label="Guion de contacto">
        <Container>
          <Header>
            <div>
              <Kicker>Outreach privado</Kicker>
              <Title>Guion de contacto</Title>
              <Lead>
                Este guion es privado. El objetivo inicial no es vender una web: es conseguir permiso para entregar un diagnóstico útil.
              </Lead>
            </div>

            <Button variant="ghost" onClick={onClose} aria-label="Cerrar modal de guion comercial">
              <X size={16} /> Cerrar
            </Button>
          </Header>

          <Actions>
            <Button
              variant="secondary"
              onClick={() => handleCopy(activeSection.text, activeSection.title)}
            >
              <Copy size={16} /> Copiar sección actual
            </Button>
            <Button variant="secondary" onClick={() => handleCopy(fullScript, 'Guion completo')}>
              <Copy size={16} /> Copiar todo
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

          <Anchor>
            El contacto puede iniciar por llamada o por WhatsApp. El objetivo no es vender una web: es conseguir permiso para entregar un diagnóstico útil.
          </Anchor>

          <TabRow>
            {sections.map((section) => {
              const Icon = SECTION_ICONS[section.key];
              return (
                <TabButton
                  key={section.key}
                  type="button"
                  $active={section.key === activeSection.key}
                  onClick={() => setActiveKey(section.key)}
                >
                  <Icon size={15} /> {section.title}
                </TabButton>
              );
            })}
          </TabRow>

          <SectionGrid>
            <SectionCard key={activeSection.key}>
              <SectionHeader>
                <SectionTitle>{activeSection.title}</SectionTitle>
                <Button
                  variant="ghost"
                  onClick={() => handleCopy(activeSection.text, activeSection.title)}
                >
                  <Copy size={15} /> Copiar
                </Button>
              </SectionHeader>
              <SectionText>{activeSection.text}</SectionText>
            </SectionCard>
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
