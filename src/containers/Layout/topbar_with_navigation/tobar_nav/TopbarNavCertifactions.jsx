import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DownIcon from 'mdi-react/ChevronDownIcon';
import {
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import TopbarNavLink from './TopbarNavLink';
import { hasPermission } from '../../../../utils/userPermissions';

const TopbarNavCertifactions = ({ users }) => {
  const { userPermissions } = users;

  return (
    <UncontrolledDropdown className='topbar__nav-dropdown'>
      <DropdownToggle className='topbar__nav-dropdown-toggle'>
        Certificados <DownIcon />
      </DropdownToggle>
      <DropdownMenu className='topbar__nav-dropdown-menu dropdown__menu'>
        {hasPermission('ir-a-listado-certificado', userPermissions) ? (
          <DropdownItem>
            <TopbarNavLink
              title='Listado certificados'
              route='/certification_list'
            />
          </DropdownItem>
        ) : null}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

TopbarNavCertifactions.propTypes = {
  users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users }) => ({ users });

export default connect(mapStateToProps)(TopbarNavCertifactions);
