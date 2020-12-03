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
  width: 100%;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "back title edit"
    "cards cards cards";
  grid-gap: 3%;

  @media ${({ theme }) => theme.breakpoints.laptopL} {
    grid-template-areas:
      "back title edit"
      ". cards .";
  }
`;

const StyledButton = styled(Button)`
  grid-area: back;
  justify-self: end;
  align-self: center;
  border-style: none;
  padding: 1% 4%;

  letter-spacing: 2px;
  font-weight: 700;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledH2 = styled.h2`
  grid-area: title;
  justify-self: center;
  align-self: center;
  padding: 0;
  margin: 0;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  @media ${({ theme }) => theme.breakpoints.laptop} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const StyledEditWrapper = styled.div`
  grid-area: edit;
  justify-self: center;
  align-self: center;
`;

const StyledEdit = styled.div`
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

const StyledEditModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  background-color: white;
  z-index: 1;
  text-align: center;
  display: grid;
  justify-items: center;
  @media ${({ theme }) => theme.orientation.landscape} {
    height: 150%;
  }
`;

const StyledEditModal = styled(EditCategory)`
  position: absolute;
  margin: 0 auto;
  padding: 3% 0;
  z-index: 2;
`;

const StyledCards = styled.div`
  margin-top: 10%;
  grid-area: cards;
  width: 100%;
  @media ${({ theme }) => theme.orientation.landscape} {
    margin-top: 5%;
  }
  @media ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: 10%;
  }
  @media ${({ theme }) => theme.breakpoints.laptopL} {
    height: 110%;
  }
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

        <StyledEditWrapper>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === category.user && (
              <StyledEdit>
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
              </StyledEdit>
            )}
        </StyledEditWrapper>

        <StyledCards>
          <Cards category={category} id={category._id} />
        </StyledCards>
      </StyledWrapper>
      {showEditCategory && (
        <StyledEditModalWrapper>
          <StyledEditModal
            functions={[showEditCategory, setShowEditCategory]}
          />{" "}
        </StyledEditModalWrapper>
      )}
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
