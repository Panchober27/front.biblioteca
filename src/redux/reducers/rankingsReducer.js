import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("rankings");

export const getCountLibroXMes = () =>
  reducer.get({
    loadingMessage: "Cargando datos...",
    errorMessage: "Error al cargar datos",
  });


export const clearRankingsState = () => reducer.clearState();

export default reducer.reducer;
