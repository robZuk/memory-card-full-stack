import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Spinner from '../../components/molecules/Spinner.js';
import styled from 'styled-components';

import { getCategories } from '../../actions/category';
import AddCategory from './AddCategory';
import CategoryItem from './CategoryItem';

const StyledWrapper = styled.div`
  position: absolute;
  width: 90%;
  left: 5%;
  right: 5%;
  display: grid;
  grid-template-rows: auto auto auto;
`;

const StyledCategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4vh;
  width: 100%;

  @media ${({ theme }) => theme.orientation.landscape} {
    top: 10%;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StyledH2 = styled.h2`
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.l};
  }
`;

const Categories = ({
  getCategories,
  deleteCategory,
  category: { categories, loading },
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return loading ? (
    <Spinner />
  ) : (
    <StyledWrapper>
      <StyledH2>Categories</StyledH2>
      <StyledCategoryWrapper>
        {categories.map((category) => (
          <CategoryItem key={category._id} category={category} />
        ))}
      </StyledCategoryWrapper>
      <AddCategory />
    </StyledWrapper>
  );
};

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getCategories })(Categories);
