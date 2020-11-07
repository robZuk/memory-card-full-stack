import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard } from '../../actions/category';
import styled from 'styled-components';

const StyledForm = styled.form`
  position: absolute;
  top: 50%;
`;

const CardForm = ({ id, addCard }) => {
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  const { question, answer } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        addCard(id, formData);
        setFormData({ question: '', answer: '' });
      }}
    >
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => onChange(e)}
        required
      />
      <input
        type="text"
        name="answer"
        value={answer}
        onChange={(e) => onChange(e)}
        required
      />
      <input type="submit" value="Submit" />
    </StyledForm>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default connect(null, { addCard })(CardForm);
