'use client';
import styled from 'styled-components';

export const Section1 = styled.section.attrs({
  className: 'flex flex-col gap-4 items-center w-full flex-wrap justify-center',
})``;

export const Section2 = styled.section.attrs({
  className:
    'flex flex-col gap-4 items-center flex-1  w-full flex-wrap justify-center',
})``;

export const Section3 = styled.section.attrs<{ vertical?: boolean }>(
  (props) => ({
    className: `flex gap-4 w-full items-center flex-wrap justify-center ${props.vertical ? 'flex-col' : 'flex-row'}`,
  }),
)``;
