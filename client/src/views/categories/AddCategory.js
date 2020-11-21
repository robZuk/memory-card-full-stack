import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addCategory } from "../../actions/category";
import styled from "styled-components";
import Input from "../../components/atoms/Input.js";
import Button from "../../components/atoms/Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledForm = styled.form`
  margin: 5% 0;
`;

const StyledInput = styled(Input)`
  padding: 1% 3%;
  margin: 0 2px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledButton = styled(Button)`
  padding: 1% 1%;
  margin: 0 2px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const AddCategory = ({ addCategory }) => {
  const [name, setName] = useState("");

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        addCategory({ name });
        setName("");
      }}
    >
      <StyledInput
        type="text"
        name="name"
        placeholder="Add new category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <StyledButton type="submit" value="Add">
        {" "}
        <FontAwesomeIcon icon={faPlus} /> Add
      </StyledButton>
    </StyledForm>
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
};

export default connect(null, { addCategory })(AddCategory);
