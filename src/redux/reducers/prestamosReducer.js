import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("prestamos");

export const createPrestamo = (body) =>
  reducer.post({
    body,
    loadingMessage: "Cargando prestamo...",
    errorMessage: "Error al cargar prestamo",
  });

export const clearPrestamoState = () => reducer.clearState();

export default reducer.reducer;
