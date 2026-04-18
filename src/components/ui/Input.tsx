'use client';

import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Field = styled.label`
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.typography.size.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const StyledInput = styled.input`
  width: 100%;
  min-height: 44px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: ${({ theme }) => theme.borders.subtle};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 0.9rem;
  font-size: ${({ theme }) => theme.typography.size.sm};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSoft};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 1px;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export function Input({ label, id, ...props }: InputProps) {
  if (!label) {
    return <StyledInput id={id} {...props} />;
  }

  const inputId = id ?? props.name;

  return (
    <Field htmlFor={inputId}>
      <span>{label}</span>
      <StyledInput id={inputId} {...props} />
    </Field>
  );
}
