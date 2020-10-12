import React from 'react';
import logo from '../../../assets/images/logo.png';
import Button from '../../atoms/Button/Button';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

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
  top: 30%;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    top: 20%;
  }
  @media ${({ theme }) => theme.orientation.landscape} {
    top: 15%;
  }
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

  @media ${({ theme }) => theme.orientation.landscape} {
    font-size: ${({ theme }) => theme.fontSize.xs};
    left: 40%;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
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
      <StyledLogo src={logo} alt="Logo" />
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
