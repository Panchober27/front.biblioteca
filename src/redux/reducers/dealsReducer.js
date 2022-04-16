import fetchReducer from './fetchReducer';

const reducer = fetchReducer('deals');

export const getDeals = () =>
  reducer.get({
    loadingMessage: 'Cargando listado de negocios...',
    errorMessage: 'Ocurrio un error al obtener listado de negocios...',
    errorNotFoundMessage: 'No se encuentran negocios para mostrar...',
  });

export const updateDeal = (id, body) =>
  reducer.put({
    id,
    body,
    loadingMessage: 'Actualizando negocio...',
    errorMessage: 'Ocurrió un error al actualizar negocio...',
  });

export const addNewDeal = (body) =>
  reducer.post({
    body,
    errorMessage: 'Ocurrio un error al crear nuevo negocio...',
    loadingMessage: 'Creando nuevo negocio...',
  });

export const clearDealsState = () => reducer.clearState();

export default reducer.reducer;
