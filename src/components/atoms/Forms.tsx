'use client';
import styled from 'styled-components';

export const TextInput = styled.input.attrs<{ isError?: boolean }>((props) => ({
  type: 'text',
  className: `input max-w-xs ${props.isError ? 'input-error' : ''}`,
  isError: undefined,
}))``;

export const NumberInput = styled(TextInput).attrs({ type: 'number' })``;

/** ラベル内にテキストとinputを両方入れる場合のラッパー */
export const LabelWrapper = styled.label.attrs({ className: 'label' })``;
/** ラベル内にテキストとinputを両方入れる場合のテキストのラッパー */
export const LabelSpan = styled.span.attrs({ className: 'label-text' })``;

/** ラベル テキストのみ入れる場合に使用する。 */
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

export const Button = styled.button.attrs({ className: 'btn' })``;

export const Checkbox = styled.input.attrs({
  type: 'checkbox',
  className: 'checkbox',
})``;

export const Radio = styled.input.attrs({
  type: 'radio',
  className: 'radio',
})``;
