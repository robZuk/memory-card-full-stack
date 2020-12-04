import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/category";
import styled, { css } from "styled-components";
import CardForm from "./CardForm";
import Card from "./Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 5%;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "add add ."
    "card card card"
    ". delete delete"
    ". nav .";
  grid-gap: 5%;
  @media ${({ theme }) => theme.orientation.landscape} {
    grid-gap: 3%;
    width: 60%;
    margin: 0 20%;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-areas:
      "add . ."
      "card card card"
      ". . delete"
      ". nav .";
    grid-gap: 5%;
    width: 60%;
    margin: 0 20%;
  }

  @media ${({ theme }) => theme.breakpoints.laptopL} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledNavigation = styled.div`
  grid-area: nav;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 2fr 1fr;
`;

const StyledNavigationNum = styled.p`
  margin: 0;
`;

const StyledArrowLeft = styled(FontAwesomeIcon)`
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const StyledArrowRight = styled(FontAwesomeIcon)`
  cursor: pointer;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      pointer-events: none;
    `}
`;

const StyledButton = styled.button`
  width: 60%;
  cursor: pointer;
  padding: 3%;
  border: 1px solid ${({ theme }) => theme.grey300};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
  @media ${({ theme }) => theme.orientation.landscape} {
    padding: 1%;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    width: 70%;
    padding: 3%;
  }
  @media ${({ theme }) => theme.breakpoints.laptopL} {
    width: 100%;
  }
`;

const StyledAddButton = styled(StyledButton)`
  grid-area: add;
`;

const StyledDeleteButton = styled(StyledButton)`
  grid-area: delete;
  justify-self: end;
`;

const StyledCardWrapper = styled.div`
  grid-area: card;
`;

const StyledCardInnerWrapper = styled.div`
  perspective: 1000px;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 100%;
`;
const StyledCard = styled.div.attrs({
  className: "styledCard ",
})`
  grid-area: card;
  opacity: 1;
  height: 100%;
  width: 100%;
  transition: transform 0.4s ease, opacity 0.4s ease;

  @keyframes right {
    0% {
      transform: translateX(50%) rotateY(-10deg);
    }
    100% {
      transform: translateX(0%) rotateY(0deg);
    }
  }

  @keyframes left {
    0% {
      transform: translateX(-50%) rotateY(-10deg);
    }
    100% {
      transform: translateX(0%) rotateY(0deg);
    }
  }
  &.runRightAnimation {
    animation: right 0.4s ease;
  }
  &.runLeftAnimation {
    animation: left 0.4s ease;
  }
`;

const StyledInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

const StyledParagraph = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const Cards = ({ id, category, deleteCard }) => {
  const { cards } = category;

  const cardsLength = cards.length;

  const [currentActiveCard, setCurrentActiveCard] = useState(0);

  const card = cards[currentActiveCard];

  const [showAddNewCard, setShowAddNewCard] = useState(false);

  const cardClassName = document.querySelector(".styledCard");

  const animateRightCard = () => {
    if (cardClassName !== null || currentActiveCard < 0) {
      cardClassName.classList.remove("runLeftAnimation");
      cardClassName.classList.remove("runRightAnimation");
      void cardClassName.offsetWidth;
      cardClassName.classList.add("runRightAnimation");
    }
  };

  const animateLeftCard = () => {
    if (cardClassName !== null) {
      cardClassName.classList.remove("runRightAnimation");
      cardClassName.classList.remove("runLeftAnimation");
      void cardClassName.offsetWidth;
      cardClassName.classList.add("runLeftAnimation");
    }
  };
  return (
    <Fragment>
      <StyledWrapper>
        {showAddNewCard && (
          <CardForm id={id} functions={[showAddNewCard, setShowAddNewCard]} />
        )}
        {!showAddNewCard && cardsLength !== 0 && (
          <StyledAddButton onClick={() => setShowAddNewCard(!showAddNewCard)}>
            <FontAwesomeIcon icon={faPlus} /> Add Card
          </StyledAddButton>
        )}

        <StyledCardWrapper>
          {card !== undefined ? (
            <StyledCardInnerWrapper>
              <StyledCard
                currentActiveCard={currentActiveCard}
                cardsLength={cardsLength}
              >
                <Card key={card._id} card={card} id={category._id} />
              </StyledCard>
            </StyledCardInnerWrapper>
          ) : (
            <StyledInnerWrapper>
              <StyledParagraph>
                There are no cards in this category
              </StyledParagraph>
              <StyledButton onClick={() => setShowAddNewCard(!showAddNewCard)}>
                <FontAwesomeIcon icon={faPlus} /> Add New Card
              </StyledButton>
            </StyledInnerWrapper>
          )}
        </StyledCardWrapper>

        {cardsLength ? (
          <StyledDeleteButton
            type="submit"
            value="Add"
            onClick={() => {
              deleteCard(id, card._id);
              setCurrentActiveCard(currentActiveCard - 1);
              if (currentActiveCard < 1) {
                setCurrentActiveCard(0);
              }
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faMinus} /> Delete card
          </StyledDeleteButton>
        ) : null}
        {cardsLength !== 0 ? (
          <StyledNavigation>
            <StyledArrowLeft
              disabled={currentActiveCard < 1}
              icon={faArrowLeft}
              onClick={() => {
                setCurrentActiveCard(currentActiveCard - 1);
                animateLeftCard();
              }}
            />
            <StyledNavigationNum>
              {currentActiveCard + 1} / {cardsLength}
            </StyledNavigationNum>
            <StyledArrowRight
              disabled={currentActiveCard >= cardsLength - 1}
              icon={faArrowRight}
              onClick={(e) => {
                setCurrentActiveCard(currentActiveCard + 1);
                animateRightCard();
              }}
            />
          </StyledNavigation>
        ) : null}
      </StyledWrapper>
    </Fragment>
  );
};

Cards.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default connect(null, { deleteCard })(Cards);
