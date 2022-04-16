import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import { Collapse } from 'reactstrap';
import TopbarMenuLink from './TopbarMenuLink';
import { signout } from '../../../../redux/reducers/authReducer';

const TopbarProfile = ({ signout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleProfile = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className='topbar__profile'>
      <button className='topbar__avatar' type='button' onClick={toggleProfile}>
        <FaRegUserCircle className='topbar__menu_toggle' />
      </button>
      {isCollapsed && (
        <button
          className='topbar__back'
          type='button'
          aria-label='profile button'
          onClick={toggleProfile}
        />
      )}
      <Collapse isOpen={isCollapsed} className='topbar__menu-wrap'>
        <div className='topbar__menu'>
          <TopbarMenuLink
            path='#'
            title='Ir a documentación'
            icon='list'
            onClick={() => {
              window.open(
                // url de clickUp del proyecto, por ahora esto se cambiara por otra cosa.
                // process.env.REACT_APP_URL_DOC,  // original, NO usar!!!
                'https://app.clickup.com/31054294/v/l/4-49601549-1',  // clickUp por ahora.
                '_blank'
              );
            }}
          />
          <div className='topbar__menu-divider' />
          <TopbarMenuLink
            path='#'
            title='Cerrar sesión'
            icon='exit'
            onClick={() => signout()}
          />
        </div>
      </Collapse>
    </div>
  );
};

TopbarProfile.prop_types = {
  signout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signout()),
});

export default connect(null, mapDispatchToProps)(TopbarProfile);
