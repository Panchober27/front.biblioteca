import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TopbarMenuLinks = ({ title, icon, path, onClick }) => (
  <div className='topbar__link' onClick={onClick}>
    <span className={`topbar__link-icon lnr lnr-${icon}`} />
    <p className='topbar__link-title'>{title}</p>
  </div>
);

TopbarMenuLinks.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TopbarMenuLinks;
