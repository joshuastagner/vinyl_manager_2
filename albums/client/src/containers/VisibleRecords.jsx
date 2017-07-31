import React from 'react';
import { connect } from 'react-redux';
import List from '../components/List.jsx';
import { } from '../actions';

const getVisibleRecords = (state, filter) => {
  switch (filter) {
    case 'OWNED_RECORDS':
      return state.userRecords.ownedRecords;
    case 'WANTED_RECORDS':
      return state.userRecords.wantedRecords;
    case 'SEARCH_RESULT_RECORDS':
      return state.searchRecords.searchResults;
  }
}

const mapStateToProps = (state) => ({
  records: getVisibleRecords(state, state.setFilterView.filter),
  filter: state.setFilterView.filter
});

const VisibleRecords = connect(mapStateToProps)(List);

export default VisibleRecords;
