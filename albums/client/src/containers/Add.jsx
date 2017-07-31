import React from 'react';
import { connect } from 'react-redux';
import { saveRecord } from '../actions/';
import AddRecord from '../components/AddRecord.jsx';

const mapStateToProps = (state) => ({
  host: state.auth.host,
  token: state.auth.token,
  filter: state.setFilterView.filter
});

const mapDispatchToProps = (dispatch) => ({
  saveRecord: (host, token, record, owned) => {
      dispatch(saveRecord(host, token, record, owned))
    }
});

const Add = connect(mapStateToProps, mapDispatchToProps)(AddRecord);

export default Add;
