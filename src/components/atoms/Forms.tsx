'use client';
import styled from 'styled-components';

export const TextInput = styled.input.attrs<{ isError?: boolean }>((props) => ({
  type: 'text',
  className: `input max-w-xs ${props.isError ? 'input-error' : ''}`,
  isError: undefined,
}))``;

export const NumberInput = styled(TextInput).attrs({ type: 'number' })``;

const LabelWrapper = styled.label.attrs({ className: 'label' })``;
const LabelSpan = styled.span.attrs({ className: 'label-text' })``;

export const Label = ({
  children,
  ...props
}: Readonly<
  {
    children: React.ReactNode;
  } & React.LabelHTMLAttributes<HTMLLabelElement>
>) => {
  return (
    <LabelWrapper {...props}>
      <LabelSpan>{children}</LabelSpan>
    </LabelWrapper>
  );
};
