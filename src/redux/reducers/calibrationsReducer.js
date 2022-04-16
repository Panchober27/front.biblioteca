import fetchReducer from './fetchReducer';

const reducer = fetchReducer('calibrations');

export const getCalibrations = () =>
  reducer.get({
    errorMessage: 'Ocurrio un error al obtener calibraciones...',
    errorNotFoundMessage: 'No se encuentran calibraciones para listar...',
    loadingMessage: 'Cargando calibraciones...',
  });

export const addNewCalibration = (body) =>
  reducer.post({
    body,
    loadingMessage: 'Creando nueva calibración...',
    errorMessage: 'Ocurrio un error al crear nueva calibración...',
  });

export const updateCalibration = (id, body) =>
  reducer.put({
    id,
    body,
    loadingMessage: 'Actualizando calibración...',
    errorMessage: 'Ocurrió un error al actualizar calibración',
  });

export const clearCalibrationsState = () => reducer.clearState();

export default reducer.reducer;
