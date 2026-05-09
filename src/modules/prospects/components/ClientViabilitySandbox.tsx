'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const Shell = styled.section`
  display: grid;
  gap: 1rem;

  @media (min-width: 980px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
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
  font-size: 1.9rem;
`;

const Lead = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Grid = styled.div`
  display: grid;
  gap: 0.85rem;
  margin-top: 1rem;

  @media (min-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MetricGrid = styled.div`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Metric = styled.div`
  display: grid;
  gap: 0.35rem;

  strong {
    font-family: ${({ theme }) => theme.typography.fontSerif};
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  span {
    color: ${({ theme }) => theme.colors.textSoft};
    font-size: ${({ theme }) => theme.typography.size.sm};
  }
`;

const BarList = styled.div`
  display: grid;
  gap: 0.85rem;
  margin-top: 1rem;
`;

const BarRow = styled.div`
  display: grid;
  gap: 0.45rem;
  grid-template-columns: 180px 1fr auto;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Track = styled.div`
  height: 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: ${({ theme }) => theme.borders.subtle};
  background: rgba(255, 255, 255, 0.04);
  overflow: hidden;
`;

const Fill = styled.div<{ $width: number }>`
  width: ${({ $width }) => `${Math.min($width, 100)}%`};
  height: 100%;
  background: linear-gradient(90deg, #cdb47c, rgba(242, 237, 228, 0.92));
`;

type SandboxState = {
  visitors: number;
  whatsappClicks: number;
  conversations: number;
  appointments: number;
  ticket: number;
};

export function ClientViabilitySandbox() {
  const [state, setState] = useState<SandboxState>({
    visitors: 1200,
    whatsappClicks: 96,
    conversations: 32,
    appointments: 12,
    ticket: 350000,
  });

  const visitorToWhatsapp = state.visitors ? (state.whatsappClicks / state.visitors) * 100 : 0;
  const whatsappToAppointment = state.whatsappClicks ? (state.appointments / state.whatsappClicks) * 100 : 0;
  const currentRevenue = state.appointments * state.ticket;

  const scenarios = [10, 20, 30].map((improvement) => {
    const multiplier = 1 + improvement / 100;
    const projectedClicks = Math.round(state.whatsappClicks * multiplier);
    const projectedAppointments = Math.round(state.appointments * multiplier);
    return {
      label: `Escenario +${improvement}%`,
      appointments: projectedAppointments,
      revenue: projectedAppointments * state.ticket,
      width: projectedClicks / Math.max(state.visitors, 1) * 100,
    };
  });

  return (
    <Shell>
      <Card>
        <Kicker>Zona experimental de viabilidad</Kicker>
        <Title>Simulador de intención</Title>
        <Lead>
          Este simulador no promete resultados. Solo ayuda a visualizar escenarios de mejora con datos ingresados por el negocio.
        </Lead>

        <Grid>
          <Input label="Visitantes mensuales estimados" type="number" value={state.visitors} onChange={(event) => setState({ ...state, visitors: Number(event.target.value) || 0 })} />
          <Input label="Clics actuales a WhatsApp" type="number" value={state.whatsappClicks} onChange={(event) => setState({ ...state, whatsappClicks: Number(event.target.value) || 0 })} />
          <Input label="Conversaciones" type="number" value={state.conversations} onChange={(event) => setState({ ...state, conversations: Number(event.target.value) || 0 })} />
          <Input label="Citas" type="number" value={state.appointments} onChange={(event) => setState({ ...state, appointments: Number(event.target.value) || 0 })} />
          <Input label="Ticket promedio estimado" type="number" value={state.ticket} onChange={(event) => setState({ ...state, ticket: Number(event.target.value) || 0 })} />
        </Grid>
      </Card>

      <Card>
        <Kicker>Lectura de escenario</Kicker>
        <MetricGrid>
          <Metric>
            <strong>{visitorToWhatsapp.toFixed(1)}%</strong>
            <span>Visitante → WhatsApp</span>
          </Metric>
          <Metric>
            <strong>{whatsappToAppointment.toFixed(1)}%</strong>
            <span>WhatsApp → cita</span>
          </Metric>
          <Metric>
            <strong>${(currentRevenue / 1_000_000).toFixed(1)}M</strong>
            <span>Escenario bruto actual</span>
          </Metric>
        </MetricGrid>

        <BarList>
          {scenarios.map((scenario) => (
            <BarRow key={scenario.label}>
              <span>{scenario.label}</span>
              <Track>
                <Fill $width={scenario.width} />
              </Track>
              <span>${(scenario.revenue / 1_000_000).toFixed(1)}M</span>
            </BarRow>
          ))}
        </BarList>
      </Card>
    </Shell>
  );
}
