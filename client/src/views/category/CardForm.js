import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCard } from "../../actions/category";
import styled from "styled-components";
import Button from "../../components/atoms/Button";

const StyledWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: white;
  z-index: 1;
  text-align: center;
  @media ${({ theme }) => theme.orientation.landscape} {
    height: 150vh;
  }
`;

const StyledInnerWrapper = styled.div`
  margin: 0 auto;
  padding: 3% 0;
  width: 90%;
  height: 70%;
  background-color: ${({ theme }) => theme.grey100};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  @media ${({ theme }) => theme.orientation.lanscape} {
    height: 60%;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    height: 50%;
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    width: 70%;
  }
`;

const StyledForm = styled.form`
  height: 80%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
`;
const StyledH2 = styled.h2`
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
`;

const StyledInputGroup = styled.div`
  width: 100%;
  justify-items: center;
  display: grid;
`;

const StyledLabel = styled.label`
  justify-self: start;
  margin-left: 10%;
  margin-top: 2%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledTextarea = styled.textarea`
  width: 80%;
  margin-top: 2%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledButton = styled(Button)`
  justify-self: start;
  width: 40%;
  margin-left: 10%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
    width: 20%;
  }
`;

const StyledI = styled.i`
  cursor: pointer;
  position: absolute;
  top: 2%;
  right: 8%;
  font-size: ${({ theme }) => theme.fontSize.s};
  @media ${({ theme }) => theme.breakpoints.laptop} {
    right: 18%;
  }
`;
const CardForm = ({ id, addCard, functions }) => {
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [showAddNewCard, setShowAddNewCard] = functions;

  const { question, answer } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <StyledWrapper>
      <StyledInnerWrapper>
        <StyledH2>Add New Card</StyledH2>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
            addCard(id, formData);
            setFormData({ question: "", answer: "" });
            setShowAddNewCard(!showAddNewCard);
          }}
        >
          <StyledInputGroup>
            <StyledLabel htmlFor="question">Question</StyledLabel>
            <StyledTextarea
              type="text"
              name="question"
              value={question}
              placeholder="Enter question..."
              onChange={(e) => onChange(e)}
              required
            />
          </StyledInputGroup>
          <StyledInputGroup>
            <StyledLabel htmlFor="answer">Answer</StyledLabel>
            <StyledTextarea
              type="text"
              name="answer"
              value={answer}
              placeholder="Enter Answer..."
              onChange={(e) => onChange(e)}
              required
            />
          </StyledInputGroup>

          <StyledButton type="submit">
            {" "}
            <i className="fas fa-plus"></i> Add Card
          </StyledButton>
        </StyledForm>
      </StyledInnerWrapper>

      <StyledI
        className="fas fa-times"
        onClick={() => setShowAddNewCard(!showAddNewCard)}
      ></StyledI>
    </StyledWrapper>
  );
};

CardForm.propTypes = {
  addCard: PropTypes.func.isRequired,
};

export default connect(null, { addCard })(CardForm);
