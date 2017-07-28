import React from 'react';
import FilterLink from '../containers/FilterLink.jsx';
import Auth from '../containers/Auth.jsx';

const NavBar = () => {
  return (
    <p className="nav">
      <FilterLink filter='OWNED_RECORDS'>Your Records</FilterLink>
      <FilterLink filter='WANTED_RECORDS'>Wanted Records</FilterLink>
      <FilterLink filter='SEARCH_RESULT_RECORDS'>Search Records</FilterLink>
      <Auth />
    </p>
  );
};

export default NavBar;
