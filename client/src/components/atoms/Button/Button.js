import styled, { css } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px 15px;

  ${({ small }) =>
    small &&
    css`
      font-size: 12px;
      padding: 5px 10px;
    `}
`;

export default Button;
