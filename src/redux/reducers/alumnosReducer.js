import fetchReducer from "./fetchReducer";

const reducer = fetchReducer("students");

/***
 * Prestammos del usuarios loggeado.
 */
export const getAlumnos = (params) =>
  reducer.get({
    params,
    loadingMessage: "Cargando Alumnos...",
    // successMessage: "Ejemplares cargados correctamente",
    errorMessage: "Error al cargar alumnos",
  });


  // export const getClient =
  // ({ division_id, cliente_activo = undefined, cliente_nombre = undefined }) =>
  // async (dispatch) => {
  //   dispatch(onStartLoadClients());
  //   try {
  //     const { data, status } = await api.get('/clients', {
  //       params: { division_id, cliente_activo, cliente_nombre },
  //     });

  //     if (status === 204) {
  //       dispatch(
  //         onErrorLoadClients(
  //           'No se encontraron clientes para división seleccionada'
  //         )
  //       );
  //     }

  //     dispatch(onSuccessLoadClients(data));
  //   } catch (e) {
  //     console.error(e);

  //     dispatch(onErrorLoadClients('Ocurrio un error al obtener clientes...'));
  //   }
  // };

export const clearAlumnosState = () => reducer.clearState();

export default reducer.reducer;
