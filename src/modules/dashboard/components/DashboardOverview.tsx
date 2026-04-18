'use client';

import styled from 'styled-components';
import { Card } from '@/components/ui/Card';

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

export function DashboardOverview() {
  return (
    <Grid>
      <Card>
        <Title>Centro de Percepcion</Title>
        <Lead>
          Shell protegido listo para crecer por modulos. Aqui viven los flujos privados y las operaciones de alto
          criterio.
        </Lead>
      </Card>

      <Card>
        <p style={{ margin: 0, color: '#b5aea1' }}>Estado de base</p>
        <Stat>Ready</Stat>
        <p style={{ margin: '0.4rem 0 0', color: '#8f887d' }}>Arquitectura sembrada con separacion publica/protegida.</p>
      </Card>
    </Grid>
  );
}
