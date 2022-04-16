import { api } from '../../utils';
import {
  makeReducer,
  makeActionCreator,
  makeAcctionType,
} from '../../utils/reduxUtils';

const INITIAL_STATE = {
  onStartFetch: false,
  onErrorFetch: null,
  onSuccessGetFetch: false,
  onSuccessPostPutFetch: false,
  data: [],
};

/**
 * Configura reductor base para la realizacion de peticiones al servidor
 * @param {string} resource Nombre de recurso a consultar.
 * @returns
 */
const fetchReducer = (resource) => {
  const type = makeAcctionType(resource);

  const ON_START_FETCH = type('ON_START_FETCH');
  const ON_SUCCESS_FETCH = type('ON_SUCCESS_FETCH');
  const ON_SUCCESS_POST_PUT_FETCH = type('ON_SUCCESS_POST_FETCH');
  const ON_ERROR_FETCH = type('ON_ERROR_FETCH');
  const ON_CLEAR_STATE = type('ON_CLEAR_STATE');

  const onStartFetch = makeActionCreator(ON_START_FETCH, 'payload');
  const onSuccessFetch = makeActionCreator(ON_SUCCESS_FETCH, 'payload');
  const onSuccessPostPutFetch = makeActionCreator(ON_SUCCESS_POST_PUT_FETCH);
  const onClearState = makeActionCreator(ON_CLEAR_STATE);

  const onErrorFetch = makeActionCreator(ON_ERROR_FETCH, 'payload');

  /**
   * Realiza peticion de tipo GET a servidor
   * @param {{id:number|string,params:{},loadingMessage:string,errorMessage:string,errorNotFoundMessage:string}} params
   * objeto de configuración para petición al servidor
   */
  const get =
    ({
      id = null,
      params = {},
      loadingMessage = 'Cargando...',
      errorMessage = 'Ocurrió un error...',
      errorNotFoundMessage = 'No se encuentra recurso a buscar...',
    }) =>
    async (dispatch) => {
      dispatch(onStartFetch(loadingMessage));

      try {
        let response;

        if (id) {
          response = await api.get(`/${resource}/${id}`, {params: {...params}});
        } else {
          response = await api.get(`/${resource}`, {
            params: { ...params },
          });
        }

        const { status, data } = response;

        if (status === 200) {
          dispatch(onSuccessFetch(data));

          return;
        }

        if (status === 204) {
          dispatch(onErrorFetch(errorNotFoundMessage));

          return;
        }
      } catch (e) {
        console.error(e);

        dispatch(onErrorFetch(errorMessage));
      }
    };

  /**
   * Ejecuta petición de tipo POST servidor
   * @param {{loadingMessage:string, errorMessage:string, body:object}} params
   */
  const post =
    ({
      loadingMessage = 'Cargando...',
      errorMessage = 'Ocurrio un error...',
      body = {},
    }) =>
    async (dispatch) => {
      dispatch(onStartFetch(loadingMessage));

      try {
        const { status } = await api.post(`/${resource}`, { ...body });

        if (status === 200) {
          dispatch(onSuccessPostPutFetch());
        }
      } catch (e) {
        console.error(e);

        dispatch(onErrorFetch(errorMessage));
      }
    };

  /**
   * Realiza petición de tipo PUT a servidor
   * @param {{id:number, loadingMessage:string, errorMessage:string, body:object}} params
   */
  const put =
    ({
      id,
      loadingMessage = 'Cargando...',
      errorMessage = 'Ocurrio un error...',
      body = {},
    }) =>
    async (dispatch) => {
      dispatch(onStartFetch(loadingMessage));

      try {
        const { status } = await api.put(`/${resource}/${id}`, { ...body });

        if (status === 200) {
          dispatch(onSuccessPostPutFetch());
        }
      } catch (e) {
        console.error(e);

        dispatch(onErrorFetch(errorMessage));
      }
    };

  /**
   * Limpia estado de reductor y lo establece a INITIAL_STATE
   */
  const clearState = () => (dispatch) => dispatch(onClearState());

  const reducer = makeReducer(INITIAL_STATE, {
    [ON_START_FETCH]: (state, { payload }) => ({
      ...state,
      onStartFetch: true,
      onErrorFetch: null,
      onSuccessGetFetch: false,
      onSuccessPostPutFetch: false,
      loadingMessage: payload,
    }),
    [ON_SUCCESS_FETCH]: (state, { payload }) => ({
      ...state,
      onStartFetch: false,
      onSuccessGetFetch: true,
      data: payload,
    }),
    [ON_SUCCESS_POST_PUT_FETCH]: (state) => ({
      ...state,
      onStartFetch: false,
      onSuccessPostPutFetch: true,
    }),
    [ON_ERROR_FETCH]: (state, { payload }) => ({
      ...state,
      onStartFetch: false,
      onErrorFetch: payload,
    }),
    [ON_CLEAR_STATE]: () => INITIAL_STATE,
  });

  return {
    get,
    post,
    put,
    clearState,
    reducer,
  };
};

export default fetchReducer;
