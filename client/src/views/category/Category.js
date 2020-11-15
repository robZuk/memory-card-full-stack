import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
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

import { getCategory, deleteCategory } from "../../actions/category";

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
    "form form form"
    "cards cards cards";
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

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledDeleteIcon = styled(FontAwesomeIcon)`
  justify-self: end;
  border-style: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledEditCategory = styled.div`
  grid-area: form;
`;

const StyledCards = styled.div`
  margin-top: 5%;
  grid-area: cards;
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
        <StyledEditCategory>
          {showEditCategory && (
            <EditCategory functions={[showEditCategory, setShowEditCategory]} />
          )}
        </StyledEditCategory>
        <StyledCards>
          {/* <Redirect to={`/categories/card/${match.params.id}`} />; */}
          {/* <Cards category={category} id={category._id} /> */}
          <Cards id={category._id} />
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
  withRouter(Category)
);
