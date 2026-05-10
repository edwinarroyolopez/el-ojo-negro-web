'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Copy, ImagePlus, LoaderCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { uploadsService } from '@/modules/uploads/services/uploads.service';
import type { Prospect, ProspectDiagnosis } from '../types';
import {
  buildSeoImagePrompt,
  buildSeoMetadataPrompt,
  calculateDiagnosisSeoStatus,
  getDiagnosisSeo,
  type DiagnosisSeoMetadata,
  validateSeoMetadataJson,
} from '../utils/diagnosis-seo.utils';
import { isValidImageFile } from '../utils/diagnosis-slide-deck.utils';

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
  width: min(920px, calc(100vw - 2rem));
  height: min(92vh, 980px);
  max-height: min(92vh, 980px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: ${({ theme }) => theme.zIndex.modal + 3};

  @media (max-width: 900px) {
    inset: 1rem;
    transform: ${({ $open }) => ($open ? 'translate(0, 0)' : 'translate(0, 10px)')};
    width: auto;
    height: calc(100dvh - 2rem);
    max-height: calc(100dvh - 2rem);
  }
`;

const Container = styled(Card)`
  height: 100%;
  padding: 1rem;
  background:
    radial-gradient(circle at 82% 0%, rgba(205,180,124,0.12), transparent 28%),
    linear-gradient(180deg, rgba(17,17,17,0.98), rgba(9,9,9,0.98));
  box-shadow: ${({ theme }) => theme.shadows.glow};
  overflow: hidden;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: start;
`;

const HeaderContent = styled.div`
  min-width: 0;
`;

const Kicker = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const Title = styled.h2`
  margin: 0.2rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(1.8rem, 3.4vw, 3rem);
  line-height: 0.92;
`;

const Lead = styled.p`
  margin: 0.55rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 72ch;
  line-height: 1.55;
`;

const Body = styled.div`
  min-height: 0;
  overflow-y: auto;
  padding: 1rem 0 1rem;
  display: grid;
  gap: 1rem;
`;

const Block = styled.section`
  display: grid;
  gap: 0.85rem;
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 1rem;
  background: rgba(255,255,255,0.03);
`;

const BlockTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.35rem;
`;

const BlockLead = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const Textarea = styled.textarea<{ $invalid?: boolean }>`
  width: 100%;
  min-height: 180px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme, $invalid }) => ($invalid ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.95rem;
  resize: vertical;
`;

const List = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const Message = styled.p<{ $tone: 'error' | 'warning' | 'muted' }>`
  margin: 0;
  color: ${({ theme, $tone }) =>
    $tone === 'error'
      ? theme.colors.danger
      : $tone === 'warning'
        ? theme.colors.warning
        : theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.sm};
  line-height: 1.55;
`;

const PreviewCard = styled.div`
  display: grid;
  gap: 0.7rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  padding: 1rem;
  background: rgba(255,255,255,0.025);
`;

const PreviewTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.45rem;
  line-height: 1.05;
`;

const PreviewDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.65;
`;

const UploadRow = styled.div`
  display: grid;
  gap: 0.85rem;

  @media (min-width: 760px) {
    grid-template-columns: minmax(0, 1fr) 220px;
    align-items: start;
  }
`;

const ImageFrame = styled.div`
  aspect-ratio: 1200 / 630;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: ${({ theme }) => theme.borders.subtle};
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSoft};
  padding: 1rem;
  line-height: 1.6;
`;

const UploadMask = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.68);
  color: ${({ theme }) => theme.colors.text};
