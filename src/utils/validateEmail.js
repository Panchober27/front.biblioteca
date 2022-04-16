/**
 * @function validateEmail
 * @description Valida una dirección de correo
 * @param {string} email - email a validar
 * @returns {boolean} - True si es email valido, false si no lo es
 */
const validateEmail = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export default validateEmail;
