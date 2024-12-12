import styled from 'styled-components';

export const DlCol = styled.dl`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 1rem;
  row-gap: 0.2rem;
  height: fit-content;
`;
export const Dt = styled.dt`
  font-weight: bold;
`;

export const Dd = styled.dd`
  margin: 0;
`;
