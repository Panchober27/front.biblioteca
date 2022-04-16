/**
 * Realiza la creación de tipos de acciones para reducers
 * @param {string} module nombre de modulo del reducer
 * @param {string} type tipo de acción a nombrar
 * @returns {string}
 */
const makeAcctionType = (module) => (type) => `${module}/${type}`;

/**
 * Realiza la creación de acciones a utilizar en reducers
 * @param {string} type tipo de acción
 * @param  {...string} argsNames nombre de propiedades devueltas por acción
 * @returns {function} función para utilizar como action de reducer
 */
const makeActionCreator =
  (type, ...argsNames) =>
  (...args) => {
    const action = { type };

    argsNames.forEach((x, i) => {
      action[argsNames[i]] = args[i];
    });

    return action;
  };

/**
 * Permite la creación de reducer según modulo
 * @param {object} initialState estado inicial del reducer
 * @param {object} handlers objeto que contiene las funciones a ejecutar en reducer
 * @returns
 */
const makeReducer =
  (initialState, handlers) =>
  (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

export { makeActionCreator, makeAcctionType, makeReducer };
