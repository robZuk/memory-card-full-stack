import styled from 'styled-components';

const Input = styled.input`
  padding: 2%;
  font-size: ${({ theme }) => theme.fontSize.xs};
  border: 1px solid black;

  ::placeholder {
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey400};
  }
`;

export default Input;
