import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { deleteCard } from "../../actions/category";
import styled from "styled-components";

const StyledWrapper = styled.div``;

const Card = ({ card: { _id, question, answer, user }, auth }) => {
  return (
    <StyledWrapper>
      <p>{question}</p>
      <p>{answer}</p>
      {/* {!auth.loading && user === auth.user._id && (
        <button onClick={() => deleteCard(id, _id)} type="button">
          Delete
        </button>
      )} */}
    </StyledWrapper>
  );
};

Card.propTypes = {
  card: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Card);
