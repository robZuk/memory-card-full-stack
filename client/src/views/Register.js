import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Heading from '../components/atoms/Heading/Heading';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import Paragraph from '../components/atoms/Paragraph/Paragraph';
import Alert from '../components/molecules/Alert';

const StyledWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 4%;
  height: 50%;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
`;

const StyledForm = styled.form`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;
const StyledIcon = styled.p`
  font-size: 30px;
`;

const StyledInput = styled(Input)`
  margin: 2% 0;
`;

const Register = ({ setAlert, register }) => {
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

  return (
    <StyledWrapper>
      <Alert />
      <Heading>Sign Up</Heading>
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
        <Button register type="submit" value="Register">
          Register
        </Button>
      </StyledForm>
      <Paragraph>
        Already have an account? <Link to="login">Sign In</Link>
      </Paragraph>
    </StyledWrapper>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, register })(Register);
