import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/category";
import styled from "styled-components";

const StyledWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.grey300};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  perspective: 1000px;
  position: relative;
  /* height: 300px;
  width: 500px; */
  max-width: 100%;
`;

const StyledCard = styled.div`
  padding: 15%;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: translateX(50%) rotateY(-10deg);
  transition: transform 0.4s ease, opacity 0.4s ease;
`;

const StyledInnerCard = styled.div`
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
`;

const StyledInnerCardFront = styled.div``;
const StyledInnerCardBack = styled.div``;

const Card = ({ card: { question, answer } }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  console.log(showAnswer);
  return (
    <StyledWrapper>
      <StyledCard onClick={() => setShowAnswer(!showAnswer)}>
        <StyledInnerCard>
          <StyledInnerCardFront>
            <p>{question}</p>
          </StyledInnerCardFront>
          <StyledInnerCardBack>
            <p>{answer}</p>
          </StyledInnerCardBack>
        </StyledInnerCard>
      </StyledCard>
    </StyledWrapper>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteCard })(Card);
