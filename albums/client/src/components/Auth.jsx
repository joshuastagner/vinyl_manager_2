import React from 'react';

const Auth = ({ auth }) => (
  <a href={`/${auth}`}>{auth}</a>
);

export default Auth;
