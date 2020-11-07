import React from 'react';

import Button from '../atoms/Button';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { logout } from '../../../actions/auth';

const StyledMenuToggle = styled.div`
  /* width: 100%;
  height: 100%; */
  display: block;
  position: relative;

  z-index: 1;
  -webkit-user-select: none;
  user-select: none;
`;

const StyledButton = styled.button`
  border-style: none;
  margin: 2% 0;
  color: #232323;
`;

const StyledSpan = styled.span`
  display: block;
  width: 33px;
  height: 4px;
  margin-top: 5px;
  position: relative;

  background: #cdcdcd;
  border-radius: 3px;

  z-index: 1;

  transform-origin: 4px 0px;

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  &:first-child {
    transform-origin: 0% 0%;
  }

  &:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
`;

const StyledUl = styled.ul`
  position: absolute;
  top: -20%;
  width: 350%;
  height: 500%;
  margin: -20% 0 0 -250%;
  padding: 100% 10%;
  /* padding: 100% 5% 5% 5%; */

  background: #ededed;
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */

  transform-origin: 0% 0%;
  transform: translate(100%, 0);

  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
`;

const StyledInput = styled.input`
  display: block;
  width: 40px;
  height: 32px;
  position: absolute;
  /* top: -7px;
  left: -5px; */

  cursor: pointer;

  opacity: 0; /* hide this */
  z-index: 2; /* and place it over the hamburger */

  -webkit-touch-callout: none;

  &:checked ~ ${StyledSpan} {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: #232323;
  }

  &:checked ~ ${StyledSpan}:nth-last-child(3) {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  &:checked ~ ${StyledSpan}:nth-last-child(2) {
    transform: rotate(-45deg) translate(0, -1px);
  }

  &:checked ~ ${StyledUl} {
    transform: none;
  }
`;

const StyledLi = styled.li`
  /* padding: 10px 0; */
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Hamburger = () => {
  return (
    <nav role="navigation">
      <StyledMenuToggle>
        <StyledInput type="checkbox" />

        <StyledSpan></StyledSpan>
        <StyledSpan></StyledSpan>
        <StyledSpan></StyledSpan>

        <StyledUl>
          <StyledButton
            // onClick={(e) => deleteCategory(match.params.id)}
            onClick={() => console.log('ok')}
            type="button"
          >
            <StyledLi> Remove category</StyledLi>
          </StyledButton>
          <StyledButton>
            <StyledLi>Edit name</StyledLi>
          </StyledButton>
          {/* <a href="#">
            <li>Home</li>
          </a>
          <a href="#">
            <li>About</li>
          </a> */}
        </StyledUl>
      </StyledMenuToggle>
    </nav>
  );
};

Hamburger.propTypes = {};

export default Hamburger;
