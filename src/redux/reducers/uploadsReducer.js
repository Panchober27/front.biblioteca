import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("uploads");

export const getUploads = () =>
  reducer.get({
    loadingMessage: "Cargando Uploads...",
    successMessage: "Uploads cargados correctamente",
    errorMessage: "Error al cargar Uploads",
  });

export const clearUploadsState = () => reducer.clearState();

export default reducer.reducer;
