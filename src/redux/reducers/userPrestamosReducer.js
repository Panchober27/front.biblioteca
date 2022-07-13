// este reductor es para pedir el listado de prestamos por usuario loggeado.!
import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("user-prestamos");


// prestamos del usuario logeado.
export const getPrestamosOfLoggedUser = () =>
  reducer.get({
    loadingMessage: "Cargando prestamos...",
    successMessage: "Prestamos cargados correctamente",
    errorMessage: "Error al cargar prestamos",
  });


export const clearUserPrestamosState = () => reducer.clearState();


export default reducer.reducer;
