'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { Copy, Flag, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Prospect } from '../types';
import { COMMERCIAL_LADDER } from '../data/commercial-north';

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
  z-index: ${({ theme }) => theme.zIndex.modal + 2};
`;

const Shell = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 50% auto auto 50%;
  transform: ${({ $open }) =>
    $open ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -48%) scale(0.98)'};
  width: min(980px, calc(100vw - 2rem));
  max-height: min(88vh, 940px);
  overflow: auto;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: ${({ theme }) => theme.zIndex.modal + 3};

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
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 76ch;
`;

const Anchor = styled.div`
  margin-top: 1rem;
  border: ${({ theme }) => theme.borders.emphasized};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem 1.1rem;
  background: rgba(205, 180, 124, 0.07);
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.25rem;
  line-height: 1.5;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
`;

const Block = styled(Card)`
  padding: 1rem;
  display: grid;
  gap: 0.8rem;
`;

const BlockHead = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: start;
  flex-wrap: wrap;
`;

const BlockTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.45rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.35rem 0.75rem;
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid rgba(205, 180, 124, 0.35);
  background: rgba(205, 180, 124, 0.08);
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  display: grid;
  gap: 0.4rem;
`;

const PromiseBox = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.accent};
  padding-left: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Ladder = styled.div`
  margin-top: 1rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 1rem 1.1rem;
  background: rgba(255, 255, 255, 0.03);
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
`;

type Props = {
  open: boolean;
  onClose: () => void;
  prospect?: Prospect | null;
};

function buildCopyBundle(name?: string) {
  const subject = name ? `a ${name}` : 'a este tipo de prospecto';

  return [
    'Norte comercial',
    `Por qué contacto ${subject} y hacia dónde debe moverse la conversación.`,
    '',
    'Hoy no vendo una web. Hoy abro una conversación con valor. Si el diagnóstico revela oportunidad y el prospecto tiene interés, el siguiente paso es construir una ruta de captación.',
    '',
    'Objetivo de la llamada',
    'No llamo para vender una página web. Llamo para conseguir permiso para entregar un diagnóstico express gratuito. La meta de esta primera conversación es que el prospecto acepte recibir una lectura útil sobre cómo puede convertir mejor su presencia digital en conversaciones comerciales.',
    '',
    'Primera entrega: claridad antes de vender',
    '- Observación externa basada en fuentes públicas.',
    '- Señales positivas del negocio.',
    '- 3 oportunidades visibles de mejora.',
    '- Score de claridad, confianza, conversión y experiencia mobile.',
    '- Una mejora rápida aplicable.',
    '- Mapa recomendado del sistema digital.',
    'Promesa: Te dejo una lectura clara de dónde puede mejorar tu presencia digital, incluso si no hacemos nada después.',
    '',
    'Sistema mínimo de captación',
    'No se vende como sitio web. Se vende como una ruta comercial clara.',
    '- Landing premium orientada a conversión.',
    '- Copy comercial claro.',
    '- Servicios principales organizados por intención.',
    '- Prueba social y confianza.',
    '- Preguntas frecuentes.',
    '- Botones directos a WhatsApp.',
    '- Mensajes prearmados por servicio.',
    '- Medición básica de clics e intención.',
    '- Versión mobile impecable.',
    '- Optimización de confianza antes del contacto.',
    'Promesa: Convertimos tu presencia digital en una ruta clara para que una persona interesada entienda, confíe y escriba con menos fricción.',
    '',
    'Growth Partner mensual',
    'Esto viene después, cuando ya existe una base mínima que se puede medir y mejorar.',
    '- Optimización mensual del sistema.',
    '- Nuevas landings por servicio o campaña.',
    '- Revisión de métricas.',
    '- Mejora de mensajes comerciales.',
    '- Experimentos de conversión.',
    '- Diagnóstico de contenido.',
    '- Análisis de leads.',
    '- Priorización de oportunidades.',
    'Promesa: No dejamos el sistema quieto. Lo medimos, lo afinamos y lo convertimos en un activo comercial que mejora cada mes.',
    '',
    COMMERCIAL_LADDER,
  ].join('\n');
}

