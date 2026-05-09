'use client';

import styled from 'styled-components';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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

const Textarea = styled.textarea`
  width: 100%;
  min-height: 320px;
  margin-top: 1rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  resize: vertical;
`;

export function CopyPromptPanel({ value }: { value: string }) {
  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    toast.success('Prompt copiado');
  }

  return (
    <Card>
      <Head>
        <div>
          <Kicker>Prompt</Kicker>
          <Title>Investigación asistida</Title>
        </div>
        <Button variant="secondary" onClick={handleCopy}>
          Copiar
        </Button>
      </Head>
      <Textarea value={value} readOnly spellCheck={false} />
    </Card>
  );
}
