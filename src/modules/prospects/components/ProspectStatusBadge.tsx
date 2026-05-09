'use client';

import styled from 'styled-components';
import type { ProspectPriority, ProspectStatus } from '../types';
import { formatPriority, formatStatus } from '../utils';

const Pill = styled.span<{ $tone: 'gold' | 'green' | 'blue' | 'red' | 'neutral' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.38rem 0.72rem;
  font-size: ${({ theme }) => theme.typography.size.xs};
  border: 1px solid;

  ${({ theme, $tone }) => {
    if ($tone === 'gold') {
      return `color: ${theme.colors.accent}; border-color: rgba(205, 180, 124, 0.36); background: rgba(205, 180, 124, 0.08);`;
    }
    if ($tone === 'green') {
      return `color: ${theme.colors.success}; border-color: rgba(113, 178, 132, 0.28); background: rgba(113, 178, 132, 0.08);`;
    }
    if ($tone === 'blue') {
      return `color: ${theme.colors.info}; border-color: rgba(140, 156, 175, 0.28); background: rgba(140, 156, 175, 0.08);`;
    }
    if ($tone === 'red') {
      return `color: ${theme.colors.danger}; border-color: rgba(187, 111, 111, 0.28); background: rgba(187, 111, 111, 0.08);`;
    }
    return `color: ${theme.colors.textMuted}; border-color: ${theme.colors.border}; background: rgba(255, 255, 255, 0.03);`;
  }}
`;

function getStatusTone(status?: ProspectStatus) {
  if (status === 'DIAGNOSIS_PUBLISHED' || status === 'WON') return 'green';
  if (status === 'RESPONDED' || status === 'MEETING_SCHEDULED') return 'blue';
  if (status === 'DISCARDED') return 'red';
  if (status === 'DIAGNOSIS_READY' || status === 'QUALIFIED' || status === 'CONTACTED') return 'gold';
  return 'neutral';
}

function getPriorityTone(priority?: ProspectPriority) {
  if (priority === 'CRITICAL' || priority === 'HIGH') return 'gold';
  if (priority === 'LOW') return 'neutral';
  return 'blue';
}

export function ProspectStatusBadge({ status }: { status?: ProspectStatus }) {
  return <Pill $tone={getStatusTone(status)}>{formatStatus(status)}</Pill>;
}

export function ProspectPriorityBadge({ priority }: { priority?: ProspectPriority }) {
  return <Pill $tone={getPriorityTone(priority)}>{formatPriority(priority)}</Pill>;
}
