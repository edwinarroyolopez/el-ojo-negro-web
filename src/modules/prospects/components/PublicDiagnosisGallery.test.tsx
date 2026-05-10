import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { PublicDiagnosisGallery } from './PublicDiagnosisGallery';

function renderWithTheme(node: React.ReactNode) {
  return render(<ThemeProvider theme={theme}>{node}</ThemeProvider>);
}

describe('PublicDiagnosisGallery', () => {
  it('does not render if there are no slides', () => {
    const { container } = renderWithTheme(<PublicDiagnosisGallery slides={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders main image and thumbnails when visible slides exist', () => {
    renderWithTheme(
      <PublicDiagnosisGallery
        slides={[
          {
            id: 'slide-1',
            order: 0,
            role: 'cover',
            title: 'Portada',
            caption: 'Lectura ejecutiva',
            imageUrl: 'https://example.com/slide-1.jpg',
            thumbnailUrl: 'https://example.com/thumb-1.jpg',
            alt: 'Portada',
            sectionKey: 'executiveReading',
            isVisible: true,
          },
          {
            id: 'slide-2',
            order: 1,
            role: 'strengths',
            title: 'Fortalezas',
            caption: 'Lo que ya esta bien',
            imageUrl: 'https://example.com/slide-2.jpg',
            thumbnailUrl: 'https://example.com/thumb-2.jpg',
            alt: 'Fortalezas',
            sectionKey: 'strengths',
            isVisible: true,
          },
        ]}
      />,
    );

    expect(screen.getByRole('img', { name: 'Portada' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fortalezas/i })).toBeInTheDocument();
  });
});
