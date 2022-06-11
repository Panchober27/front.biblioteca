import { api } from "../../utils";

import {
  ON_START_LOAD_USERS,
  ON_CLEAR_USERS_STATE,
  ON_ERROR_LOAD_USERS,
  ON_SUCCESS_LOAD_USERS,
  ON_START_GET_PERMISSIONS,
  ON_SUCCESS_GET_PERMISSIONS,
  ON_ERROR_GET_PERMISSIONS,
  ON_START_SAVE_USER,
  ON_SUCCESS_SAVE_USER,
  ON_ERROR_SAVE_USER,
  ON_START_UPDATE_USER,
  ON_SUCCESS_UPDATE_USER,
  ON_ERROR_UPDATE_USER,
  ON_CLEAR_USERSLIST,
  onStartLoadUsers,
  onSuccessLoadUsers,
  onErrorLoadUsers,
  onClearUsersState,
  onStartGetPermissions,
  onSuccessGetPermissions,
  onErrorGetPermissions,
  onStartSaveUser,
  onSuccessSaveUser,
  onErrorSaveUser,
  onStartGetUserProfiles,
  onSuccessGetUserProfiles,
  onErrorGetUserProfiles,
  onStartUpdateUser,
  onSuccessUpdateUser,
  onErrorUpdateUser,
  onClearUsersList,
} from "../actions/usersActions";

const INITIAL_STATE = {
  onStartLoadUsers: false,
  onErroLoadUsers: undefined,
  onStartGetUserPermissions: false,
  onErrorGetUserPermissions: null,
  usersList: null,
  userPermissions: null,
  onStartSaveUser: false,
  onSuccessSaveUser: false,
  onErrorSaveUser: null,
  onStartGetUserProfiles: false,
  onSuccessGetUserProfiles: false,
  onErrorGetUserProfiles: null,
  onStartUpdateUser: false,
  onSuccessUpdateUser: false,
  onErrorUpdateUser: null,
};

const USERS_LIST_INITAL_STATE = {
  usersList: null,
};

export const clearUsersList = () => (dispatch) => {
  dispatch(onClearUsersList());
};

export const clearUsersState = () => (dispatch) => {
  dispatch(onClearUsersState());
};

// Funcion para guardar un usuario en bd.
// RETIORNAR SOLO EL STATUS???? YO CREO QUE SI.
export const saveUser = (user) => async (dispatch) => {
  dispatch(onStartSaveUser());
  console.log(user);
  try {
    const { status } = await api.post("/users", user);
    if (status === 200) {
      dispatch(onSuccessSaveUser(status));
    }
  } catch (err) {
    console.log(err);
    dispatch(
      onErrorSaveUser(
        "Ocurrió un error al guardar el usuario, intente nuevamente."
      )
    );
  }
};

export const getUsers = (neededPerm) => async (dispatch) => {
  dispatch(onStartLoadUsers());

  try {
    // enviar por params el permiso que se necesita!
    const { status, data } = await api.get("/users", {
      params: { permiso: neededPerm },
    });

    if (status === 204) {
      dispatch(onErrorLoadUsers("No se encuentran usuarios a buscar..."));
    } else if (status === 200) {
      const usersList = data;

      usersList.forEach((user) => {
        let fullName = user.nombre + " " + user.apellido;
        let userActive = user.userActive;

        user.fullName = fullName;
        user.userActive = userActive;
      });
      console.log(usersList);
      dispatch(onSuccessLoadUsers(usersList));
    }
  } catch (err) {
    console.error(err);
    dispatch(onErrorLoadUsers("Ocurrio un error al obtener usuarios"));
  }
};

export const updateUser =
  ({
    usuario_id,
    usuario,
    nombre,
    apellido,
    password,
    usuario_mail,
    userType,
    userActive,
    profileId,
    // usuario_firma,
  }) =>
  async (dispatch) => {
    dispatch(onStartUpdateUser());
    console.log("User update started");
    try {
      const { status } = await api.put(`/users/${usuario_id}`, {
        usuario,
        nombre,
        apellido,
        password,
        usuario_mail,
        userType,
        userActive,
        // profileId,
        // usuario_firma,
      });

      if (status === 200) {
        dispatch(onSuccessUpdateUser(status));
      }
    } catch (err) {
      console.log(err);
      dispatch(onErrorUpdateUser("Ocurrió un error al actualizar usuario"));
    }
  };

export const getUserPermissions = () => async (dispatch) => {
  dispatch(onStartGetPermissions());
  try {
    const { data, status } = await api.get("/userPermissions");

    if (status === 200) {
      dispatch(onSuccessGetPermissions(data));
    }
  } catch (e) {
    console.error(e);

    dispatch(
      onErrorGetPermissions("Ocurrio un error al obterner permisos de usuario")
    );
  }
};

export const getUserProfiles = (user_id) => async (dispatch) => {
  dispatch(onStartGetUserProfiles());

  try {
    const { data, status } = await api.get("/profiles-user", {
      params: { usuario_id: user_id },
    });

    if (status === 200) {
      dispatch(onSuccessGetUserProfiles(data));
    }
  } catch (err) {
    console.error(err);
    dispatch(
      onErrorGetUserProfiles("Ocurrio un error al obtener perfiles de usuario")
    );
  }
};

const usersReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ON_START_LOAD_USERS:
      return {
        ...state,
        onStartLoadUsers: true,
        onErroLoadUsers: undefined,
      };

    case ON_SUCCESS_LOAD_USERS:
      return { ...state, onStartLoadUsers: false, usersList: payload };

    case ON_ERROR_LOAD_USERS:
      return {
        ...state,
        onStartLoadUsers: false,
        onErroLoadUsers: payload,
      };

    case ON_CLEAR_USERS_STATE:
      return INITIAL_STATE;

    case ON_CLEAR_USERSLIST:
      return { ...state, usersList: null };

    case ON_START_GET_PERMISSIONS:
      return {
        ...state,
        onStartGetUserPermissions: true,
        onErrorGetUserPermissions: null,
      };

    case ON_SUCCESS_GET_PERMISSIONS:
      return {
        ...state,
        onStartGetUserPermissions: false,
        userPermissions: payload,
      };

    case ON_ERROR_GET_PERMISSIONS:
      return {
        ...state,
        onErrorGetUserPermissions: payload,
        onStartGetUserPermissions: false,
      };

    case ON_START_SAVE_USER:
      return {
        ...state,
        onStartSaveUser: true,
        onErrorSaveUser: null,
        onSuccessSaveUser: null,
      };

    case ON_SUCCESS_SAVE_USER:
      return {
        ...state,
        onStartSaveUser: false,
        onErrorSaveUser: null,
        onSuccessSaveUser: payload,
      };

    case ON_ERROR_SAVE_USER:
      return {
        ...state,
        onStartSaveUser: false,
        onErrorSaveUser: payload,
        onSuccessSaveUser: null,
      };

    case ON_START_UPDATE_USER:
      return {
        ...state,
        onStartUpdateUser: true,
        onErrorUpdateUser: undefined,
        onSuccessUpdateUser: false,
      };

    case ON_SUCCESS_UPDATE_USER:
      return {
        ...state,
        onStartUpdateUser: false,
        onErrorUpdateUser: undefined,
        onSuccessUpdateUser: payload,
      };

    case ON_ERROR_UPDATE_USER:
      return {
        ...state,
        onStartUpdateUser: false,
        onErrorUpdateUser: payload,
        onSuccessUpdateUser: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
