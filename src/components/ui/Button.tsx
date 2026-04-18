'use client';

import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const buttonVariants: Record<ButtonVariant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accentForeground};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      filter: brightness(1.02);
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.panel};
    color: ${({ theme }) => theme.colors.text};
    border: ${({ theme }) => theme.borders.subtle};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.borderStrong};
      background: ${({ theme }) => theme.colors.panelStrong};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.border};
      background: ${({ theme }) => theme.colors.panel};
    }
  `,
};

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  appearance: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-family: ${({ theme }) => theme.typography.fontSans};
  font-size: ${({ theme }) => theme.typography.size.sm};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  padding: 0.65rem 1.15rem;
  transition: all 180ms ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 42px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }

  ${({ $variant }) => buttonVariants[$variant]}
`;

export function Button({ variant = 'primary', ...props }: ButtonProps) {
  return <StyledButton $variant={variant} {...props} />;
}
