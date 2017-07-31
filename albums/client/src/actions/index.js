import axios from 'axios';

export const LOGGED_IN = 'LOGGED_IN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_HOST = 'SET_HOST';
export const REQUEST_USER_RECORDS = 'REQUEST_USER_RECORDS';
export const RECEIVE_USER_RECORDS = 'RECEIVE_USER_RECORDS';
export const REQUEST_SEARCH_RECORDS = 'REQUEST_SEARCH_RECORDS';
export const RECEIVE_SEARCH_RECORDS = 'RECEIVE_SEARCH_RECORDS';
export const SAVE_RECORD = 'SAVE_RECORD';
export const REQUEST_REMOVE_RECORD = 'REQUEST_REMOVE_RECORD';
export const SUCCESS_REMOVE_RECORD = 'SUCCESS_REMOVE_RECORD';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const VISIBILITY_FILTERS = {
  OWNED_RECORDS: 'OWNED_RECORDS',
  WANTED_RECORDS: 'WANTED_RECORDS',
  SEARCH_RESULT_RECORDS: 'SEARCH_RESULT_RECORDS',
  ADD_RECORD: 'ADD_RECORD'
};

export const isLoggedIn = (bool, user) => ({
  type: LOGGED_IN,
  bool,
  user
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token
});

export const setHost = (url) => ({
  type: SET_HOST,
  url
});

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter
});

export const requestUserRecords = () => ({
  type: REQUEST_USER_RECORDS
});
export const receiveUserRecords = (ownedRecords, wantedRecords) => ({
  type: RECEIVE_USER_RECORDS,
  ownedRecords,
  wantedRecords
});
export const fetchUserRecords = url => dispatch => {
  dispatch(requestUserRecords);
  axios.get(url)
    .then(({ data }) => {
      const userRecords = data.reduce((splitRecords, record) => {
        if (record.owned) {
          splitRecords.owned.push(record)
        } else {
          splitRecords.wanted.push(record)
        }
        return splitRecords;
      }, {owned:[], wanted:[]});

      dispatch(receiveUserRecords(userRecords.owned, userRecords.wanted));

    });
};

export const requestSearchRecords = query => ({
  type: REQUEST_SEARCH_RECORDS,
  query
});
export const receiveSearchRecords = records => ({
  type: RECEIVE_SEARCH_RECORDS,
  records
});
export const searchDiscogs = (url, token, query) => dispatch => {
  dispatch(requestSearchRecords(query));
  axios({
    method: 'POST',
    url: `${url}/albums/api/records/`,
    headers: {'X-CSRFToken': token},
    data: {
      query: query
    }
  }).then(({ data }) => {
    dispatch(receiveSearchRecords(data));
  })
};

export const saveRecord = (url, token, record, owned) => dispatch => {
  axios({
    method: 'POST',
    url: `${url}/albums/api/save-record/`,
    headers: {'X-CSRFToken': token},
    data: {
      artist: record.artist,
      title: record.title,
      year: record.year,
      owned: owned,
      thumb: record.thumb
    }
  }).then((response) => {
    dispatch(fetchUserRecords(`${host}/albums/api/records/`));
  });
};

const requestRemoveRecord = id => ({
  type: REQUEST_REMOVE_RECORD
});
const successRemoveRecord = () => ({
  type: SUCCESS_REMOVE_RECORD
});
export const removeRecord = (url, token, id) => dispatch => {
  dispatch(requestRemoveRecord(id));
  axios({
    method: 'DELETE',
    url: `${url}/albums/api/delete-record/`,
    headers: {'X-CSRFToken': token},
    data: {'record_id': id}
  }).then((response) => {
    dispatch(fetchUserRecords(`${url}/albums/api/records/`));
  });
};

