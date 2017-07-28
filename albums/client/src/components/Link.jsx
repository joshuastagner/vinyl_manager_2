import React from 'react';

const Link = ({ children, onClick}) => (
  <a onClick={() => onClick()}>{children}</a>
)
export default Link;
