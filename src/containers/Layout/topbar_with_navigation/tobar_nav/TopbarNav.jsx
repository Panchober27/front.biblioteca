import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopbarNavAdministration from './TopbarNavAdministration';
import { hasPermission } from '../../../../utils/userPermissions';

import TopNavRankings from './TopNavRankings';

const TopbarNav = ({ users }) => {
  const { userPermissions } = users;

  return (
    <nav className='topbar__nav'>

      {/* 
          Con DropDown
      */}

      {/* {hasPermission('ver-opciones-menu-administración', userPermissions) ? ( */}
        <TopbarNavAdministration />
       {/* ) : null} */}

      <TopNavRankings />
      <TopNavRankings />  

    </nav>
  );
};

TopbarNav.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(TopbarNav);
