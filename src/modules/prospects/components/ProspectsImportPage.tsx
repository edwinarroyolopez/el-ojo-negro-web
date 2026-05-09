'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { toast } from 'sonner';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { prospectsService } from '../services/prospects.service';
import { safeParseJson, summarizeImportPayload } from '../utils';

const Page = styled.div`
  display: grid;
  gap: 1.2rem;
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
  margin: 0.7rem 0 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2.3rem, 6vw, 4.8rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  margin: 1rem 0 0;
  max-width: 72ch;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.02rem;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.3rem;
`;

const Layout = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 1100px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 420px;
  border-radius: ${({ theme }) => theme.radius.xl};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  resize: vertical;
`;

const Stats = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled(Card)`
  display: grid;
  gap: 0.35rem;

  strong {
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  span {
    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.8rem;
`;

const Tag = styled.span`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.35rem 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

const SamplePayload = `[
  {
    "businessName": "Massai Clinica",
    "category": "Clinica estética",
    "city": "Medellin",
    "website": "https://massai.com.co",
    "instagramUrl": "https://instagram.com/massaiclinica",
    "phone": "+57 316 759 8999",
    "scores": {
      "growthOpportunityScore": 88,
      "confidenceScore": 84
    }
  }
]`;

export function ProspectsImportPage() {
  const [raw, setRaw] = useState('');
  const parsed = useMemo(() => summarizeImportPayload(raw), [raw]);

  const importMutation = useMutation({
    mutationFn: prospectsService.importProspects,
    onSuccess: (data) => {
      toast.success(`Radar actualizado: ${data.created} creados, ${data.updated} actualizados.`);
    },
    onError: () => {
      toast.error('No fue posible importar el JSON. Revisa formato y autenticacion.');
    },
  });

  async function handleImport() {
    const payload = safeParseJson(raw);
    if (!payload) {
      toast.error('El JSON no es valido todavía.');
      return;
    }

    await importMutation.mutateAsync(payload);
  }

  return (
    <Page>
      <Hero>
        <Kicker>Entrada · Panalbee Providers</Kicker>
        <Title>Importar prospectos sin romper el ritual.</Title>
        <Lead>
          Pega aquí la salida de Panalbee Providers. El Ojo Negro la convertirá en un radar accionable.
        </Lead>
        <Actions>
          <Button onClick={handleImport} disabled={importMutation.isPending}>
            {importMutation.isPending ? 'Importando radar...' : 'Importar radar'}
          </Button>
          <Button variant="secondary" onClick={() => setRaw(SamplePayload)}>
            Cargar ejemplo
          </Button>
          <Button variant="ghost" onClick={() => setRaw('')}>
            Limpiar
          </Button>
        </Actions>
      </Hero>

      <Layout>
        <Card>
          <Kicker>JSON crudo</Kicker>
          <Title style={{ fontSize: '2rem' }}>Pega 1 o 50 prospectos</Title>
          <Lead>La lectura es tolerante: array, objeto individual o lote con `items`, `prospects`, `results`, `leads` o `data`.</Lead>
          <Textarea value={raw} onChange={(event) => setRaw(event.target.value)} spellCheck={false} placeholder='Pega aqui el JSON de Panalbee Providers...' />
        </Card>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <Stats>
            <Metric>
              <strong>{parsed.count}</strong>
              <span>leads detectados</span>
            </Metric>
            <Metric>
              <strong>{parsed.dominantCategory}</strong>
              <span>categoria dominante</span>
            </Metric>
            <Metric>
              <strong>{parsed.dominantCity}</strong>
              <span>ciudad dominante</span>
            </Metric>
          </Stats>

          <Card>
            <Kicker>Lectura de importacion</Kicker>
            <Lead>
              {raw.trim()
                ? `Se detectaron ${parsed.count} registros. El backend conservara payload crudo, señales, normalizacion y resumen por item.`
                : 'Aún no hay JSON validado. Esta vista debe mostrar errores humanos, no humo.'}
            </Lead>
            <TagList>
              {parsed.signals.length > 0
                ? parsed.signals.map((signal) => <Tag key={signal}>{signal}</Tag>)
                : <Tag>Sin señales detectadas todavía</Tag>}
            </TagList>
          </Card>

          {importMutation.data ? (
            <Card>
              <Kicker>Resultado post-import</Kicker>
              <Stats>
                <Metric>
                  <strong>{importMutation.data.created}</strong>
                  <span>creados</span>
                </Metric>
                <Metric>
                  <strong>{importMutation.data.updated}</strong>
                  <span>actualizados</span>
                </Metric>
                <Metric>
                  <strong>{importMutation.data.duplicates}</strong>
                  <span>duplicados</span>
                </Metric>
              </Stats>
              <Lead style={{ marginTop: '1rem' }}>Fallidos: {importMutation.data.failed}</Lead>
              <div style={{ marginTop: '1rem' }}>
                <Link href="/dashboard/prospects">
                  <Button variant="secondary">Ir al radar</Button>
                </Link>
              </div>
            </Card>
          ) : null}
        </div>
      </Layout>
    </Page>
  );
}