`;

const Footer = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  padding-top: 1rem;
  margin-inline: -1rem;
  padding-inline: 1rem;
  border-top: ${({ theme }) => theme.borders.subtle};
  background:
    linear-gradient(180deg, rgba(9,9,9,0), rgba(9,9,9,0.88) 16%, rgba(9,9,9,0.98) 32%),
    rgba(9,9,9,0.98);
  box-shadow: 0 -18px 40px rgba(0, 0, 0, 0.28);
  z-index: 2;

  @media (max-width: 900px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const FooterActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export function DiagnosisSeoModal({
  open,
  prospect,
  diagnosis,
  isSaving,
  onClose,
  onSave,
}: {
  open: boolean;
  prospect: Prospect;
  diagnosis?: ProspectDiagnosis;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (seo: DiagnosisSeoMetadata) => Promise<unknown> | void;
}) {
  const baseSeo = useMemo(() => getDiagnosisSeo(diagnosis, prospect.name), [diagnosis, prospect.name]);
  const [rawJson, setRawJson] = useState(() =>
    baseSeo.title && baseSeo.description
      ? JSON.stringify({ title: baseSeo.title, description: baseSeo.description })
      : '',
  );
  const [image, setImage] = useState<Pick<DiagnosisSeoMetadata, 'imageUrl' | 'imagePublicId' | 'imageAlt'>>({
    imageUrl: baseSeo.imageUrl,
    imagePublicId: baseSeo.imagePublicId,
    imageAlt: baseSeo.imageAlt,
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const validation = useMemo(() => validateSeoMetadataJson(rawJson), [rawJson]);
  const promptForMetadata = useMemo(
    () => buildSeoMetadataPrompt(prospect, diagnosis),
    [diagnosis, prospect],
  );
  const promptForImage = useMemo(
    () => buildSeoImagePrompt(prospect, diagnosis, validation.payload),
    [diagnosis, prospect, validation.payload],
  );
  const canSave = validation.isValid && Boolean(image.imageUrl) && !isUploading && !isSaving;

  async function copyPrompt(value: string, successMessage: string) {
    await navigator.clipboard.writeText(value);
    toast.success(successMessage);
  }

  function handleAttemptClose() {
    onClose();
  }

  async function handleUpload(file?: File) {
    if (!file) return;
    if (!isValidImageFile(file)) {
      toast.error('Solo se permiten imagenes PNG, JPG o WebP');
      return;
    }

    setIsUploading(true);

    try {
      const uploaded = await uploadsService.uploadImage(file);

      if (uploaded.resourceType !== 'image' || !uploaded.url) {
        throw new Error('La respuesta del upload no es valida para imagenes');
      }

      setImage({
        imageUrl: uploaded.url,
        imagePublicId: uploaded.publicId || undefined,
        imageAlt:
          validation.payload?.title ||
          baseSeo.imageAlt ||
          `Preview SEO del diagnostico de ${prospect.name}`,
      });
      toast.success('Imagen SEO cargada');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'No fue posible subir la imagen');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }

  async function handleSave() {
    if (!validation.payload || !image.imageUrl) return;

    const nextSeo: DiagnosisSeoMetadata = {
      version: 1,
      status: calculateDiagnosisSeoStatus({
        title: validation.payload.title,
        description: validation.payload.description,
        imageUrl: image.imageUrl,
      }),
      title: validation.payload.title,
      description: validation.payload.description,
      imageUrl: image.imageUrl,
      imagePublicId: image.imagePublicId,
      imageAlt: image.imageAlt || validation.payload.title,
      updatedAt: new Date().toISOString(),
    };

    await onSave(nextSeo);
  }

  return (
    <>
      <Overlay $open={open} aria-hidden={!open} onClick={handleAttemptClose} />
      <Shell $open={open} role="dialog" aria-modal="true" aria-label="Editor SEO para WhatsApp">
        <Container>
          <Header>
            <HeaderContent>
              <Kicker>SEO para WhatsApp</Kicker>
              <Title>Cabina de compartibilidad</Title>
              <Lead>
                Define el titulo, la descripcion y la portada editorial que vera el prospecto cuando este link se comparta.
              </Lead>
            </HeaderContent>
            <Button variant="ghost" onClick={handleAttemptClose} aria-label="Cerrar editor SEO">
              <X size={16} /> Cerrar
            </Button>
          </Header>

          <Body>
            <Block>
              <div>
                <BlockTitle>Prompts</BlockTitle>
                <BlockLead>
                  Copia los prompts para generar el copy SEO y la imagen OG con el mismo nivel editorial del deck.
                </BlockLead>
              </div>
              <ActionRow>
                <Button variant="secondary" onClick={() => copyPrompt(promptForMetadata, 'Prompt SEO copiado')}>
                  <Copy size={16} /> Copiar prompt SEO
                </Button>
                <Button variant="secondary" onClick={() => copyPrompt(promptForImage, 'Prompt imagen copiado')}>
                  <Copy size={16} /> Copiar prompt imagen
                </Button>
              </ActionRow>
            </Block>

            <Block>
              <div>
                <BlockTitle>Titulo y descripcion</BlockTitle>
                <BlockLead>
                  Pega exactamente un JSON con `title` y `description`. El guardado solo se habilita cuando el formato es valido.
                </BlockLead>
              </div>

              <Field>
                <span>Pega aqui el JSON SEO</span>
                <Textarea
                  aria-label="Pega aqui el JSON SEO"
                  value={rawJson}
                  onChange={(event) => setRawJson(event.target.value)}
                  $invalid={rawJson.trim().length > 0 && !validation.isValid}
                />
              </Field>

              {validation.errors.length > 0 ? (
                <List>
                  {validation.errors.map((error) => (
                    <Message key={error} $tone="error">
                      {error}
                    </Message>
                  ))}
                </List>
              ) : null}

              {validation.warnings.length > 0 ? (
                <List>
                  {validation.warnings.map((warning) => (
                    <Message key={warning} $tone="warning">
                      {warning}
                    </Message>
                  ))}
                </List>
              ) : null}

              <PreviewCard>
                <PreviewTitle>
                  {validation.payload?.title || 'El titulo SEO aparecera aqui cuando el JSON sea valido'}
                </PreviewTitle>
                <PreviewDescription>
                  {validation.payload?.description || 'La descripcion SEO aparecera aqui para revisar tono, claridad y longitud.'}
                </PreviewDescription>
              </PreviewCard>
            </Block>

            <Block>
              <div>
                <BlockTitle>Imagen</BlockTitle>
                <BlockLead>
                  Carga una portada horizontal idealmente en 1200x630 px. Debe sentirse editorial, sobria y clara en preview de WhatsApp.
                </BlockLead>
              </div>

              <UploadRow>
                <ImageFrame>
                  {image.imageUrl ? (
                    <img src={image.imageUrl} alt={image.imageAlt || validation.payload?.title || 'Preview SEO'} />
                  ) : (
                    <ImagePlaceholder>
                      Sube una imagen 1200x630 para completar el preview publico del diagnostico.
                    </ImagePlaceholder>
                  )}
                  {isUploading ? (
                    <UploadMask>
                      <LoaderCircle size={20} className="spin" />
                    </UploadMask>
                  ) : null}
                </ImageFrame>

                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    aria-label="Subir imagen SEO"
                    style={{ display: 'none' }}
                    onChange={(event) => handleUpload(event.target.files?.[0])}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    <ImagePlus size={16} /> {image.imageUrl ? 'Reemplazar imagen' : 'Cargar imagen SEO'}
                  </Button>
                  <Message $tone="muted">
                    Formatos permitidos: PNG, JPG, WebP. Recomendacion visual: contraste alto, poco texto y centro protegido.
                  </Message>
                </div>
              </UploadRow>
            </Block>
          </Body>

          <Footer>
            <Message $tone="muted">
              {canSave ? 'SEO listo para guardarse en el diagnostico.' : 'Necesitas JSON valido e imagen cargada para guardar.'}
            </Message>
            <FooterActions>
              <Button variant="ghost" onClick={handleAttemptClose} disabled={isSaving || isUploading}>
                Cerrar
              </Button>
              <Button onClick={handleSave} disabled={!canSave}>
                {isSaving ? 'Guardando...' : 'Guardar SEO'}
              </Button>
            </FooterActions>
          </Footer>
        </Container>
      </Shell>
    </>
  );
}
