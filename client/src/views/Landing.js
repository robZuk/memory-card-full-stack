import React from 'react';
import Button from '../components/atoms/Button/Button';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import Heading from '../components/atoms/Heading/Heading';
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
  margin: 0 20px;
`;

const Landing = () => {
  return (
    <StyledWrapper>
      <Heading big>Memory Cards</Heading>
      <Paragraph big>
        Create your profile and start learning with your memory cards
      </Paragraph>
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
