"use client";

import type { ReactNode } from 'react';
import styled from 'styled-components';
import { MarketingHeader } from '@/components/layout/MarketingHeader';
import { Footer } from '@/components/layout/Footer';

const Main = styled.main`
  min-height: calc(100vh - 66px);
`;

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
