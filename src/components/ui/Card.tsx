'use client';

import styled from 'styled-components';

export const Card = styled.article`
  border: ${({ theme }) => theme.borders.subtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.panel};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  backdrop-filter: blur(8px);
`;
