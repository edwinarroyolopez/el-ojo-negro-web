import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { Button } from '@/components/ui/Button';
import { theme } from '@/styles/theme';

describe('Button', () => {
  it('triggers onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <Button onClick={onClick}>Abrir</Button>
      </ThemeProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
