import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { deleteCategory } from '../../actions/category';

const StyledCategory = styled.div`
  width: 100%;
  opacity: 1;
  outline: 0;
  position: relative;
  text-align: center;
  letter-spacing: 1px;
  display: inline-block;
  text-decoration: none;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.m};
  }
  &:hover {
    &:after {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
    &:before {
      opacity: 0;
      transform: translateY(50%) rotateX(90deg);
    }
  }
  &:after {
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    color: ${({ theme }) => theme.white};
    display: block;
    padding: 8% 4%;
    transition: 0.5s;
    position: absolute;
    background: ${({ theme }) => theme.black};
    border: 1px solid ${({ theme }) => theme.black};
    content: attr(data);
    transform: translateY(-50%) rotateX(90deg);
  }
  &:before {
    top: 0;
    left: 0;
    opacity: 1;
    color: ${({ theme }) => theme.black};
    display: block;
    padding: 8% 4%;
    transition: 0.5s;
    position: relative;
    background: ${({ theme }) => theme.grey200};
    content: attr(data);
    transform: translateY(0) rotateX(0);
  }
`;

const CategoryItem = ({
  deleteCategory,
  category: { _id, name, user },
  categoryDeleted,
}) => {
  if (categoryDeleted) {
    return <Redirect to="/categories" />;
  }
  return (
    <Fragment>
      <StyledCategory
        as={Link}
        to={`/categories/${_id}`}
        key={_id}
        data={name}
      ></StyledCategory>
      {/* <button onClick={(e) => deleteCategory(_id)} type="button">
        Remove category
      </button> */}
    </Fragment>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  categoryDeleted: state.category.categoryDeleted,
});

export default connect(mapStateToProps, { deleteCategory })(CategoryItem);
