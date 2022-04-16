import React, { useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { LoadingSpinner } from '../../../components/common';
import PasswordField from '../../../shared/components/form/Password';

const LogInForm = ({ onSubmit, fieldUser, typeFieldUser, auth }) => {
  const { onSigninStart, error, token } = auth;

  if (token) {
    return <Redirect to='/home' />;
  } else {
    return (
      <Form onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <form className='form login-form' onSubmit={handleSubmit}>
            <Alert color='danger' isOpen={!!error}>
              {error}
            </Alert>
            <div className='form__form-group'>
              <span className='form__form-group-label'>{fieldUser}</span>
              <div className='form__form-group-field'>
                <div className='form__form-group-icon'>
                  <AccountOutlineIcon />
                </div>
                <Field
                  name='userName'
                  component='input'
                  type={typeFieldUser}
                  placeholder={fieldUser}
                  className='input-without-border-radius'
                />
              </div>
            </div>
            <div className='form__form-group'>
              <span className='form__form-group-label'>Contraseña</span>
              <div className='form__form-group-field'>
                <Field
                  name='password'
                  component={PasswordField}
                  placeholder='Contraseña'
                  className='input-without-border-radius'
                  keyIcon
                />
              </div>
            </div>

            {onSigninStart ? (
              <LoadingSpinner />
            ) : (
              <div className='account__btns'>
                <button className='account__btn btn btn-primary' type='submit'>
                  Iniciar sesión
                </button>
              </div>
            )}
          </form>
        )}
      </Form>
    );
  }
};

LogInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fieldUser: PropTypes.string,
  typeFieldUser: PropTypes.string,
};

LogInForm.defaultProps = {
  fieldUser: 'Nombre de usuario',
  typeFieldUser: 'text',
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, null)(LogInForm);
