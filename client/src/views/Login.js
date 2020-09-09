import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Heading from '../components/atoms/Heading/Heading';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';
import Paragraph from '../components/atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  position: absolute;
  top: 20%;
  left: 4%;
  height: 40%;
  width: 20%;
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
  justify-content: space-between;
`;
const StyledIcon = styled.p`
  font-size: 30px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('SUCCESS');
  };

  return (
    <StyledWrapper>
      <Heading>Sign In</Heading>
      <StyledIcon>
        <FontAwesomeIcon icon={faUser} /> Sign Into Your Account
      </StyledIcon>
      <StyledForm onSubmit={(e) => onSubmit(e)}>
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
          value={password}
          onChange={(e) => onChange(e)}
        />

        <Button register type="submit" value="Login">
          Login
        </Button>
      </StyledForm>
      <Paragraph>
        Already have an account? <Link to="/register">Sign Up</Link>
      </Paragraph>
    </StyledWrapper>
  );
};

export default Register;
