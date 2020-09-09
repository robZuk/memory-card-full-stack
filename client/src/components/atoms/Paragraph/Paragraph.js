import styled, { css } from 'styled-components';

const Paragraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
  background-color: ${({ activeColor, theme }) => theme[activeColor]};
  padding: 2% 2%;
  margin: 1% 0;
  ${({ big }) =>
    big &&
    css`
      font-size: ${({ theme }) => theme.fontSize.m};
    `};
`;

export default Paragraph;
