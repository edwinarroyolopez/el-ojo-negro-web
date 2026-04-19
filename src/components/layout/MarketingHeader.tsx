'use client';

import Link from 'next/link';
import styled from 'styled-components';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.nav};
  border-bottom: ${({ theme }) => theme.borders.subtle};
  background: rgba(9, 9, 9, 0.82);
  backdrop-filter: blur(10px);
`;

const Shell = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0.9rem 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    align-items: start;
    padding: 0.75rem 1rem;
    gap: 0.6rem;
  }
`;

const Brand = styled(Link)`
  display: inline-flex;
  width: fit-content;
`;

const BrandLogo = styled.img`
  display: block;
  width: 116px;
  height: auto;

  @media (max-width: 760px) {
    width: 102px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.sm};

  @media (max-width: 760px) {
    justify-content: flex-start;
    width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    gap: 0.85rem;
    padding-bottom: 0.15rem;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  flex: 0 0 auto;

  @media (max-width: 760px) {
    font-size: 0.9rem;
  }
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.typography.size.xs};
  flex: 0 0 auto;

  @media (max-width: 900px) {
    display: none;
  }
`;

export function MarketingHeader() {
  return (
    <Header>
      <Shell>
        <Brand href="/" aria-label="EL OJO NEGRO - inicio">
          <BrandLogo src="/DARK.png" alt="EL OJO NEGRO" />
        </Brand>
        <Nav aria-label="Navegacion publica">
          <NavLink href="/#manifiesto">Manifiesto</NavLink>
          <NavLink href="/#metodo">Metodo</NavLink>
          <NavLink href="/login">Login</NavLink>
          <Accent>Limitless</Accent>
        </Nav>
      </Shell>
    </Header>
  );
}
