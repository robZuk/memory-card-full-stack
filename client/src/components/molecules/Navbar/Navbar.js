import React from 'react';
import logo from '../../../assets/images/logo.png';
import Button from '../../atoms/Button/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid black;
  position: absolute;
  top: 2%;
  z-index: 1;
`;

const StyledInnerWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 30px;
  width: 15%;
  display: flex;
  justify-content: space-around;
`;

const StyledLogo = styled.img`
  position: absolute;
  left: 30px;
  width: 20%;
  height: 100%;
`;

const Navbar = () => {
  return (
    <StyledWrapper>
      <StyledLogo src={logo} alt="Logo" />
      <StyledInnerWrapper>
        <Button as={Link} to="register">
          Register
        </Button>
        <Button as={Link} to="login">
          Login
        </Button>
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

export default Navbar;
