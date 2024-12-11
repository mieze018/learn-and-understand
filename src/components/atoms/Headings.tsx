'use client';
import styled from 'styled-components';

const commonClasses = `font-bold w-full`;

export const H1 = styled.h1.attrs<{ className?: string }>({
  className: `${commonClasses} text-3xl`,
})``;

export const H2 = styled.h2.attrs({
  className: `${commonClasses} text-2xl`,
})``;

export const H3 = styled.h3.attrs({
  className: `${commonClasses} text-xl`,
})``;
