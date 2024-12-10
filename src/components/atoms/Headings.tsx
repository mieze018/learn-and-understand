'use client';
import styled from 'styled-components';

const commonClasses = `font-bold w-full`;

export const H1 = styled.h1.attrs<{ className?: string }>({
  className: `${commonClasses} text-3xl`,
})``;

export const H2 = styled(H1).attrs({
  className: `${commonClasses} text-2xl`,
  as: 'h2',
})``;
