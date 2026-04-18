'use client';

import styled from 'styled-components';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 4rem 1.25rem;
  display: grid;
  gap: 1rem;
`;

const H1 = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 5vw, 3.3rem);
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Stack = styled.div`
  display: grid;
  gap: 0.8rem;
`;

export default function SystemDesignPage() {
  return (
    <Wrap>
      <Card>
        <p style={{ margin: 0, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cdb47c', fontSize: '0.76rem' }}>
          Sistema inicial
        </p>
        <H1>Vitrina de primitives y tono visual</H1>
        <p style={{ margin: 0, color: '#b5aea1' }}>
          Este espacio funciona como base de crecimiento para componentes, estados y patrones de interfaz.
        </p>
      </Card>

      <Grid>
        <Card>
          <h3>Buttons</h3>
          <Stack>
            <Button>Primario</Button>
            <Button variant="secondary">Secundario</Button>
            <Button variant="ghost">Ghost</Button>
          </Stack>
        </Card>

        <Card>
          <h3>Inputs</h3>
          <Stack>
            <Input label="Nombre" placeholder="EL OJO NEGRO" />
            <Input label="Email" type="email" placeholder="vision@elojonegro.com" />
          </Stack>
        </Card>

        <Card>
          <h3>Superficie</h3>
          <p style={{ margin: 0, color: '#b5aea1' }}>
            Bordes finos, sombras profundas, contraste sobrio y ritmo editorial.
          </p>
        </Card>
      </Grid>
    </Wrap>
  );
}
