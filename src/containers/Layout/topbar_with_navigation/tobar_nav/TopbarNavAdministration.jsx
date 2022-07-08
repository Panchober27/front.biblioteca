import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hasPermission } from '../../../../utils/userPermissions';
import DownIcon from 'mdi-react/ChevronDownIcon';
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import TopbarNavLink from './TopbarNavLink';
import { clearPermissionsState } from '../../../../redux/reducers/permissionsReducer';

const TopbarNavAdministration = ({ users, clearPermissionsState }) => {
  const { userPermissions } = users;

  return (
    <UncontrolledDropdown className='topbar__nav-dropdown'>
      <DropdownToggle className='topbar__nav-dropdown-toggle'>
        Menu Deslpegable
        <DownIcon />
      </DropdownToggle>
      <DropdownMenu className='topbar__nav-dropdown-menu dropdown__menu'>
      
      <DropdownItem>
        <TopbarNavLink title='Prestar Libros' route='/prestamos' />
      </DropdownItem>
      
      <DropdownItem>
        <TopbarNavLink title='Devolver Ejemplares' route='/rankings' />
      </DropdownItem>
        
      <DropdownItem>
        <TopbarNavLink title='Rankings' route='/rankings' />
      </DropdownItem>

        {/* {hasPermission('ver-listado-calibraciones', userPermissions) ? (
          <DropdownItem>
            <TopbarNavLink title='Calibraciones' route='/calibrations' />
          </DropdownItem>
        ) : null} */}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

TopbarNavAdministration.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = (dispatch) => ({
  clearPermissionsState: () => dispatch(clearPermissionsState()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopbarNavAdministration);
