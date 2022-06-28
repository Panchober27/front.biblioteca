import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("students");

/***
 * Prestammos del usuarios loggeado.
 */
export const getAlumnos = (params) =>
reducer.get({
  params,
  loadingMessage: "Cargando Alumnos...",
  errorMessage: "Error al cargar alumnos",
});


export const clearAlumnosState = () => reducer.clearState();

export default reducer.reducer;
