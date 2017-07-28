import { combineReducers } from 'redux';
import {
  REQUEST_USER_RECORDS, RECEIVE_USER_RECORDS,
  REQUEST_SEARCH_RECORDS, RECEIVE_SEARCH_RECORDS,
  SAVE_RECORD, REMOVE_RECORD, SET_VISIBILITY_FILTER,
  VISIBILITY_FILTERS, LOGGED_IN, SET_TOKEN, SET_HOST
} from '../actions'

const userRecords = (state = {
  isFetching: false,
  ownedRecords: [],
  wantedRecords: []
}, action) => {
  switch (action.type) {
    case REQUEST_USER_RECORDS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_USER_RECORDS:
      return {
        ...state,
        isFetching: false,
        ownedRecords: action.ownedRecords,
        wantedRecords: action.wantedRecords
      };
    default:
      return state;
  }
};

const searchRecords = (state = {
  isSearching: false,
  searchResults: []
}, action) => {
  switch (action.type) {
    case REQUEST_SEARCH_RECORDS:
      return {
        ...state,
        isSearching: true
      }
    case RECEIVE_SEARCH_RECORDS:
      return {
        ...state,
        isSearching: false,
        searchResults: action.records
      }
    default:
      return state;
  }
};

const setFilterView = (state = {
  ...state,
  filter: VISIBILITY_FILTERS.OWNED_RECORDS
}, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state;
  }
};

const auth = (state = {}, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: action.bool,
        user: action.user
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      }
    case SET_HOST:
      return {
        ...state,
        host: action.url
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  userRecords,
  searchRecords,
  setFilterView,
  auth
});

export default rootReducer;
