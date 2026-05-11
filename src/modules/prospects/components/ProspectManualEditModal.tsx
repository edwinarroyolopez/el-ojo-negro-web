'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Prospect } from '../types';
import {
  buildProspectManualFormValues,
  buildProspectManualUpdatePayload,
  type ProspectManualFormValues,
} from '../utils/prospect-manual-completion.utils';

const Overlay = styled.button<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  border: 0;
  padding: 0;
  margin: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
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
  max-height: min(90vh, 920px);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  border-radius: 28px;
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.panel};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: ${({ theme }) => theme.zIndex.modal + 3};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 1.25rem;
  border-bottom: ${({ theme }) => theme.borders.subtle};
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h3`
  margin: 0.5rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.7rem, 3vw, 2.4rem);
`;

const Lead = styled.p`
  margin: 0.6rem 0 0;
  color: ${({ theme }) => theme.colors.textSoft};
  max-width: 60ch;
`;

const Body = styled.div`
  overflow: auto;
  padding: 1.2rem 1.25rem 1.35rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 0.95rem;

  @media (min-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Full = styled.div`
  @media (min-width: 760px) {
    grid-column: 1 / -1;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 118px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem 0.95rem;
  resize: vertical;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

const Hint = styled.p`
  margin: 0.35rem 0 0;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const CloseButton = styled(Button)`
  min-width: 42px;
  padding-inline: 0.8rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem 1.2rem;
  border-top: ${({ theme }) => theme.borders.subtle};
`;

const FooterNote = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

type Props = {
  open: boolean;
  prospect: Prospect;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (payload: ReturnType<typeof buildProspectManualUpdatePayload>) => Promise<unknown> | unknown;
};

export function ProspectManualEditModal({
  open,
  prospect,
  isSaving = false,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<ProspectManualFormValues>(() => buildProspectManualFormValues(prospect));

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [open]);

  function updateField<K extends keyof ProspectManualFormValues>(key: K, value: ProspectManualFormValues[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSave() {
    await onSave(buildProspectManualUpdatePayload(form));
  }

  return (
    <>
      <Overlay $open={open} type="button" aria-label="Cerrar completacion manual" onClick={onClose} />
      <Shell $open={open} role="dialog" aria-modal="true" aria-label="Completar datos del prospecto">
        <Header>
          <div>
            <Kicker>Completacion manual</Kicker>
            <Title>Editar datos del prospecto</Title>
            <Lead>
              Completa o corrige telefono, canales, ubicacion, fuentes y contexto publico para mejorar el prompt de investigacion sin depender solo del import inicial.
            </Lead>
          </div>
          <CloseButton type="button" variant="ghost" onClick={onClose} aria-label="Cerrar modal de completacion manual">
            <X size={18} />
          </CloseButton>
        </Header>

        <Body>
          <Grid>
            <Input label="Nombre" value={form.name} onChange={(event) => updateField('name', event.target.value)} />
            <Input label="Categoria" value={form.category} onChange={(event) => updateField('category', event.target.value)} />
            <Input label="Ciudad" value={form.city} onChange={(event) => updateField('city', event.target.value)} />
            <Input label="Pais" value={form.country} onChange={(event) => updateField('country', event.target.value)} />
            <Input label="Website" value={form.website} onChange={(event) => updateField('website', event.target.value)} />
            <Input label="Instagram" value={form.instagram} onChange={(event) => updateField('instagram', event.target.value)} />
            <Input label="Facebook" value={form.facebook} onChange={(event) => updateField('facebook', event.target.value)} />
            <Input label="Direccion" value={form.address} onChange={(event) => updateField('address', event.target.value)} />

            <Full>
              <Field>
                <span>Telefonos / WhatsApp</span>
                <Textarea
                  value={form.phones}
                  onChange={(event) => updateField('phones', event.target.value)}
                  placeholder={'+57 300 123 4567\n+57 310 999 8877'}
                />
                <Hint>Un telefono por linea. Tambien puedes pegar separados por coma o punto y coma.</Hint>
              </Field>
            </Full>

            <Full>
              <Field>
                <span>Fuentes publicas</span>
                <Textarea
                  value={form.sourceUrls}
                  onChange={(event) => updateField('sourceUrls', event.target.value)}
                  placeholder={'https://sitio.com\nhttps://instagram.com/marca'}
                />
                <Hint>Estas URLs ayudan a completar mejor la investigacion asistida.</Hint>
              </Field>
            </Full>

            <Full>
              <Field>
                <span>Descripcion publica</span>
                <Textarea
                  value={form.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder="Que ofrece, para quien, con que enfoque y que señales publicas ya transmite."
                />
              </Field>
            </Full>

            <Full>
              <Field>
                <span>Notas de evidencia</span>
                <Textarea
                  value={form.evidenceNotes}
                  onChange={(event) => updateField('evidenceNotes', event.target.value)}
                  placeholder="Hallazgos manuales verificables: telefono encontrado, nueva fuente, servicio visible, ubicacion confirmada..."
                />
              </Field>
            </Full>

            <Full>
              <Field>
                <span>Notas internas</span>
                <Textarea
                  value={form.internalNotes}
                  onChange={(event) => updateField('internalNotes', event.target.value)}
                  placeholder="Contexto comercial privado o notas de seguimiento."
                />
              </Field>
            </Full>
          </Grid>
        </Body>

        <Footer>
          <FooterNote>Esto guarda una completacion manual del prospecto y actualiza los prompts futuros.</FooterNote>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>Cancelar</Button>
            <Button type="button" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar datos'}</Button>
          </div>
        </Footer>
      </Shell>
    </>
  );
}
