'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { PanelLeftClose, PanelLeftOpen, LayoutGrid, LogOut } from 'lucide-react';
import { useRequireAuth } from '@/modules/auth/hooks/useRequireAuth';
import { useAuthStore } from '@/stores/auth.store';
import { useUiStore } from '@/stores/ui.store';
import { Button } from '@/components/ui/Button';

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside<{ $open: boolean }>`
  border-right: ${({ theme }) => theme.borders.subtle};
  padding: 1.25rem;
  background: ${({ theme }) => theme.colors.backgroundElevated};

  @media (max-width: 980px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    border-right: none;
    border-bottom: ${({ theme }) => theme.borders.subtle};
  }
`;

const Content = styled.div`
  min-width: 0;
`;

const Topbar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.nav};
  border-bottom: ${({ theme }) => theme.borders.subtle};
  background: rgba(12, 12, 12, 0.82);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`;

const Main = styled.main`
  padding: 1.25rem;
`;

const Nav = styled.nav`
  display: grid;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const NavLink = styled(Link)`
  border: ${({ theme }) => theme.borders.subtle};
  padding: 0.6rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Brand = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  letter-spacing: 0.12em;
`;

const Screen = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isReady } = useRequireAuth();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);

  if (!isReady) {
    return <Screen>Verificando acceso...</Screen>;
  }

  return (
    <Shell>
      <Sidebar $open={isSidebarOpen}>
        <Brand>EL OJO NEGRO</Brand>
        <p style={{ margin: '0.35rem 0 0', color: '#8f887d', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Shell privado
        </p>
        <Nav>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </Nav>
      </Sidebar>

      <Content>
        <Topbar>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <Button variant="ghost" onClick={toggleSidebar} aria-label="Alternar panel lateral">
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
            </Button>
            <LayoutGrid size={16} />
            <span style={{ color: '#b5aea1' }}>Centro operativo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ color: '#8f887d', fontSize: '0.85rem' }}>{user?.name || 'Operador'}</span>
            <Button variant="secondary" onClick={logout}>
              <LogOut size={16} /> Salir
            </Button>
          </div>
        </Topbar>
        <Main>{children}</Main>
      </Content>
    </Shell>
  );
}
