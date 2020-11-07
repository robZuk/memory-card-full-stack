import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCard } from '../../actions/category';

const Card = ({
  id,
  card: { _id, question, answer, user },
  auth,
  deleteCard,
  history,
}) => (
  <div>
    <p>{question}</p>
    <p>{answer}</p>
    {!auth.loading && user === auth.user._id && (
      <button onClick={() => deleteCard(id, _id)} type="button">
        Delete
      </button>
    )}
  </div>
);

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
