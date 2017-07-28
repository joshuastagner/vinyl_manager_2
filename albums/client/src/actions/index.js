import axios from 'axios';

export const LOGGED_IN = 'LOGGED_IN';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_HOST = 'SET_HOST';
export const REQUEST_USER_RECORDS = 'REQUEST_USER_RECORDS';
export const RECEIVE_USER_RECORDS = 'RECEIVE_USER_RECORDS';
export const REQUEST_SEARCH_RECORDS = 'REQUEST_SEARCH_RECORDS';
export const RECEIVE_SEARCH_RECORDS = 'RECEIVE_SEARCH_RECORDS';
export const SAVE_RECORD = 'SAVE_RECORD';
export const REMOVE_RECORD = 'REMOVE_RECORD';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const VISIBILITY_FILTERS = {
  OWNED_RECORDS: 'OWNED_RECORDS',
  WANTED_RECORDS: 'WANTED_RECORDS',
  SEARCH_RESULT_RECORDS: 'SEARCH_RESULT_RECORDS'
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
  console.log('query', query);
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

export const saveRecord = ({ artist, title, year, owned, thumb }) => ({
  type: SAVE_RECORD,
  artist,
  title,
  year,
  owned,
  thumb
});


export const removeRecord = id => ({
  type: REMOVE_RECORD,
  id
});
