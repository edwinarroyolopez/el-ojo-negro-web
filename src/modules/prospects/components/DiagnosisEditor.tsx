'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/Button';
import type { GeneratedDiagnosisJson } from '../types';

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

const Lead = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 72ch;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 420px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.95rem;
  resize: vertical;
`;

const ValidationBox = styled.div<{ $invalid: boolean }>`
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0.9rem 1rem;
  border: 1px solid
    ${({ $invalid }) =>
      $invalid ? 'rgba(187,111,111,0.28)' : 'rgba(113,178,132,0.28)'};
  background: ${({ $invalid }) =>
    $invalid ? 'rgba(187,111,111,0.08)' : 'rgba(113,178,132,0.08)'};
  color: ${({ theme, $invalid }) =>
    $invalid ? theme.colors.danger : theme.colors.success};
`;

const Hint = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  font-size: ${({ theme }) => theme.typography.size.xs};
  color: ${({ theme }) => theme.colors.textSoft};
`;

type Props = {
  value: string;
  isSaving: boolean;
  isPublishing: boolean;
  validation: {
    isValid: boolean;
    errors: string[];
    payload: GeneratedDiagnosisJson | null;
  };
  onChange: (next: string) => void;
  onSave: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
};

export function DiagnosisEditor({
  value,
  isSaving,
  isPublishing,
  validation,
  onChange,
  onSave,
  onPublish,
  onUnpublish,
}: Props) {
  return (
    <Shell>
      <Head>
        <div>
          <Kicker>Diagnóstico generado</Kicker>
          <Title>Pegar JSON, revisar, publicar</Title>
        </div>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <Button
            variant="secondary"
            onClick={onSave}
            disabled={isSaving || isPublishing || !validation.isValid}
          >
            {isSaving ? 'Guardando...' : 'Guardar diagnóstico'}
          </Button>
          <Button
            onClick={onPublish}
            disabled={isSaving || isPublishing || !validation.isValid}
          >
            {isPublishing ? 'Publicando...' : 'Publicar diagnóstico'}
          </Button>
          <Button
            variant="ghost"
            onClick={onUnpublish}
            disabled={isSaving || isPublishing}
          >
            Despublicar
          </Button>
        </div>
      </Head>

      <Lead>
        La AI debe devolverte un JSON completo con el diagnóstico. Lo pegas aquí, validamos el formato y con eso queda listo para guardar o publicar sin llenar campos manuales.
      </Lead>

      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        spellCheck={false}
        placeholder="Pega aquí el JSON resultante del prompt..."
      />

      <ValidationBox $invalid={!validation.isValid}>
        {validation.isValid ? (
          <div>
            JSON válido. Título: <strong>{validation.payload?.title}</strong>
            {validation.payload?.slug ? ` · Slug: ${validation.payload.slug}` : ''}
          </div>
        ) : (
          <ul style={{ margin: 0, paddingLeft: '1rem' }}>
            {validation.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
      </ValidationBox>

      <Hint>{`Campos esperados: title, summary, markdown, slug?, visibility?, status?, publicNotes?, scores?, structured?`}</Hint>
    </Shell>
  );
}
