import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.grey300};
  border-radius: 3px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  padding: 1%;
  text-decoration: none;
  transition: linear 0.2s;
  :hover {
    background-color: ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.white};
  }
`;

export default Button;
