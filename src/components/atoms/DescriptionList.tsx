import styled from 'styled-components';

export const DlCol = styled.dl<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columns ?? 2}, auto);
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
