'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { authService } from '@/modules/auth/services/auth.service';
import { useAuthStore } from '@/stores/auth.store';

const Wrapper = styled(Card)`
  width: min(520px, 92vw);
  margin: 3rem auto;
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontSerif};
  font-size: clamp(2rem, 4vw, 2.7rem);
`;

const Lead = styled.p`
  margin: 0.6rem 0 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Form = styled.form`
  display: grid;
  gap: 0.9rem;
`;

const Note = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.typography.size.xs};
`;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const next = searchParams.get('next') || '/dashboard';

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    try {
      const phone = String(formData.get('phone') || '');
      const data = await authService.login({ phone });
      const session = await authService.me().catch(() => null);

      login(data);

      if (session) {
        login({ token: data.token, user: session.user, account: session.account });
      }

      toast.success('Sesion iniciada');
      router.replace(next);
    } catch {
      toast.error('No fue posible iniciar sesion');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper>
      <Title>Acceso privado</Title>
      <Lead>El shell protegido resguarda operaciones, direccion y decision.</Lead>

      <Form action={handleSubmit}>
        <Input label="Telefono" name="phone" type="tel" placeholder="3001234567 o +573001234567" required />
        <Note>El backend actual autentica por telefono. El token se envía después como `Bearer` en cada request privada.</Note>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>
      </Form>
    </Wrapper>
  );
}
