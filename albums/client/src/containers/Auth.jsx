import React from 'react';
import { connect } from 'react-redux';
import Auth from '../components/Auth.jsx';

const mapStateToProps = ({auth}) => {
  if (auth.loggedIn) {
    return {auth: 'logout'};
  }
  return {auth: 'login'};
}

const Authed = connect(mapStateToProps)(Auth);

export default Authed;
