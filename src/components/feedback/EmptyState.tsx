'use client';

import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Card } from '@/components/ui/Card';

const Wrapper = styled(Card)`
  text-align: center;
  display: grid;
  gap: 0.75rem;
  justify-items: center;
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.size.xl};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 52ch;
`;

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
      {action}
    </Wrapper>
  );
}
