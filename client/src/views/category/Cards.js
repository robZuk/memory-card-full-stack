import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteCard } from "../../actions/category";
import styled from "styled-components";
import CardForm from "./CardForm";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const StyledWrapper = styled.div``;

const StyledNavigation = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 2fr 1fr;
`;

const StyledArrowLeft = styled(FontAwesomeIcon)``;
const StyledParagraph = styled.p`
  margin: 0;
`;
const StyledArrowRight = styled(FontAwesomeIcon)``;

const Cards = ({ id, category, deleteCard }) => {
  const { cards, user } = category;

  // React.useEffect(() => {
  //   // data from props to array here
  //   setArray(props.listofapi);
  // }, [props.listofapi]);

  // useEffect(() => {
  //   deleteCard(id, card._id);
  // }, [deleteCard, id, card._id]);

  // const [category.cards, deleteCard] = useState();

  const cardsLength = cards.length;

  const [currentActiveCard, setCurrentActiveCard] = useState(0);

  const card = cards[currentActiveCard];
  const [showAddNewCard, setShowAddNewCard] = useState(false);
  // console.log(cards[0]);
  return (
    <StyledWrapper>
      {!showAddNewCard && (
        <button onClick={() => setShowAddNewCard(!showAddNewCard)}>
          Add New Card
        </button>
      )}
      <button onClick={() => deleteCard(id, card._id)}>Delete card</button>
      <div>
        {card !== undefined ? (
          <Card key={card._id} card={card} id={category._id} />
        ) : (
          <p>There are no cards in this category</p>
        )}

        {/* {cards.map((card, index) => (
          <Card key={card._id} card={card} id={category._id} index={index} />
        ))} */}
      </div>

      {showAddNewCard && (
        <CardForm id={id} functions={[showAddNewCard, setShowAddNewCard]} />
      )}

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
