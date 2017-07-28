import React from 'react';
import { connect } from 'react-redux';
import Link from '../components/Link.jsx';
import { setVisibilityFilter } from '../actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
})

const FilterLink = connect(null, mapDispatchToProps)(Link);

export default FilterLink;
