import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TopbarWithNavigation from './topbar_with_navigation/TopbarWithNavigation';
import { clearUsersState } from '../../redux/reducers/usersReducer';

const Layout = ({ auth, showLayout = false, clearUsersState }) => {
  const [closeSession, setCloseSession] = useState(false);

  const { onSignoutStart } = auth;
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    if (onSignoutStart) {
      MySwal.fire({
        title: 'Cerrando sesión',
      });

      MySwal.showLoading();
    } else {
      if (MySwal.isVisible()) {
        const token = localStorage.getItem('token');

        if (!token) {
          MySwal.close();

          clearUsersState();
          setCloseSession(true);
        }
      }
    }
  }, [onSignoutStart]);

  if (closeSession || !showLayout) {
    return <Redirect to='/' />;
  } else {
    return (
      <div className='layout'>
        <TopbarWithNavigation />
      </div>
    );
  }
};

Layout.propTypes = {
  auth: PropTypes.object.isRequired,
  clearUsersState: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = (dispatch) => ({
  clearUsersState: () => dispatch(clearUsersState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
