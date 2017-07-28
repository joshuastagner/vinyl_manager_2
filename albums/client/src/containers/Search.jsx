import React from 'react';
import { connect } from 'react-redux';
import { searchDiscogs } from '../actions';
import SearchBar from '../components/SearchBar.jsx';

const mapStateToProps = (state) => {
  let showBar = false;
  if (state.setFilterView.filter === "SEARCH_RESULT_RECORDS") {
    showBar = true;
  }

  return ({
    token: state.auth.token,
    url: state.auth.host,
    showSearchBar: showBar,
  })
};

const mapDispatchToProps = (dispatch) => ({
  submit: (url, token, query) => {
    dispatch(searchDiscogs(url, token, query));
  }
})

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default Search;
