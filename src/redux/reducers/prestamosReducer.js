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

export const clearPrestamosState = () => reducer.clearState();

export default reducer.reducer;