export function CommercialNorthModal({ open, onClose, prospect }: Props) {
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

  const subject = prospect?.name
    ? `Por qué contacto a ${prospect.name} y hacia dónde debe moverse la conversación.`
    : 'Por qué contacto a este tipo de prospecto y hacia dónde debe moverse la conversación.';

  async function handleCopy() {
    await navigator.clipboard.writeText(buildCopyBundle(prospect?.name));
    toast.success('Norte comercial copiado');
  }

  return (
    <>
      <Overlay $open={open} aria-hidden={!open} onClick={onClose} />
      <Shell $open={open} role="dialog" aria-modal="true" aria-label="Norte comercial">
        <Container>
          <Header>
            <div>
              <Kicker>Ayuda táctica privada</Kicker>
              <Title>Norte comercial</Title>
              <Lead>{subject}</Lead>
            </div>

            <Button variant="ghost" onClick={onClose} aria-label="Cerrar modal de norte comercial">
              <X size={16} /> Cerrar
            </Button>
          </Header>

          <Anchor>
            Hoy no vendo una web. Hoy abro una conversación con valor. Si el diagnóstico revela oportunidad y el prospecto tiene interés, el siguiente paso es construir una ruta de captación.
          </Anchor>

          <Grid>
            <Block>
              <BlockHead>
                <BlockTitle>Objetivo de la llamada</BlockTitle>
              </BlockHead>
              <Text>
                No llamo para vender una página web. Llamo para conseguir permiso
                para entregar un diagnóstico express gratuito. La meta de esta
                primera conversación es que el prospecto acepte recibir una
                lectura útil sobre cómo puede convertir mejor su presencia
                digital en conversaciones comerciales.
              </Text>
            </Block>

            <Block>
              <BlockHead>
                <BlockTitle>Primera entrega: claridad antes de vender</BlockTitle>
              </BlockHead>
              <List>
                <li>Observación externa basada en fuentes públicas.</li>
                <li>Señales positivas del negocio.</li>
                <li>3 oportunidades visibles de mejora.</li>
                <li>Score de claridad, confianza, conversión y experiencia mobile.</li>
                <li>Una mejora rápida aplicable.</li>
                <li>Mapa recomendado del sistema digital.</li>
              </List>
              <PromiseBox>
                Te dejo una lectura clara de dónde puede mejorar tu presencia
                digital, incluso si no hacemos nada después.
              </PromiseBox>
            </Block>

            <Block>
              <BlockHead>
                <BlockTitle>Sistema mínimo de captación</BlockTitle>
                <Badge>Pago · siguiente paso natural</Badge>
              </BlockHead>
              <Text>
                No se vende como sitio web. Se vende como una ruta comercial clara.
              </Text>
              <List>
                <li>Landing premium orientada a conversión.</li>
                <li>Copy comercial claro.</li>
                <li>Servicios principales organizados por intención.</li>
                <li>Prueba social y confianza.</li>
                <li>Preguntas frecuentes.</li>
                <li>Botones directos a WhatsApp.</li>
                <li>Mensajes prearmados por servicio.</li>
                <li>Medición básica de clics e intención.</li>
                <li>Versión mobile impecable.</li>
                <li>Optimización de confianza antes del contacto.</li>
              </List>
              <PromiseBox>
                Convertimos tu presencia digital en una ruta clara para que una
                persona interesada entienda, confíe y escriba con menos fricción.
              </PromiseBox>
            </Block>

            <Block>
              <BlockHead>
                <BlockTitle>Growth Partner mensual</BlockTitle>
                <Badge>Continuidad · después de construir base</Badge>
              </BlockHead>
              <Text>
                Esto viene después, cuando ya existe una base mínima que se puede medir y mejorar.
              </Text>
              <List>
                <li>Optimización mensual del sistema.</li>
                <li>Nuevas landings por servicio o campaña.</li>
                <li>Revisión de métricas.</li>
                <li>Mejora de mensajes comerciales.</li>
                <li>Experimentos de conversión.</li>
                <li>Diagnóstico de contenido.</li>
                <li>Análisis de leads.</li>
                <li>Priorización de oportunidades.</li>
              </List>
              <PromiseBox>
                No dejamos el sistema quieto. Lo medimos, lo afinamos y lo convertimos en un activo comercial que mejora cada mes.
              </PromiseBox>
            </Block>
          </Grid>

          <Ladder>{COMMERCIAL_LADDER}</Ladder>

          <Actions>
            <Button variant="secondary" onClick={handleCopy}>
              <Copy size={16} /> Copiar norte comercial
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <Flag size={16} /> Cerrar
            </Button>
          </Actions>
        </Container>
      </Shell>
    </>
  );
}
