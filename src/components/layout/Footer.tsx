'use client';

import styled from 'styled-components';

const Wrapper = styled.footer`
  border-top: ${({ theme }) => theme.borders.subtle};
  margin-top: ${({ theme }) => theme.spacing[16]};
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};
`;

const Motto = styled.p`
  margin: 0;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

export function Footer() {
  return (
    <Wrapper>
      <Inner>
        <p>EL OJO NEGRO - Arquitecto de Percepcion</p>
        <Motto>Limitless</Motto>
      </Inner>
    </Wrapper>
  );
}
