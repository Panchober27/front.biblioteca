export const ON_START_LOAD_USERS = "ON_START_LOAD_USERS";
export const ON_SUCCESS_LOAD_USERS = "ON_SUCCESS_LOAD_USERS";
export const ON_ERROR_LOAD_USERS = "ON_ERROR_LOAD_USERS";
export const ON_CLEAR_USERS_STATE = "ON_CLEAR_USERS_STATE";
export const ON_START_GET_PERMISSIONS = "ON_START_GET_PERMISSIONS";
export const ON_SUCCESS_GET_PERMISSIONS = "ON_SUCCESS_GET_PERMISSIONS";
export const ON_ERROR_GET_PERMISSIONS = "ON_ERROR_GET_PERMISSIONS";

export const ON_START_SAVE_USER = "ON_START_SAVE_USER";
export const ON_SUCCESS_SAVE_USER = "ON_SUCCESS_SAVE_USER";
export const ON_ERROR_SAVE_USER = "ON_ERROR_SAVE_USER";

export const ON_START_GET_USER_PROFILES = "ON_START_GET_USER_PROFILES";
export const ON_SUCCESS_GET_USER_PROFILES = "ON_SUCCESS_GET_USER_PROFILES";
export const ON_ERROR_GET_USER_PROFILES = "ON_ERROR_GET_USER_PROFILES";


export const ON_START_UPDATE_USER = "ON_START_UPDATE_USER";
export const ON_SUCCESS_UPDATE_USER = "ON_SUCCESS_UPDATE_USER";
export const ON_ERROR_UPDATE_USER = "ON_ERROR_UPDATE_USER";

export const ON_CLEAR_USERSLIST = "ON_CLEAR_USERSLIST";



// para guardar usuario en bd
export const onStartSaveUser = () => ({ type: ON_START_SAVE_USER });

export const onSuccessSaveUser = (payload) => ({
  type: ON_SUCCESS_SAVE_USER,
  payload,
});

export const onErrorSaveUser = (payload) => ({
  type: ON_ERROR_SAVE_USER,
  payload,
});

export const onStartLoadUsers = () => ({ type: ON_START_LOAD_USERS });

export const onSuccessLoadUsers = (payload) => ({
  type: ON_SUCCESS_LOAD_USERS,
  payload,
});

export const onErrorLoadUsers = (payload) => ({
  type: ON_ERROR_LOAD_USERS,
  payload,
});

export const onStartGetPermissions = () => ({ type: ON_START_GET_PERMISSIONS });

export const onSuccessGetPermissions = (payload) => ({
  type: ON_SUCCESS_GET_PERMISSIONS,
  payload,
});

export const onErrorGetPermissions = (payload) => ({
  type: ON_ERROR_GET_PERMISSIONS,
  payload,
});

export const onStartGetUserProfiles = () => ({
  type: ON_START_GET_USER_PROFILES,
});

export const onSuccessGetUserProfiles = (payload) => ({
  type: ON_SUCCESS_GET_USER_PROFILES,
  payload,
});

export const onErrorGetUserProfiles = (payload) => ({
  type: ON_ERROR_GET_USER_PROFILES,
  payload,
});


export const onStartUpdateUser = () => ({ type: ON_START_UPDATE_USER });

export const onSuccessUpdateUser = (payload) => ({
  type: ON_SUCCESS_UPDATE_USER,
  payload,
});

export const onErrorUpdateUser = (payload) => ({
  type: ON_ERROR_UPDATE_USER,
  payload,
});



export const onClearUsersState = () => ({ type: ON_CLEAR_USERS_STATE });


export const onClearUsersList = () => ({ type: ON_CLEAR_USERSLIST });