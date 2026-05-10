'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArrowDown, ArrowUp, ImagePlus, LoaderCircle, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { DiagnosisSlideAsset, DiagnosisSlideDeck, ProspectDiagnosis } from '../types';
import { uploadsService } from '@/modules/uploads/services/uploads.service';
import {
  getDiagnosisSlideDeck,
  isValidImageFile,
  normalizeDiagnosisSlideDeck,
} from '../utils/diagnosis-slide-deck.utils';

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
  width: min(1280px, calc(100vw - 2rem));
  height: min(92vh, 1080px);
  max-height: min(92vh, 1080px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 180ms ease, transform 180ms ease;
  z-index: ${({ theme }) => theme.zIndex.modal + 3};

  @media (max-width: 900px) {
    inset: auto 1rem 1rem 1rem;
    transform: ${({ $open }) => ($open ? 'translate(0, 0)' : 'translate(0, 10px)')};
    width: auto;
    height: 90vh;
    max-height: 90vh;
  }
`;

const Container = styled(Card)`
  height: 100%;
  padding: 1.1rem;
  background:
    radial-gradient(circle at 82% 0%, rgba(205,180,124,0.12), transparent 28%),
    linear-gradient(180deg, rgba(17,17,17,0.98), rgba(9,9,9,0.98));
  box-shadow: ${({ theme }) => theme.shadows.glow};
  overflow: hidden;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 0;
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
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 0.94;
`;

const Lead = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 72ch;
  line-height: 1.7;
`;

const StatusBand = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
`;

const Metric = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.45rem 0.8rem;
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255,255,255,0.03);
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Layout = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 1.1rem;
  min-height: 0;
  overflow: hidden;

  @media (min-width: 960px) {
    grid-template-columns: minmax(320px, 0.76fr) minmax(0, 1fr);
    align-items: start;
  }

  @media (max-width: 959px) {
    overflow: auto;
    padding-right: 0.15rem;
  }
`;

const SlotList = styled.div`
  display: grid;
  gap: 0.75rem;
  min-height: 0;

  @media (min-width: 960px) {
    overflow: auto;
    padding-right: 0.25rem;
  }
`;

const SlotCard = styled.button<{ $active: boolean }>`
  appearance: none;
  width: 100%;
  text-align: left;
  border-radius: 22px;
  padding: 0.8rem;
  display: grid;
  gap: 0.75rem;
  border: 1px solid
    ${({ theme, $active }) => ($active ? 'rgba(205, 180, 124, 0.44)' : theme.colors.border)};
  background: ${({ $active }) => ($active ? 'rgba(205, 180, 124, 0.08)' : 'rgba(255,255,255,0.03)')};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const SlotTop = styled.div`
  display: grid;
  grid-template-columns: 112px minmax(0, 1fr);
  gap: 0.75rem;
`;

const SlotVisual = styled.div`
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  overflow: hidden;
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255,255,255,0.03);
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UploadMask = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(0,0,0,0.68);
  color: ${({ theme }) => theme.colors.text};
`;

const Placeholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSoft};
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const SlotMeta = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: ${({ theme }) => theme.typography.size.sm};
    line-height: 1.25;
  }

  span {
    display: block;
    margin-top: 0.35rem;
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.xs};
    line-height: 1.5;
  }
`;

const SlotActions = styled.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

const Editor = styled.div`
  display: grid;
  gap: 1rem;
  min-height: 0;

  @media (min-width: 960px) {
    overflow: auto;
    padding-right: 0.25rem;
  }
`;

const Stage = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 24px;
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255,255,255,0.03);

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StageOverlay = styled.div`
  position: absolute;
  inset: auto 0 0;
  padding: 1rem;
  background: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.88));
`;

const FormGrid = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const Field = styled.label`
  display: grid;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 0.85rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem;
  resize: vertical;
`;

const Select = styled.select`
  width: 100%;
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 0.85rem;
`;

const Toggle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  padding-top: 1rem;
  border-top: ${({ theme }) => theme.borders.subtle};
