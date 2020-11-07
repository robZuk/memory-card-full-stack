import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardForm from './CardForm';
import Card from './Card';

const Cards = ({ id, category }) => {
  const { cards, user } = category;
  return (
    <Fragment>
      <div>
        {/* <p>{question}</p>
    <p>{answer}</p>
    {!auth.loading && user === auth.user._id && (
      <button onClick={() => deleteCard(id, _id)} type="button">
        Delete
      </button>
    )} */}
        {/* {console.log(cards)} */}
        {category.cards.map((card) => (
          <Card key={card._id} card={card} id={category._id} />
        ))}
      </div>
      <CardForm id={id} />
    </Fragment>
  );
};

Cards.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Cards);
