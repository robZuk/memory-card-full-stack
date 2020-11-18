import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Heading from "../components/atoms/Heading.js";
import Input from "../components/atoms/Input.js";
import Button from "../components/atoms/Button.js";
import Paragraph from "../components/atoms/Paragraph.js";
// import Alert from '../components/molecules/Alert';

const StyledWrapper = styled.div`
  position: absolute;
  left: 4%;
  width: 80%;
`;
// const StyledWrapper = styled.div`
//   position: absolute;
//   top: 20%;
//   left: 4%;
//   height: 40%;
//   width: 80%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   font-size: 3vh;
//   @media ${({ theme }) => theme.breakpoints.tablet} {
//     height: 35%;
//   }
//   @media ${({ theme }) => theme.breakpoints.laptop} {
//     height: 30%;
//   }
// `;

const StyledForm = styled.form`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  @media ${({ theme }) => theme.orientation.landscape} {
    width: 60%;
  }
`;
const StyledIcon = styled.p`
  @media ${({ theme }) => theme.breakpoints.mobileM} {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledHeading = styled(Heading)`
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const StyledInput = styled(Input)`
  margin: 2% 0;
  /* @media ${({ theme }) => theme.orientation.landscape} {
    margin: 2% 0;
  } */
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledButton = styled(Button)`
  @media ${({ theme }) => theme.orientation.landscape} {
    margin: 1% 0;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
    width: 30%;
  }
`;

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/categories" />;
  }
  return (
    <StyledWrapper>
      {/* <Alert /> */}
      <StyledHeading>Sign In</StyledHeading>
      <StyledIcon>
        <FontAwesomeIcon icon={faUser} /> Sign Into Your Account
      </StyledIcon>
      <StyledForm onSubmit={(e) => onSubmit(e)}>
        <StyledInput
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />

        <StyledButton register type="submit" value="Login">
          Login
        </StyledButton>
      </StyledForm>
      <Paragraph>
        Already have an account? <Link to="/register">Sign Up</Link>
      </Paragraph>
    </StyledWrapper>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
