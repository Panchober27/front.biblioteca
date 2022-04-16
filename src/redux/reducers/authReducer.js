import { api } from '../../utils';
import {
  ON_SIGNIN_START,
  ON_SIGNIN_SUCCESS,
  ON_SIGNIN_ERROR,
  ON_SIGNOUT_START,
  ON_SIGNOUT_SUCCESS,
  ON_SIGNOUT_ERROR,
  onSigninStart,
  onSigninError,
  onSigninSuccess,
  onSignoutStart,
  onSignoutSuccess,
  onSignoutError,
} from '../actions/authActions';

const initialState = {
  onSigninStart: false,
  onSignoutStart: false,
  token: null,
  error: null,
};

export const signin =
  ({ userName, password }) =>
  async (dispatch) => {
    dispatch(onSigninStart());

    try {
      const { status, data } = await api.post('/signin', {
        userName,
        password,
      });

      if (status === 500) {
        throw new Error(data.error);
      }

      if (status === 200) {
        localStorage.setItem('token', data.token);

        dispatch(onSigninSuccess(data.token));
      }
    } catch (e) {
      const { response } = e;

      console.error(e);

      if (response) {
        if (response.status === 403 || response.status === 400) {
          dispatch(onSigninError('Error con usuario o contraseña'));

          return;
        }

        if (response.status === 500) {
          dispatch(onSigninError(response.data.error));

          return;
        }
      }

      dispatch(onSigninError('Ocurrió un error al iniciar sesión'));
    }
  };

export const signout = () => (dispatch) => {
  dispatch(onSignoutStart());

  try {
    localStorage.removeItem('token');

    setTimeout(() => dispatch(onSignoutSuccess()), 1000);
  } catch (e) {
    console.error(e);

    dispatch(onSignoutError(e.message));
  }
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ON_SIGNIN_START:
      return { ...state, onSigninStart: true, error: null };

    case ON_SIGNIN_SUCCESS:
      return { ...state, onSigninStart: false, token: payload };

    case ON_SIGNIN_ERROR:
      return { ...state, onSigninStart: false, error: payload };

    case ON_SIGNOUT_START:
      return { ...state, onSignoutStart: true };

    case ON_SIGNOUT_SUCCESS:
      return initialState;

    case ON_SIGNOUT_ERROR:
      return { ...state, onSignoutStart: false, error: payload };

    default:
      return state;
  }
};

export default authReducer;
