import React from 'react';
import { connect } from 'react-redux';
import { removeRecord, saveRecord } from '../actions/';
import Button from '../components/Button.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    view: state.setFilterView.filter,
    record: ownProps.record,
    token: state.auth.token,
    host: state.auth.host
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveRecord: (host, token, record, owned) => {
      dispatch(saveRecord(host, token, record, owned))
    },
    removeRecord: (host, token, id) => {
      dispatch(removeRecord(host, token,id));
    }
  };
};

const ButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Button);

export default ButtonContainer;
