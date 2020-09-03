import styled, { css } from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 20px;
  color: black;
  padding: 10px 15px;
  text-decoration: none
    ${({ small }) =>
      small &&
      css`
        font-size: 12px;
        padding: 5px 10px;
        align-self: bottom;
      `};
`;

export default Button;
