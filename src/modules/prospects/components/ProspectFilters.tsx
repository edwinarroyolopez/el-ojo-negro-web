'use client';

import styled from 'styled-components';
import { Input } from '@/components/ui/Input';
import type { ProspectListParams, ProspectPriority, ProspectStatus } from '../types';

const Toolbar = styled.section`
  display: grid;
  gap: 0.85rem;
  grid-template-columns: minmax(0, 1.4fr) repeat(5, minmax(150px, 1fr));

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

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

const Select = styled.select`
  width: 100%;
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 0.9rem;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

type Props = {
  values: ProspectListParams;
  categories: string[];
  cities: string[];
  onChange: (next: ProspectListParams) => void;
};

const STATUSES: Array<{ value: ProspectStatus | ''; label: string }> = [
  { value: '', label: 'Todos' },
  { value: 'IMPORTED', label: 'Importado' },
  { value: 'QUALIFIED', label: 'Calificado' },
  { value: 'DIAGNOSIS_PENDING', label: 'Diagnóstico pendiente' },
  { value: 'DIAGNOSIS_DRAFT', label: 'Diagnóstico borrador' },
  { value: 'DIAGNOSIS_READY', label: 'Diagnóstico listo' },
  { value: 'DIAGNOSIS_PUBLISHED', label: 'Diagnóstico publicado' },
  { value: 'CONTACTED', label: 'Contactado' },
  { value: 'RESPONDED', label: 'Respondió' },
  { value: 'MEETING_SCHEDULED', label: 'Reunión' },
  { value: 'WON', label: 'Ganado' },
];

const PRIORITIES: Array<{ value: ProspectPriority | ''; label: string }> = [
  { value: '', label: 'Todas' },
  { value: 'CRITICAL', label: 'Crítica' },
  { value: 'HIGH', label: 'Alta' },
  { value: 'MEDIUM', label: 'Media' },
  { value: 'LOW', label: 'Baja' },
];

export function ProspectFilters({ values, categories, cities, onChange }: Props) {
  return (
    <Toolbar>
      <Input
        label="Buscar"
        name="search"
        placeholder="Nombre, ciudad, categoria, web o Instagram..."
        value={values.search ?? ''}
        onChange={(event) => onChange({ ...values, search: event.target.value, page: 1 })}
      />

      <Field>
        <span>Estado</span>
        <Select value={values.status ?? ''} onChange={(event) => onChange({ ...values, status: event.target.value as ProspectStatus | '', page: 1 })}>
          {STATUSES.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <span>Prioridad</span>
        <Select value={values.priority ?? ''} onChange={(event) => onChange({ ...values, priority: event.target.value as ProspectPriority | '', page: 1 })}>
          {PRIORITIES.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <span>Categoria</span>
        <Select value={values.category ?? ''} onChange={(event) => onChange({ ...values, category: event.target.value, page: 1 })}>
          <option value="">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <span>Ciudad</span>
        <Select value={values.city ?? ''} onChange={(event) => onChange({ ...values, city: event.target.value, page: 1 })}>
          <option value="">Todas</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
      </Field>

      <Field>
        <span>Orden</span>
        <Select value={values.sort ?? 'growth'} onChange={(event) => onChange({ ...values, sort: event.target.value as ProspectListParams['sort'], page: 1 })}>
          <option value="growth">Mayor growth</option>
          <option value="confidence">Mayor confianza</option>
          <option value="priority">Mayor prioridad</option>
          <option value="recentlyEdited">Ultima edición</option>
          <option value="newest">Mas reciente</option>
          <option value="name">Nombre</option>
        </Select>
      </Field>
    </Toolbar>
  );
}
