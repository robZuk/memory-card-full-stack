import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/category";
import styled from "styled-components";
import CardForm from "./CardForm";
import Card from "./Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr 1fr;
  grid-template-columns: auto;
  grid-template-areas:
    "add  . ."
    "card card card"
    ". . delete"
    ". nav  .";
  grid-gap: 10%;
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
`;

const StyledArrowRight = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const StyledButton = styled.button`
  cursor: pointer;
  padding: 3%;
  border: 1px solid ${({ theme }) => theme.grey300};
  border-radius: 3px;
  background-color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledAddButton = styled(StyledButton)`
  grid-area: add;
`;

const StyledDeleteButton = styled(StyledButton)`
  grid-area: delete;
`;

const StyledCardWrapper = styled.div`
  grid-area: card;
`;

const StyledCardInnerWrapper = styled.div`
  perspective: 1000px;
  position: relative;
  height: 300px;
  width: 500px;
  max-width: 100%;
`;
const StyledCard = styled.div`
  position: absolute;
  transform: translateX(50%) rotateY(-10deg);
  opacity: 0;
  /* opacity: ${({ activeCard }) => (activeCard ? "1" : "0")};
  transform: translate(${({ activeCard }) => (activeCard ? "0" : "100%")}); */
  ${({ activeCard }) =>
    activeCard
      ? "opacity: 1; cursor: pointer; transform: translateX(0) rotateY(0deg); z-index: 10;"
      : "opacity: 0;"}
  /* opacity: 1; */
  ${({ leftCard }) =>
    leftCard ? "transform: translateX(-50%) rotateY(10deg);" : null}

  font-size: 1.5em;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  transition: transform 0.4s ease, opacity 0.4s ease;
`;

const StyledInnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

const StyledParagraph = styled.p`
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const Cards = ({ id, auth, category, deleteCard }) => {
  const { cards, user } = category;

  const cardsLength = cards.length;

  const [currentActiveCard, setCurrentActiveCard] = useState(0);

  const card = cards[currentActiveCard];

  console.log(currentActiveCard);

  const [showAddNewCard, setShowAddNewCard] = useState(false);

  const [activeCard, setActiveCard] = useState(false);
  const [leftCard, setLeftCard] = useState(false);

  console.log(activeCard);
  return (
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
              activeCard={activeCard}
              leftCard={leftCard}
              currentActiveCard={currentActiveCard}
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

      {!auth.loading && user === auth.user._id && cardsLength ? (
        <StyledDeleteButton
          type="submit"
          value="Add"
          onClick={() => {
            deleteCard(id, card._id);
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faMinus} /> Delete card
        </StyledDeleteButton>
      ) : null}
      {cardsLength !== 0 ? (
        <StyledNavigation>
          <StyledArrowLeft
            icon={faArrowLeft}
            onClick={() => {
              setLeftCard(!leftCard);
              setCurrentActiveCard(currentActiveCard - 1);
              if (currentActiveCard < 1) {
                setCurrentActiveCard(0);
              }
              return;
            }}
          />
          <StyledNavigationNum>
            {currentActiveCard + 1} / {cardsLength}
          </StyledNavigationNum>
          <StyledArrowRight
            icon={faArrowRight}
            onClick={(e) => {
              setActiveCard(!activeCard);
              setCurrentActiveCard(currentActiveCard + 1);
              if (currentActiveCard >= cardsLength - 1) {
                setCurrentActiveCard(cardsLength - 1);
              }
            }}
          />
        </StyledNavigation>
      ) : null}
    </StyledWrapper>
  );
};

Cards.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteCard })(Cards);
