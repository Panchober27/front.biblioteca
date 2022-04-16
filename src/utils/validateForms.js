/**
 * Valida campos requeridos en formulario
 * @param {string[]} requiredValues
 * @param {object} values
 * @returns {boolean}
 */
const validateForm = (requiredValues, values) => {
  const result = requiredValues.map((x) => {
    const val = values[x];

    if (Array.isArray(val)) {
      return Boolean(val.length);
    }

    return Boolean(val);
  });

  return !result.includes(false);
};

export default validateForm;
