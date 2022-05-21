import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { message } from 'antd';
import jwt from 'jsonwebtoken';
import MainWrapper from '../MainWrapper';
import { getUserPermissions } from '../../../redux/reducers/usersReducer';
import { hasPermission } from '../../../utils/userPermissions';
import {
  LogIn,
  Layout,
  HomePage,
  Rankings,
  Prestamos,
  CreateEditPrestamo,
} from '../../index';

/**
 * Verifica estado actual de la sesión de usuario por token,
 * si token no se encuantra se redirecciona a página de login. Además se valida estado del permiso
 * asignado a ruta, si usuario no contiene permisos para ingresar se redirecciona a ruta /home
 * @param {object} params
 * @param {ReactElement} params.children
 * @param {boolean} params.hasPermission
 * Componente a mostrar si autenticación es correcta
 */
const PrivateRoute = ({ children, hasPermission = true, ...rest }) => {
  const token = localStorage.getItem('token');

  if (token) {
    const valid = jwt.verify(
      token,
      process.env.REACT_APP_JWT_SECRET,
      (err, decoded) => (err ? false : true)
    );

    return (
      <Route
        {...rest}
        render={({ location }) => {
          if (valid) {
            if (!hasPermission) {
              return (
                <Redirect
                  to={{ pathname: '/home', state: { from: location } }}
                />
              );
            }

            return children;
          } else {
            localStorage.removeItem('token');

            return (
              <Redirect to={{ pathname: '/', state: { from: location } }} />
            );
          }
        }}
      />
    );
  } else {
    return <Redirect to='/' />;
  }
};

const Router = ({ users, getUserPermissions }) => {
  const [isIdle, setIsIdle] = useState(false);

  const {
    userPermissions,
    onStartGetUserPermissions,
    onErrorGetUserPermissions,
  } = users;

  const { pathname } = useLocation();

  // const expiredTimeSession =
  //   process.env.REACT_APP_EXPIRED_TIME_SESSION || 1000 * 60 * 60;

  useEffect(() => {
    if (pathname !== '/' && !userPermissions) {
      const token = localStorage.getItem('token');

      if (token) {
        getUserPermissions();
      }
    }
  }, [pathname, userPermissions]);

  useEffect(() => {
    const MySwal = withReactContent(Swal);

    if (onStartGetUserPermissions) {
      MySwal.fire({
        title: 'Obteniendo permisos de usuario',
      });

      MySwal.showLoading();
    } else {
      if (MySwal.isVisible) {
        setTimeout(() => MySwal.close(), 1500);
      }
    }
  }, [onStartGetUserPermissions]);

  useEffect(() => {
    if (onErrorGetUserPermissions) {
      message.error(onErrorGetUserPermissions, 2.5);
    }
  }, [onErrorGetUserPermissions]);

  useEffect(() => {
    if (isIdle) {
      localStorage.removeItem('token');

      const MySwal = withReactContent(Swal);

      MySwal.fire({
        title: 'Sesion expirada',
        text: 'su sesión expiró por inactividad, debe volver a iniciar sesión para continuar',
        icon: 'warning',
        confirmButtonColor: '#212830',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.reload();
        }
      });
    }
  }, [isIdle]);

  const handleOnIdle = (e) => {
    setIsIdle(true);
  };

  return (
    <MainWrapper>
      <main>
        {pathname !== '/' ? (
          <div>
            {/* <IdleTimer
              timeout={parseInt(expiredTimeSession)}
              onIdle={handleOnIdle}
              stopOnIdle={true}
            /> */}

            <Layout showLayout={true} />
          </div>
        ) : null}

        <Switch>
          <Route exact path='/' component={LogIn} />
          <div className='app-container'>
   
            <PrivateRoute exact path='/home'>
              <HomePage />
            </PrivateRoute>

            <PrivateRoute exact path='/prestamos'>
              <Prestamos />
            </PrivateRoute>

            {/* ruta para crear/editar un prestamo. */}
            <PrivateRoute exact path='/cePrestamo'>
              <CreateEditPrestamo />
            </PrivateRoute>

            <PrivateRoute
              exact
              path='/rankings'
              // hasPermission={hasPermission(
              //   'ver-listado-calibraciones',  // CAMBIAR POR LA LOGICA PARA LA BIBLIOTECA!
              //   userPermissions
              // )}
            >
              <Rankings />
            </PrivateRoute>

          </div>
        </Switch>
      </main>
    </MainWrapper>
  );
};

Router.propTypes = {
  users: PropTypes.object.isRequired,
  getUserPermissions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({ users });

const mapDispatchToProps = (dispatch) => ({
  getUserPermissions: () => dispatch(getUserPermissions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
