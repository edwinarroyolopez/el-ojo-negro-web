import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';
import type { Prospect } from '../types';
import { DiagnosisSeoModal } from './DiagnosisSeoModal';

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

const prospect: Prospect = {
  id: 'prospect-1',
  accountId: 'account-1',
  name: 'Clinica LIV',
  category: 'Clinica estetica',
  city: 'Bogota',
  phones: [],
  sourceUrls: [],
  scores: {},
  priority: 'HIGH',
  status: 'DIAGNOSIS_READY',
  diagnosis: {
    summary: 'Diagnostico sobrio y comercial.',
    structured: {},
  },
  outreach: {},
};

describe('DiagnosisSeoModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    uploadImage.mockResolvedValue({
      publicId: 'seo-image-1',
      url: 'https://example.com/seo-image.jpg',
      thumbnailUrl: 'https://example.com/seo-image-thumb.jpg',
      resourceType: 'image',
      originalFilename: 'seo-image.jpg',
    });
  });

  it('shows an error when JSON is invalid', async () => {
    const user = userEvent.setup();

    renderWithTheme(
      <DiagnosisSeoModal
        open
        prospect={prospect}
        diagnosis={prospect.diagnosis}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    await user.type(document.querySelector('textarea[aria-label="Pega aqui el JSON SEO"]') as HTMLTextAreaElement, 'texto libre');

    expect(document.body.textContent).toContain('Debes pegar un JSON valido en formato objeto.');
    const saveButtons = Array.from(document.querySelectorAll('button')) as HTMLButtonElement[];
    const saveButton = saveButtons.find((button) => button.textContent?.includes('Guardar SEO')) as HTMLButtonElement;
    expect(saveButton).toBeDisabled();
  });

  it('enables save when JSON is valid and an image is uploaded', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    const view = renderWithTheme(
      <DiagnosisSeoModal
        open
        prospect={prospect}
        diagnosis={prospect.diagnosis}
        onClose={vi.fn()}
        onSave={onSave}
      />,
    );

    const jsonInput = view.container.querySelector('textarea[aria-label="Pega aqui el JSON SEO"]') as HTMLTextAreaElement;

    await user.clear(jsonInput);
    await user.type(
      jsonInput,
      '{"title":"Diagnostico Express de Clinica LIV con una lectura premium de confianza digital","description":"Una lectura ejecutiva y sobria sobre la presencia digital de Clinica LIV, sus señales de confianza y la claridad comercial de su ruta hacia WhatsApp."}',
    );

    const fileInput = view.container.querySelector('input[aria-label="Subir imagen SEO"]') as HTMLInputElement;
    Object.defineProperty(fileInput, 'files', {
      value: [new File(['image'], 'seo.jpg', { type: 'image/jpeg' })],
      configurable: true,
    });
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));

    await vi.waitFor(() => {
      expect(uploadImage).toHaveBeenCalledTimes(1);
    });

    const saveButtons = Array.from(view.container.querySelectorAll('button')) as HTMLButtonElement[];
    const saveButton = saveButtons.find((button) => button.textContent?.includes('Guardar SEO')) as HTMLButtonElement;
    await vi.waitFor(() => expect(saveButton).toBeEnabled());

    await user.click(saveButton);

    await vi.waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave.mock.calls[0][0]).toMatchObject({
      status: 'READY',
      title: 'Diagnostico Express de Clinica LIV con una lectura premium de confianza digital',
      imageUrl: 'https://example.com/seo-image.jpg',
      imagePublicId: 'seo-image-1',
    });
  });
});
