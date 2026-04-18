import type { Metadata } from 'next';
import { Cormorant_Garamond, IBM_Plex_Sans } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/styled-components-registry';
import Providers from '@/app/providers';
import './globals.css';

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'EL OJO NEGRO - Arquitecto de Percepcion',
  description: 'Firma de vision estrategica y elevacion perceptual.',
  icons: {
    icon: '/DARK.png',
    shortcut: '/DARK.png',
    apple: '/LIGHT.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
