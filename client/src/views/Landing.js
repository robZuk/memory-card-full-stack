import React from 'react';
import Button from '../components/atoms/Button/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: 60%;
  position: absolute;
  top: 20%;
  display: grid;
  grid-template-rows: 20fr 15fr 15fr;
  justify-items: center;
`;

const StyledButton = styled(Button)`
  font-size: 30px;
  margin: 0 20px;
`;

const StyledH1 = styled.h1`
  font-size: 55px;
`;

const StyledP = styled.p`
  font-size: 30px;
`;

const Landing = () => {
  return (
    <StyledWrapper>
      <StyledH1>Memory Cards</StyledH1>
      <StyledP>
        Create your profile and start learning with your memory cards
      </StyledP>
      <div>
        <StyledButton as={Link} to="register">
          Sign Up
        </StyledButton>
        <StyledButton as={Link} to="login">
          Login
        </StyledButton>
      </div>
    </StyledWrapper>
  );
};

export default Landing;
