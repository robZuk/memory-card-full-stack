import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard } from '../../actions/category';
import styled from 'styled-components';

const StyledWrapper = styled.div`

`

const StyledForm = styled.form`

`;

const CardForm = ({ id, addCard, functions }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  const [showAddNewCard, setShowAddNewCard] = functions;

  const { question, answer } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <StyledWrapper>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          addCard(id, formData);
          setFormData({ question: '', answer: '' });
          setShowAddNewCard(!showAddNewCard)
        }}
      >
        <input
          type="text"
          name="question"
          value={question}
          placeholder="question"
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="text"
          name="answer"
          value={answer}
          placeholder="answer"
          onChange={(e) => onChange(e)}
          required
        />
        <input type="submit" value="Add" />
      </StyledForm>
      <button onClick={() => setShowAddNewCard(!showAddNewCard)}>X</button>
    </StyledWrapper>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default connect(null, { addCard })(CardForm);
