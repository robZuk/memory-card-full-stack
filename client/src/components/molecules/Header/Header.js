import React from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';

const StyledH1 = styled.h1`
  margin: 0 100px;
  font-size: 40px;
`;

const StyledWrapper = styled.div`
  position: absolute;
  top: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

const Header = () => {
  return (
    <StyledWrapper>
      <StyledH1>Memory Cards</StyledH1>
      <Button small>Add New Card</Button>
    </StyledWrapper>
  );
};

export default Header;
