import styled, { css } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fontSize.m};
  color: ${({ theme }) => theme.black};
  padding: 10px 15px;
  text-decoration: none;
  ${({ small }) =>
    small &&
    css`
      font-size: ${({ theme }) => theme.fontSize.s};
      padding: 5px 10px;
      align-self: bottom;
    `};
  ${({ register }) =>
    register &&
    css`
      width: 30%;
      font-size: ${({ theme }) => theme.fontSize.s};
      background-color: ${({ theme }) => theme.black};
      color: ${({ theme }) => theme.white};
    `};
`;

export default Button;
