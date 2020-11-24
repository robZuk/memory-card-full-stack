import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/molecules/Spinner.js";
import Button from "../../components/atoms/Button.js";

import EditCategory from "./EditCategory";
import Cards from "./Cards";

import { getCategory } from "../../actions/category";
import { deleteCategory } from "../../actions/category";

const StyledWrapper = styled.div`
  font-family: Montserrat;
  position: absolute;
  width: 90%;
  height: auto;
  left: 5%;
  right: 5%;
  display: grid;
  grid-template-columns: 25% 50% 25%;
  grid-template-rows: auto;
  grid-template-areas:
    "back title edit"
    ". cards .";
  grid-gap: 3%;
  justify-items: center;
`;

const StyledButton = styled(Button)`
  grid-area: back;
  border-style: none;
  padding: 1% 4%;
  align-self: end;
  letter-spacing: 2px;
  font-weight: 700;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledH2 = styled.h2`
  grid-area: title;
  padding: 0;
  margin: 0;
  align-self: end;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const StyledEditWrapper = styled.div`
  grid-area: edit;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const StyledEditIcon = styled(FontAwesomeIcon)`
  border-style: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  transition: all 0.2s ease-in-out;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }

  :hover {
    transform: scale(1.2);
  }
`;

const StyledDeleteIcon = styled(FontAwesomeIcon)`
  justify-self: end;
  border-style: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};
  transition: all 0.2s ease-in-out;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
  :hover {
    transform: scale(1.2);
  }
`;

const StyledEditCategoryWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 90vh;
  background-color: white;
  z-index: 1;

  text-align: center;

  display: grid;
  justify-items: center;
`;

const StyledEditCategory = styled(EditCategory)`
  position: absolute;
  margin: 0 auto;
  padding: 3% 0;

  /* width: 100%;
  height: 60%; */
  z-index: 2;
`;

const StyledCards = styled.div`
  margin-top: 5%;
  grid-area: cards;
  width: 80%;
`;

const Category = ({
  getCategory,
  deleteCategory,
  auth,
  category: { category, loading, categoryDeleted },
  match,
}) => {
  const [showEditCategory, setShowEditCategory] = useState(false);

  useEffect(() => {
    getCategory(match.params.id);
  }, [getCategory, match.params.id]);

  if (categoryDeleted) {
    return <Redirect to="/categories" />;
  }

  return loading || category === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <StyledWrapper>
        <StyledButton as={Link} to="/categories">
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </StyledButton>
        <StyledH2>{category.name}</StyledH2>

        <div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === category.user && (
              <StyledEditWrapper>
                {!showEditCategory ? (
                  <StyledEditIcon
                    icon={faPen}
                    title="Edit category name"
                    onClick={() => setShowEditCategory(!showEditCategory)}
                  />
                ) : (
                  <div></div>
                )}

                <StyledDeleteIcon
                  icon={faTrash}
                  title="Delete category"
                  onClick={(e) => deleteCategory(match.params.id)}
                  type="button"
                />
              </StyledEditWrapper>
            )}
        </div>

        {showEditCategory && (
          <StyledEditCategoryWrapper>
            <StyledEditCategory
              functions={[showEditCategory, setShowEditCategory]}
            />{" "}
          </StyledEditCategoryWrapper>
        )}

        <StyledCards>
          <Cards category={category} id={category._id} />
        </StyledCards>
      </StyledWrapper>
    </Fragment>
  );
};

Category.propTypes = {
  getCategory: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  category: state.category,
  auth: state.auth,
});

export default connect(mapStatetoProps, { getCategory, deleteCategory })(
  Category
);
