import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Heading from '../components/atoms/Heading/Heading';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import Alert from '../components/molecules/Alert';

// const StyledWrapper = styled.div`
//   position: absolute;
//   top: 20%;
//   left: 4%;
//   height: auto;
//   width: 80%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   font-size: 3vh;

//   @media ${({ theme }) => theme.breakpoints.laptop} {
//     height: 40%;
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
const StyledParagraph = styled(Paragraph)`
  margin-top: 7%;
`;

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'red');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      {/* <Alert /> */}
      <StyledHeading>Sign Up</StyledHeading>
      <StyledIcon>
        <FontAwesomeIcon icon={faUser} /> Create Your Account
      </StyledIcon>
      <StyledForm onSubmit={(e) => onSubmit(e)}>
        <StyledInput
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
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
        <StyledInput
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
        />
        <StyledButton register type="submit" value="Register">
          Register
        </StyledButton>
      </StyledForm>
      <StyledParagraph>
        Already have an account? <Link to="login">Sign In</Link>
      </StyledParagraph>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
