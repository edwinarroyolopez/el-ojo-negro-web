import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import { DiagnosisDeckModal } from './DiagnosisDeckModal';

const toast = {
  success: vi.fn(),
  error: vi.fn(),
};

const uploadImage = vi.fn();

vi.mock('sonner', () => ({ toast }));
vi.mock('@/modules/uploads/services/uploads.service', () => ({
  uploadsService: {
    uploadImage,
  },
}));

function renderWithTheme(node: React.ReactNode) {
  return render(<ThemeProvider theme={theme}>{node}</ThemeProvider>);
}

const diagnosis = {
  structured: {
    slideDeck: {
      slides: [
        {
          id: 'slide-1',
          order: 0,
          role: 'cover',
          title: 'Portada',
          caption: 'Texto inicial',
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
          imageUrl: '',
          alt: 'Fortalezas',
          sectionKey: 'strengths',
          isVisible: true,
        },
        {
          id: 'slide-3',
          order: 2,
          role: 'opportunities',
          title: 'Oportunidades',
          imageUrl: '',
          alt: 'Oportunidades',
          sectionKey: 'opportunities',
          isVisible: true,
        },
        {
          id: 'slide-4',
          order: 3,
          role: 'nextStep',
          title: 'Siguiente paso',
          imageUrl: '',
          alt: 'Siguiente paso',
          sectionKey: 'nextStep',
          isVisible: true,
        },
      ],
    },
  },
};

describe('DiagnosisDeckModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    uploadImage.mockResolvedValue({
      publicId: 'uploaded-1',
      url: 'https://example.com/uploaded.jpg',
      thumbnailUrl: 'https://example.com/uploaded-thumb.jpg',
      resourceType: 'image',
      originalFilename: 'uploaded.jpg',
    });
  });

  it('rejects non-image file', async () => {
    renderWithTheme(
      <DiagnosisDeckModal
        open
        prospectName="Clinica LIV"
        diagnosis={diagnosis}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['text'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Solo se permiten imagenes PNG, JPG o WebP');
    });
    expect(uploadImage).not.toHaveBeenCalled();
  });

  it('allows editing title, caption and alt', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <DiagnosisDeckModal
        open
        prospectName="Clinica LIV"
        diagnosis={diagnosis}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    await user.clear(screen.getByLabelText('Titulo'));
    await user.type(screen.getByLabelText('Titulo'), 'Nueva portada');
    await user.clear(screen.getByLabelText('Caption'));
    await user.type(screen.getByLabelText('Caption'), 'Nuevo caption');
    await user.clear(screen.getByLabelText('Alt'));
    await user.type(screen.getByLabelText('Alt'), 'Alt portada');

    expect(screen.getByDisplayValue('Nueva portada')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Nuevo caption')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alt portada')).toBeInTheDocument();
  });

  it('allows changing visibility and calls onSave with normalized deck', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    renderWithTheme(
      <DiagnosisDeckModal
        open
        prospectName="Clinica LIV"
        diagnosis={diagnosis}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    await user.click(screen.getByLabelText(/Visible en pagina publica/i));
    await user.click(screen.getByRole('button', { name: 'Guardar deck' }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));

    const savedDeck = onSave.mock.calls[0][0];
    expect(savedDeck.version).toBe(1);
    expect(savedDeck.slides).toHaveLength(4);
    expect(savedDeck.slides[0].isVisible).toBe(false);
  });

  it('renders the save button and internal modal regions', () => {
    renderWithTheme(
      <DiagnosisDeckModal
        open
        prospectName="Clinica LIV"
        diagnosis={diagnosis}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Guardar deck' })).toBeInTheDocument();
    expect(screen.getByTestId('diagnosis-deck-modal-body')).toBeInTheDocument();
    expect(screen.getByTestId('diagnosis-deck-modal-footer')).toBeInTheDocument();
  });

  it('locks body scroll while open and restores it when closed', () => {
    const { rerender, unmount } = renderWithTheme(
      <DiagnosisDeckModal
        open
        prospectName="Clinica LIV"
        diagnosis={diagnosis}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.documentElement.style.overflow).toBe('hidden');

    rerender(
      <ThemeProvider theme={theme}>
        <DiagnosisDeckModal
          open={false}
          prospectName="Clinica LIV"
          diagnosis={diagnosis}
          onClose={vi.fn()}
          onSave={vi.fn()}
        />
      </ThemeProvider>,
    );

    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');

    unmount();

    expect(document.body.style.overflow).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
  });
});
