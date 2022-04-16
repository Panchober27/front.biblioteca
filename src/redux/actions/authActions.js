export const ON_SIGNIN_START = 'ON_START_SIGNIN';
export const ON_SIGNIN_SUCCESS = 'ON_SIGNIN_SUCCESS';
export const ON_SIGNIN_ERROR = 'ON_SIGNIN_ERROR';
export const ON_SIGNOUT_START = 'ON_SIGNOUT_START';
export const ON_SIGNOUT_SUCCESS = 'ON_SIGNOUT_SUCCESS';
export const ON_SIGNOUT_ERROR = 'ON_SIGNOUT_ERROR';

export const onSigninStart = () => ({
  type: ON_SIGNIN_START,
});

export const onSigninSuccess = (payload) => ({
  type: ON_SIGNIN_SUCCESS,
  payload,
});

export const onSigninError = (payload) => ({
  type: ON_SIGNIN_ERROR,
  payload,
});

export const onSignoutStart = () => ({ type: ON_SIGNOUT_START });

export const onSignoutSuccess = () => ({ type: ON_SIGNOUT_SUCCESS });

export const onSignoutError = (payload) => ({
  type: ON_SIGNOUT_ERROR,
  payload,
});
