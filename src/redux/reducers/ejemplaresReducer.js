import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("ejemplares");

/***
 * Prestammos del usuarios loggeado.
 */
export const getEjemplares = () =>
  reducer.get({
    loadingMessage: "Cargando Ejemplares...",
    successMessage: "Ejemplares cargados correctamente",
    errorMessage: "Error al cargar ejemplares",
  });

export const clearEjemplaresState = () => reducer.clearState();

export default reducer.reducer;
