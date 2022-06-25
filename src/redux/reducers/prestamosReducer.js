import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("user-prestamos");

/***
 * Prestammos del usuarios loggeado.
 */
export const getPrestamosOfLoggedUser = () =>
  reducer.get({
    loadingMessage: "Cargando prestamos...",
    successMessage: "Prestamos cargados correctamente",
    errorMessage: "Error al cargar prestamos",
  });

// funcion de reducer con post y pasar data en el body.
const reducerV2 = fetchReducer("prestamos");

export const createPrestamo = (body) =>
  reducerV2.post({
    body,
    loadingMessage: "Cargando prestamo...",
    errorMessage: "Error al cargar prestamo",
  });

export const clearPrestamosState = () => reducer.clearState();
export const clearPrestamoV2State = () => reducerV2.clearState();

export default reducer.reducer;
