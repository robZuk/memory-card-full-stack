import React, { Fragment, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../components/molecules/Spinner.js';
import Button from '../../components/atoms/Button.js';

import EditCategory from './EditCategory';
import Cards from './Cards';

import { getCategory } from '../../actions/category';
import { deleteCategory } from '../../actions/category';

const StyledWrapper = styled.div`
  font-family: Montserrat;

  position: absolute;
  width: 90%;
  height: auto;
  left: 5%;
  right: 5%;
  display: grid;
  grid-template-columns: 30% 50% 20%;
  grid-gap: 3%;
`;

const StyledButton = styled(Button)`
  border-style: none;
  padding: 1% 4%;
  align-self: end;
  justify-self: center;
  letter-spacing: 2px;
  font-weight: 700;

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledH2 = styled.h2`
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

// const StyledHamburger = styled(Hamburger)`
//   align-self: end;
//   justify-self: end;
// `;

const StyledEditIcon = styled.button`
  border-style: none;
  cursor: pointer;

  background-color: ${({ theme }) => theme.white};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledDeleteIcon = styled.button`
  border-style: none;
  cursor: pointer;
  background-color: ${({ theme }) => theme.white};

  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
`;

const StyledEditWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-items: start;
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

        {/* <StyledHamburger /> */}
        {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === category.user && (
            <StyledEditWrapper>
              {!showEditCategory ? (
                <StyledEditIcon
                  onClick={() => setShowEditCategory(!showEditCategory)}
                >
                  <FontAwesomeIcon icon={faEdit} title="Edit category name" />
                </StyledEditIcon>
              ) : (
                <div></div>
              )}

              <StyledDeleteIcon
                onClick={(e) => deleteCategory(match.params.id)}
                type="button"
              >
                <FontAwesomeIcon icon={faTrash} title="Delete category" />
              </StyledDeleteIcon>
            </StyledEditWrapper>
          )}
      </StyledWrapper>
      {showEditCategory && (
        <EditCategory functions={[showEditCategory, setShowEditCategory]} />
      )}
      <Cards category={category} id={category._id} />
      {/* {category.cards.map((card) => (
        <CardItem key={card._id} card={card} id={category._id} />
      ))} */}

      {/* <CardForm id={category._id} /> */}
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
