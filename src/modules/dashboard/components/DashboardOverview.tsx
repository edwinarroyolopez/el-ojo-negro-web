'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Grid = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 960px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 4vw, 3rem);
`;

const Lead = styled.p`
  margin: 0.8rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 64ch;
`;

const Stat = styled.p`
  margin: 0;
  font-size: 2.4rem;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  color: ${({ theme }) => theme.colors.accent};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.2rem;
`;

export function DashboardOverview() {
  return (
    <Grid>
      <Card>
        <Title>Centro de Percepcion</Title>
        <Lead>
          Aqui viven el radar comercial, la construccion privada de diagnosticos y la publicacion por slug.
        </Lead>
        <Actions>
          <Link href="/dashboard/prospects">
            <Button>Ir al radar</Button>
          </Link>
          <Link href="/dashboard/prospects/import">
            <Button variant="secondary">Importar leads</Button>
          </Link>
        </Actions>
      </Card>

      <Card>
        <p style={{ margin: 0, color: '#b5aea1' }}>Sistema de diagnosticos</p>
        <Stat>Activo</Stat>
        <p style={{ margin: '0.4rem 0 0', color: '#8f887d' }}>Backend real, auth por telefono y superficies listas para radar, detalle y pagina publica.</p>
      </Card>
    </Grid>
  );
}
