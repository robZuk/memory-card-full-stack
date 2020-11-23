import React, { useState, useEffect } from "react";
import Button from "../../components/atoms/Button.js";
import Input from "../../components/atoms/Input.js";
import { Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCategory, getCategory } from "../../actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: absolute;
  top: -20%;
  width: 60%;
  height: 60%;
  display: grid;
  justify-items: center;
  background-color: ${({ theme }) => theme.grey100};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  @media ${({ theme }) => theme.orientation.landscape} {
    margin-top: 10%;
  }
`;

const StyledH1 = styled.h1`
  margin-top: 5%;
  font-size: ${({ theme }) => theme.fontSize.l};
`;

const StyledForm = styled.form`
  width: 70%;
  display: grid;
  justify-items: center;
  align-items: flex-start;
`;

const StyledInnerWrapper = styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: 2fr 1fr;
`;

const StyledButton = styled(Button)`
  padding: 3%;
  margin: 0 2px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledInput = styled(Input)`
  padding: 3%;
  margin: 0 2px;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledXIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: ${({ theme }) => theme.fontSize.s};
`;

const EditCategory = ({
  category: { category, loading, categoryUpdated },
  updateCategory,
  getCategory,
  match,
  functions,
}) => {
  const [showEditCategory, setShowEditCategory] = functions;
  const [formData, setFormData] = useState({
    name: "",
    // user: '',
  });

  useEffect(() => {
    getCategory(match.params.id); //get current value from state

    setFormData({
      //if loading or !category.name
      name: loading || !category.name ? "" : category.name,
    });
    // eslint-disable-next-line
  }, [loading, getCategory]);

  const { name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    updateCategory(formData, match.params.id);
  };

  if (categoryUpdated) {
    return <Redirect to={`/categories/${match.params.id}`} />;
  }

  return (
    <StyledWrapper>
      <StyledH1>{category.name}</StyledH1>
      <StyledForm
        onSubmit={(e) => {
          onSubmit(e);
          setShowEditCategory(!showEditCategory);
        }}
      >
        <StyledInnerWrapper>
          <StyledInput
            type="text"
            placeholder="name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />

          <StyledButton type="submit">
            <FontAwesomeIcon icon={faPen} /> Rename
          </StyledButton>
        </StyledInnerWrapper>
      </StyledForm>

      <StyledXIcon
        icon={faTimes}
        onClick={() => setShowEditCategory(!showEditCategory)}
      />
    </StyledWrapper>
  );
};

EditCategory.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { updateCategory, getCategory })(
  withRouter(EditCategory)
);
