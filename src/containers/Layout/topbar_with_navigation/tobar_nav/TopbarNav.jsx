import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TopbarNavAdministration from './TopbarNavAdministration';
import { hasPermission } from '../../../../utils/userPermissions';
import TopNavPrestamos from './TopNavPrestamos';
import TopNavRankings from './TopNavRankings';
import TopNavBooks from './TopNavBooks';
import TopNavAlumnos from './TopNavAlumnos';
import TopNavUsuarios from './TopNavUsuarios';

const TopbarNav = ({ users }) => {
  const { userPermissions } = users;

  return (
    <nav className='topbar__nav'>
      {/* {hasPermission('ver-opciones-menu-administración', userPermissions) ? ( */}
      <TopbarNavAdministration />
      {/* ) : null} */}
      <TopNavPrestamos />

      <TopNavBooks />

      {/* <TopNavAlumnos /> */}

      {/* Usuarios. */}
      <TopNavUsuarios />

      <TopNavRankings />
    </nav>
  );
};

TopbarNav.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(TopbarNav);
