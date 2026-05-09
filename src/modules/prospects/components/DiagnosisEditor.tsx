'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/Button';
import type { DiagnosisStatus, DiagnosisVisibility } from '../types';

const Shell = styled.section`
  display: grid;
  gap: 1rem;
`;

const Head = styled.div`
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

const Title = styled.h3`
  margin: 0.45rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: 1.8rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
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
  padding: 0.7rem 0.9rem;
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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.95rem;
  resize: vertical;
`;

export type DiagnosisFormState = {
  title: string;
  slug: string;
  visibility: DiagnosisVisibility;
  status: DiagnosisStatus;
  summary: string;
  publicNotes: string;
  markdown: string;
  scoresJson: string;
  structuredJson: string;
};

type Props = {
  value: DiagnosisFormState;
  isSaving: boolean;
  isPublishing: boolean;
  onChange: (next: DiagnosisFormState) => void;
  onSave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
};

export function DiagnosisEditor({ value, isSaving, isPublishing, onChange, onSave, onPublish, onUnpublish }: Props) {
  return (
    <Shell>
      <Head>
        <div>
          <Kicker>Diagnóstico generado</Kicker>
          <Title>Pegar, revisar, publicar</Title>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Button variant="secondary" onClick={onSave} disabled={isSaving || isPublishing}>
            {isSaving ? 'Guardando...' : 'Guardar diagnóstico'}
          </Button>
          <Button onClick={onPublish} disabled={isSaving || isPublishing}>
            {isPublishing ? 'Publicando...' : 'Publicar diagnóstico'}
          </Button>
          <Button variant="ghost" onClick={onUnpublish} disabled={isSaving || isPublishing}>
            Despublicar
          </Button>
        </div>
      </Head>

      <Grid>
        <Field>
          <span>Titulo</span>
          <Input value={value.title} onChange={(event) => onChange({ ...value, title: event.target.value })} />
        </Field>
        <Field>
          <span>Slug</span>
          <Input value={value.slug} onChange={(event) => onChange({ ...value, slug: event.target.value })} />
        </Field>
        <Field>
          <span>Visibilidad</span>
          <Select value={value.visibility} onChange={(event) => onChange({ ...value, visibility: event.target.value as DiagnosisVisibility })}>
            <option value="PRIVATE">Privado</option>
            <option value="UNLISTED">Unlisted</option>
            <option value="PUBLIC">Publico</option>
          </Select>
        </Field>
        <Field>
          <span>Estado editorial</span>
          <Select value={value.status} onChange={(event) => onChange({ ...value, status: event.target.value as DiagnosisStatus })}>
            <option value="DRAFT">Draft</option>
            <option value="READY">Ready</option>
            <option value="PUBLISHED">Published</option>
          </Select>
        </Field>
      </Grid>

      <Field>
        <span>Resumen ejecutivo</span>
        <Textarea value={value.summary} onChange={(event) => onChange({ ...value, summary: event.target.value })} />
      </Field>

      <Field>
        <span>Markdown</span>
        <Textarea style={{ minHeight: 280 }} value={value.markdown} onChange={(event) => onChange({ ...value, markdown: event.target.value })} spellCheck={false} />
      </Field>

      <Grid>
        <Field>
          <span>Scores publicos JSON</span>
          <Textarea value={value.scoresJson} onChange={(event) => onChange({ ...value, scoresJson: event.target.value })} spellCheck={false} />
        </Field>
        <Field>
          <span>Estructura JSON opcional</span>
          <Textarea value={value.structuredJson} onChange={(event) => onChange({ ...value, structuredJson: event.target.value })} spellCheck={false} />
        </Field>
      </Grid>

      <Field>
        <span>Notas publicas</span>
        <Textarea value={value.publicNotes} onChange={(event) => onChange({ ...value, publicNotes: event.target.value })} />
      </Field>
    </Shell>
  );
}
