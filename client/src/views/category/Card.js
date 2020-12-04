import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/category";
import styled, { css } from "styled-components";

// Flipping card
const StyledCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  transform-style: preserve-3d;
  cursor: pointer;
  perspective: 10000px;

  &.flipped {
    & > div:first-of-type {
      // Front side of the card
      transform: rotateY(-180deg);
    }

    & > div:last-of-type {
      // Back side of the card
      transform: rotateY(0deg);
    }
  }
`;

// Card sides
const CardSide = css`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: all 0.75s ease-in-out;
  border: 1px solid ${({ theme }) => theme.grey300};

  &:after {
    content: "\f021  Flip";
    color: ${({ theme }) => theme.grey300};
    font-family: "Font Awesome 5 Free", Lato, sans-serif;
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
    font-size: 16px;
  }
`;

// Card side - front
const CardFront = styled.div`
  ${CardSide};

  text-align: center;
`;
// Card side - back
const CardBack = styled.div`
  ${CardSide};
  text-align: center;
  transform: rotateY(180deg);
`;

const Card = ({ card: { question, answer } }) => {
  const flipCard = (e) => {
    e.currentTarget.classList.toggle("flipped");
  };

  return (
    <StyledCard onClick={(e) => flipCard(e)}>
      <CardFront>{question}</CardFront>

      <CardBack>{answer}</CardBack>
    </StyledCard>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default connect(null, { deleteCard })(Card);
