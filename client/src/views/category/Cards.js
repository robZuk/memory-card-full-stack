import React, { useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/category";
import styled from "styled-components";
import CardForm from "./CardForm";
import Card from "./Card";
import Button from "../../components/atoms/Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 6fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas:
    "add  . ."
    "card card card"
    ". . delete"
    "nav nav  nav";
  grid-gap: 3%;
`;

const StyledNavigation = styled.div`
  grid-area: nav;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 2fr 1fr;
`;

const StyledArrowLeft = styled(FontAwesomeIcon)``;
const StyledParagraph = styled.p`
  margin: 0;
`;
const StyledArrowRight = styled(FontAwesomeIcon)``;

const StyledButton = styled.button`
  padding: 0 2%;
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

const StyledCard = styled.div`
  grid-area: card;
`;

const Cards = ({ id, auth, category, deleteCard }) => {
  const { cards, user } = category;

  const cardsLength = cards.length;

  const [currentActiveCard, setCurrentActiveCard] = useState(0);

  const card = cards[currentActiveCard];
  const [showAddNewCard, setShowAddNewCard] = useState(false);

  return (
    <StyledWrapper>
      {!showAddNewCard && (
        <StyledAddButton onClick={() => setShowAddNewCard(!showAddNewCard)}>
          <FontAwesomeIcon icon={faPlus} /> Add New Card
        </StyledAddButton>
      )}

      <StyledCard>
        {card !== undefined ? (
          <Card key={card._id} card={card} id={category._id} />
        ) : (
          <p>There are no cards in this category</p>
        )}
      </StyledCard>
      {showAddNewCard && (
        <CardForm id={id} functions={[showAddNewCard, setShowAddNewCard]} />
      )}
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
      <StyledNavigation>
        <StyledArrowLeft
          icon={faArrowLeft}
          onClick={() => {
            setCurrentActiveCard(currentActiveCard - 1);
            if (currentActiveCard < 1) {
              setCurrentActiveCard(0);
            }
            return;
          }}
        />
        <StyledParagraph>
          {cardsLength !== 0
            ? `${currentActiveCard + 1} / ${cardsLength}`
            : null}
        </StyledParagraph>
        <StyledArrowRight
          icon={faArrowRight}
          onClick={() => {
            setCurrentActiveCard(currentActiveCard + 1);
            if (currentActiveCard >= cardsLength - 1) {
              setCurrentActiveCard(cardsLength - 1);
            }
          }}
        />
      </StyledNavigation>
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
