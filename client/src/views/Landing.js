import React from "react";
import Button from "../components/atoms/Button.js";
import Paragraph from "../components/atoms/Paragraph.js";
import Heading from "../components/atoms/Heading.js";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;
  grid-template-rows: 20fr 15fr 15fr;
  justify-items: center;
`;

const StyledButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 1% 3%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;
const StyledButtonWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 40%;
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    width: 30%;
  }
  @media ${({ theme }) => theme.orientation.landscape} {
    width: 28%;
  }
`;
const StyledHeading = styled(Heading)`
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;
const StyledParagraph = styled(Paragraph)`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.s};
  margin: 0 2%;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    font-size: ${({ theme }) => theme.fontSize.l};
    margin: 0 5%;
  }
`;

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/categories" />;
  }
  return (
    <StyledWrapper>
      <StyledHeading>Memory Cards</StyledHeading>
      <StyledParagraph>
        Create your profile and start learning with your memory cards
      </StyledParagraph>
      <StyledButtonWrapper>
        <StyledButton as={Link} to="register">
          Sign Up
        </StyledButton>
        <StyledButton as={Link} to="login">
          Login
        </StyledButton>
      </StyledButtonWrapper>
    </StyledWrapper>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth,
});

export default connect(mapStateToProps)(Landing);