`;

function moveSlide(slides: DiagnosisSlideAsset[], index: number, direction: -1 | 1) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= slides.length) return slides;

  const next = [...slides];
  const [item] = next.splice(index, 1);
  next.splice(targetIndex, 0, item);
  return next.map((slide, slideIndex) => ({ ...slide, order: slideIndex }));
}

export function DiagnosisDeckModal({
  open,
  prospectName,
  diagnosis,
  isSaving,
  onClose,
  onSave,
}: {
  open: boolean;
  prospectName: string;
  diagnosis?: ProspectDiagnosis;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (deck: DiagnosisSlideDeck) => Promise<unknown> | void;
}) {
  const baseDeck = useMemo(() => getDiagnosisSlideDeck(diagnosis, prospectName), [diagnosis, prospectName]);
  const [draft, setDraft] = useState<DiagnosisSlideDeck>(baseDeck);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const activeSlide = draft.slides[activeIndex] ?? draft.slides[0];
  const visibleCount = draft.slides.filter((slide) => slide.isVisible && slide.imageUrl.trim()).length;
  const isDirty = JSON.stringify(draft) !== JSON.stringify(baseDeck);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isDirty && !window.confirm('Hay cambios sin guardar. ¿Cerrar de todos modos?')) {
          return;
        }

        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, onClose, open]);

  function handleAttemptClose() {
    if (isDirty && !window.confirm('Hay cambios sin guardar. ¿Cerrar de todos modos?')) {
      return;
    }

    onClose();
  }

  function updateSlide(index: number, patch: Partial<DiagnosisSlideAsset>) {
    setDraft((current) =>
      normalizeDiagnosisSlideDeck(
        {
          ...current,
          slides: current.slides.map((slide, slideIndex) =>
            slideIndex === index ? { ...slide, ...patch } : slide,
          ),
        },
        prospectName,
      ),
    );
  }

  async function handleUpload(index: number, file?: File) {
    if (!file) return;
    if (!isValidImageFile(file)) {
      toast.error('Solo se permiten imagenes PNG, JPG o WebP');
      return;
    }

    const previousSlide = draft.slides[index];
    setUploadingIndex(index);

    try {
      const uploaded = await uploadsService.uploadImage(file);

      if (uploaded.resourceType !== 'image' || !uploaded.url) {
        throw new Error('La respuesta del upload no es valida para imagenes');
      }

      if (
        uploaded.publicId &&
        draft.slides.some(
          (slide, slideIndex) => slideIndex !== index && slide.publicId === uploaded.publicId,
        )
      ) {
        throw new Error('Esa imagen ya existe en el deck');
      }

      updateSlide(index, {
        imageUrl: uploaded.url,
        thumbnailUrl: uploaded.thumbnailUrl || uploaded.url,
        publicId: uploaded.publicId || '',
        originalFilename: uploaded.originalFilename || file.name,
        alt: previousSlide.alt || previousSlide.title || file.name,
      });
      toast.success('Imagen cargada');
    } catch (error) {
      updateSlide(index, previousSlide);
      toast.error(error instanceof Error ? error.message : 'No fue posible subir la imagen');
    } finally {
      setUploadingIndex(null);
      if (fileInputsRef.current[index]) {
        fileInputsRef.current[index]!.value = '';
      }
    }
  }

  async function handleSave() {
    const normalized = normalizeDiagnosisSlideDeck(draft, prospectName);
    const visibleSlides = normalized.slides.filter((slide) => slide.isVisible && slide.imageUrl.trim()).length;

    if (visibleSlides > 4) {
      toast.error('Maximo 4 slides visibles');
      return;
    }

    await onSave(normalized);
  }

  return (
    <>
      <Overlay $open={open} aria-hidden={!open} onClick={handleAttemptClose} />
      <Shell $open={open} role="dialog" aria-modal="true" aria-label="Editor del deck visual del diagnostico">
        <Container>
          <Header>
            <div>
              <Kicker>Deck publico del diagnostico</Kicker>
              <Title>Cabina de edicion visual</Title>
              <Lead>
                Carga, ordena y ajusta las 4 imagenes que se publican junto al diagnostico, sin tocar el flujo actual del editor JSON.
              </Lead>
              <StatusBand>
                <Metric>{`${visibleCount}/4 visibles`}</Metric>
                <Metric>{draft.status === 'READY' ? 'Deck listo: 4 slides visibles' : draft.status}</Metric>
              </StatusBand>
            </div>
            <Button variant="ghost" onClick={handleAttemptClose} aria-label="Cerrar editor del deck visual">
              <X size={16} /> Cerrar
            </Button>
          </Header>

          <Layout>
            <SlotList>
              {draft.slides.map((slide, index) => (
                <SlotCard
                  key={slide.id}
                  type="button"
                  $active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  <SlotTop>
                    <SlotVisual>
                      {slide.imageUrl ? (
                        <img src={slide.thumbnailUrl || slide.imageUrl} alt={slide.alt || slide.title} />
                      ) : (
                        <Placeholder>Este slide aun no tiene imagen</Placeholder>
                      )}
                      {uploadingIndex === index ? (
                        <UploadMask>
                          <LoaderCircle size={20} className="spin" />
                        </UploadMask>
                      ) : null}
                    </SlotVisual>
                    <SlotMeta>
                      <strong>{slide.title}</strong>
                      <span>{slide.caption || 'Sin caption todavia.'}</span>
                      <span>{slide.imageUrl ? (slide.isVisible ? 'Visible en pagina publica' : 'Oculto en pagina publica') : 'Este slide aun no tiene imagen'}</span>
                    </SlotMeta>
                  </SlotTop>

                  <SlotActions onClick={(event) => event.stopPropagation()}>
                    <input
                      ref={(element) => {
                        fileInputsRef.current[index] = element;
                      }}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      style={{ display: 'none' }}
                      onChange={(event) => handleUpload(index, event.target.files?.[0])}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => fileInputsRef.current[index]?.click()}
                      disabled={uploadingIndex === index}
                    >
                      <ImagePlus size={16} /> {slide.imageUrl ? 'Reemplazar imagen' : 'Cargar imagen'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setDraft((current) =>
                          normalizeDiagnosisSlideDeck(
                            { ...current, slides: moveSlide(current.slides, index, -1) },
                            prospectName,
                          ),
                        )
                      }
                      disabled={index === 0}
                      aria-label={`Subir slide ${index + 1}`}
                    >
                      <ArrowUp size={16} />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setDraft((current) =>
                          normalizeDiagnosisSlideDeck(
                            { ...current, slides: moveSlide(current.slides, index, 1) },
                            prospectName,
                          ),
                        )
                      }
                      disabled={index === draft.slides.length - 1}
                      aria-label={`Bajar slide ${index + 1}`}
                    >
                      <ArrowDown size={16} />
                    </Button>
                  </SlotActions>
                </SlotCard>
              ))}
            </SlotList>

            {activeSlide ? (
              <Editor>
                <Stage>
                  {activeSlide.imageUrl ? (
                    <img src={activeSlide.imageUrl} alt={activeSlide.alt || activeSlide.title} />
                  ) : (
                    <Placeholder>Este slide aun no tiene imagen</Placeholder>
                  )}
                  <StageOverlay>
                    <Kicker>{activeSlide.role}</Kicker>
                    <div style={{ fontFamily: 'var(--font-serif), serif', fontSize: '1.8rem' }}>{activeSlide.title}</div>
                  </StageOverlay>
                </Stage>

                <FormGrid>
                  <Field>
                    <span>Titulo</span>
                    <Input
                      value={activeSlide.title}
                      onChange={(event) => updateSlide(activeIndex, { title: event.target.value })}
                    />
                  </Field>

                  <Field>
                    <span>Caption</span>
                    <Textarea
                      value={activeSlide.caption || ''}
                      onChange={(event) => updateSlide(activeIndex, { caption: event.target.value })}
                    />
                  </Field>

                  <Field>
                    <span>Alt</span>
                    <Input
                      value={activeSlide.alt}
                      onChange={(event) => updateSlide(activeIndex, { alt: event.target.value })}
                    />
                  </Field>

                  <Field>
                    <span>Role</span>
                    <Select
                      value={activeSlide.role}
                      onChange={(event) => updateSlide(activeIndex, { role: event.target.value as DiagnosisSlideAsset['role'] })}
                    >
                      <option value="cover">cover</option>
                      <option value="strengths">strengths</option>
                      <option value="opportunities">opportunities</option>
                      <option value="nextStep">nextStep</option>
                    </Select>
                  </Field>

                  <Field>
                    <span>SectionKey</span>
                    <Select
                      value={activeSlide.sectionKey}
                      onChange={(event) => updateSlide(activeIndex, { sectionKey: event.target.value as DiagnosisSlideAsset['sectionKey'] })}
                    >
                      <option value="executiveReading">executiveReading</option>
                      <option value="strengths">strengths</option>
                      <option value="opportunities">opportunities</option>
                      <option value="nextStep">nextStep</option>
                    </Select>
                  </Field>

                  <Toggle>
                    <input
                      type="checkbox"
                      checked={activeSlide.isVisible}
                      onChange={(event) => updateSlide(activeIndex, { isVisible: event.target.checked })}
                    />
                    <span>Visible en pagina publica</span>
                  </Toggle>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => fileInputsRef.current[activeIndex]?.click()}
                      disabled={uploadingIndex === activeIndex}
                    >
                      <ImagePlus size={16} /> {activeSlide.imageUrl ? 'Reemplazar imagen' : 'Cargar imagen'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        updateSlide(activeIndex, {
                          imageUrl: '',
                          thumbnailUrl: '',
                          publicId: '',
                          originalFilename: '',
                        })
                      }
                    >
                      <Trash2 size={16} /> Eliminar imagen del deck
                    </Button>
                  </div>
                </FormGrid>
              </Editor>
            ) : null}
          </Layout>

          <Footer>
            <Lead style={{ margin: 0 }}>
              Puedes publicar el diagnostico aunque el deck no tenga 4 slides. El warning vive solo en frontend.
            </Lead>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Button variant="ghost" onClick={handleAttemptClose} disabled={isSaving}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSaving || uploadingIndex !== null}>
                {isSaving ? 'Guardando...' : 'Guardar deck'}
              </Button>
            </div>
          </Footer>
        </Container>
      </Shell>
    </>
  );
}
