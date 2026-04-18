'use client';

import styled from 'styled-components';
import { Card } from '@/components/ui/Card';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  display: grid;
  gap: 1rem;
`;

const Hero = styled(Card)`
  display: grid;
  gap: 0.75rem;
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2.2rem, 5vw, 3.4rem);
`;

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export default function ArchitecturePage() {
  return (
    <Container>
      <Hero>
        <p style={{ margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cdb47c', fontSize: '0.76rem' }}>
          Arquitectura viva
        </p>
        <Title>Base modular para escalar con claridad</Title>
        <Muted>
          El proyecto separa primitives, componentes compuestos, modulos de dominio, infraestructura y estado local para
          crecer sin mezclar capas.
        </Muted>
      </Hero>

      <Grid>
        <Card>
          <h3>Capas y responsabilidades</h3>
          <Muted>
            `components/ui` para primitives sin dominio; `components` para composicion reusable; `modules` para negocio;
            `stores` para sesion/UI; `services` y `lib` para infraestructura.
          </Muted>
        </Card>

        <Card>
          <h3>Estado y datos</h3>
          <Muted>
            React Query controla fetch, cache e invalidacion de server state. Zustand solo guarda estado local persistible
            de shell y autenticacion.
          </Muted>
        </Card>

        <Card>
          <h3>Rutas publicas y protegidas</h3>
          <Muted>
            `(public)` concentra narrativa abierta (`/`, `/login`, `/architecture`, `/system-design`). `(protected)`
            concentra shell privado (`/dashboard`).
          </Muted>
        </Card>

        <Card>
          <h3>Como crecer sin deuda</h3>
          <Muted>
            Crear nuevos modulos por dominio, extraer primitives si se repiten en 3+ lugares y documentar decisiones
            estructurales en `ai/*`.
          </Muted>
        </Card>
      </Grid>
    </Container>
  );
}
