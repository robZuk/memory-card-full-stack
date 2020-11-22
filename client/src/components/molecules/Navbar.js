import React from "react";
import logo from "../../assets/images/logo.png";
import Button from "../atoms/Button.js";
import Paragraph from "../atoms/Paragraph.js";

import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const StyledWrapper = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid black;
  position: absolute;
  top: 2%;
  /* z-index: 1; */
`;

const StyledInnerWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

const StyledLogo = styled.img`
  position: absolute;
  left: 15px;
  width: auto;
  height: 70%;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    left: 30px;
  }
  @media ${({ theme }) => theme.breakpoints.laptopL} {
    height: 100%;
  }
  @media ${({ theme }) => theme.orientation.landscape} {
    height: 100%;
  }
`;

const StyledParagraph = styled(Paragraph)`
  position: absolute;
  left: 8%;
  padding: 0%;
  margin: 0%;
  @media ${({ theme }) => theme.orientation.landscape} {
    font-size: ${({ theme }) => theme.fontSize.xs};
    left: 55%;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
  @media ${({ theme }) => theme.breakpoints.laptopL} {
    left: 70%;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    padding: 0.5%;
  }
  @media ${({ theme }) => theme.breakpoints.LaptopL} {
    padding: 0.5% 1%;
  }
`;
const StyledLogoutButton = styled(StyledButton)`
  right: 5%;
`;

const StyledRegisterButton = styled(StyledButton)`
  right: 20%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    right: 15%;
  }

  @media ${({ theme }) => theme.breakpoints.laptop} {
    right: 15%;
  }
  @media ${({ theme }) => theme.orientation.landscape} {
    right: 12%;
  }
`;

const StyledLoginButton = styled(StyledButton)`
  right: 3%;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  width: 10%;
  height: 100%;

  cursor: pointer;
  z-index: 2;
`;

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <StyledInnerWrapper>
      <StyledParagraph>Welcome {user && user.name}</StyledParagraph>
      <StyledLogoutButton as={Link} to="#!" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </StyledLogoutButton>
    </StyledInnerWrapper>
  );

  const guestLinks = (
    <StyledInnerWrapper>
      <StyledRegisterButton as={Link} to="register">
        Register
      </StyledRegisterButton>
      <StyledLoginButton as={Link} to="login">
        Login
      </StyledLoginButton>
    </StyledInnerWrapper>
  );

  return (
    <StyledWrapper>
      <StyledLink to="/">
        <StyledLogo src={logo} alt="Logo" />
      </StyledLink>
      {!loading && <div>{isAuthenticated ? authLinks : guestLinks}</div>}
    </StyledWrapper>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
