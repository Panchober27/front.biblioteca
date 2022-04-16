import fetchReducer from './fetchReducer';

const reducer = fetchReducer('permissions');

export const getPermissions = () =>
  reducer.get({
    loadingMessage: 'Cargando listado de permisos...',
    errorMessage: 'Ocurrio un error al obtener listado de permisos...',
    errorNotFoundMessage: 'No se encuentran permisos para mostrar...',
  });

export const addNewPermission = (body) =>
  reducer.post({
    loadingMessage: 'Creando nuevo permiso...',
    errorMessage: 'Ocurrio un error al crear nuevo permiso...',
    body,
  });

export const updatePermission = ({ permiso_id, body }) =>
  reducer.put({
    id: permiso_id,
    body,
    loadingMessage: 'Actualizando permiso...',
    errorMessage: 'Ocurrion un error al actualizar permiso seleccionado...',
  });

export const clearPermissionsState = () => reducer.clearState();

export default reducer.reducer;
