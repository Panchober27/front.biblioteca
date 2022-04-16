import { standardDeviation } from './standardDeviation';

/**
 * Realiza cálculo para error máximo permitido en test
 * @param {object} param0
 * @param {number} param0.e
 * @param {number} param0.testCharge
 * @param {'I'|'II'|'III'|'IIII'} param0.OIMLClass
 * @param {"ECCENTRICITY" | "REPEATABILITY" | "LINEARITY"} param0.type
 * @param {object} param0.test
 * @returns {{result:number, type:"ECCENTRICITY" | "REPEATABILITY" | "LINEARITY", test:object}} resultado de calculo según clase OIML
 */
export const startTest = ({ e, testCharge, OIMLClass, type, test = {} }) => {
  let result = 0;

  if (e > 0) {
    const chargeE = testCharge / e;

    const OIMLClassOperations = {
      I: () => {
        if (chargeE > 200000) {
          return e * 3;
        } else if (chargeE > 50000) {
          return e * 2;
        }

        return e;
      },
      II: () => {
        if (chargeE > 20001) {
          return e * 3;
        } else if (chargeE > 5001) {
          return e * 2;
        } else {
          return e;
        }
      },
      III: () => {
        if (chargeE > 2000) {
          return e * 3;
        } else if (chargeE > 500) {
          return e * 2;
        } else {
          return e;
        }
      },
      IIII: () => {
        if (chargeE > 200) {
          return e * 3;
        } else if (chargeE > 50) {
          return e * 2;
        } else {
          return e;
        }
      },
    };

    if (OIMLClassOperations.hasOwnProperty(OIMLClass)) {
      result = OIMLClassOperations[OIMLClass]();
    }
  }

  return { result, type, test };
};

/**
 * Verifica estado de cumplimiento para test de excentricidad
 * @param {object} param0
 * @param {object[]} param0.testData
 * @param {number} param0.maxAllowError
 */
export const runEccentricityTest = ({
  testData,
  maxAllowError,
  decimals = 10,
}) => {
  let maxValue = 0;
  let minValue = 0;

  const endReadings = [];

  testData.forEach((data) => {
    const { lectura_final } = data;

    endReadings.push(Number(lectura_final));
  });

  maxValue = Math.max(...endReadings);
  minValue = Math.min(...endReadings);

  const diff = Math.abs(maxValue - minValue);

  return {
    estado: diff <= maxAllowError,
    eccentricityDiff: diff.toFixed(decimals),
    errorMaximoPermitido: maxAllowError,
  };
};

/**
 * Valida estado de test de repetibilidad para carga ingresada
 * @param {object} param0
 * @param {object} param0.testData
 * @param {number} param0.maxAllowError
 */
export const runRepeatabilityTest = ({
  testData,
  maxAllowError,
  decimals = 10,
}) => {
  const { carga_nominal, lecturas = [] } = testData;

  maxAllowError = Math.abs(maxAllowError);

  let status = true;

  const values = [];

  lecturas.forEach((lectura, i) => {
    let { valor } = lectura;

    valor = Number(valor);

    values.push(valor);

    lecturas[i]['errorBalanza'] = valor - carga_nominal;
  });

  let standardDeviationValue = standardDeviation(values);

  lecturas.forEach((lectura, i) => {
    let { errorBalanza } = lectura;

    errorBalanza = Math.abs(errorBalanza).toFixed(decimals);

    const testStatus = errorBalanza <= maxAllowError;

    lecturas[i]['estado'] = testStatus;

    if (!testStatus) {
      status = false;
    }
  });

  return {
    estado: status,
    errorMaximoPermitido: Number(maxAllowError).toFixed(decimals),
    desEstandar: Number(standardDeviationValue).toFixed(decimals),
  };
};

/**
 * Valida estado de test de linealidad
 * @param {object} param0
 * @param {object} param0.testData
 * @param {number} param0.maxAllowError
 * @param {string[]} param0.serialCode
 * @param {object[]} param0.repeatabilityTest
 * @param {number} param0.d
 * @param {number} param0.eccentricityDiff
 */
export const runLinearityTest = ({
  testData,
  maxAllowError,
  serialCode,
  repeatabilityTest,
  d,
  eccentricityDiff,
  unit,
  decimals = 10,
}) => {
  const massType = serialCode[0]['set_masa_clase_oiml'] || '';

  let { carga_de_ensayo = 0, lectura_final = 0 } = testData;

  carga_de_ensayo = Number(carga_de_ensayo);
  lectura_final = Number(lectura_final);

  let errorScale = 0;
  let uS = [];
  let usSum = 0;
  let uM = 0;
  let uR = d / 2 / 1.732;
  let uMFinal = 0;
  let uE = eccentricityDiff / (2 * 1.732);
  let uC = 0;

  if (lectura_final > 0 && carga_de_ensayo > 0) {
    errorScale = Number((lectura_final - carga_de_ensayo).toFixed(decimals));
  }

  const massTypeOperations = {
    E1: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (0.5 * carga_de_ensayo) / 1000000;
      }

      if (unit === 'g') {
        return (0.01 * carga_de_ensayo) / 1000;
      }

      return 0.003 * carga_de_ensayo;
    },
    E2: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (1.6 * carga_de_ensayo) / 1000000;
      }
      if (unit === 'g') {
        return (0.03 * carga_de_ensayo) / 1000;
      }

      return 0.006 * carga_de_ensayo;
    },
    F1: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (5 * carga_de_ensayo) / 1000000;
      }

      if (unit === 'g') {
        return (0.1 * carga_de_ensayo) / 1000;
      }

      return 0.02 * carga_de_ensayo;
    },

    F2: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (16 * carga_de_ensayo) / 1000000;
      }

      if (unit === 'g') {
        return (0.3 * carga_de_ensayo) / 1000;
      }

      return 0.06 * carga_de_ensayo;
    },

    M1: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (50 * carga_de_ensayo) / 1000000;
      }

      if (unit === 'g') {
        return (1.0 * carga_de_ensayo) / 1000;
      }

      return 0.2 * carga_de_ensayo;
    },
    M2: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (160 * carga_de_ensayo) / 1000000;
      }
      return (3.0 * carga_de_ensayo) / 1000;
    },

    M3: (carga_de_ensayo) => {
      if (unit === 'kg') {
        return (500 * carga_de_ensayo) / 1000000;
      }
      return (10 * carga_de_ensayo) / 1000;
    },
  };

  uM = massTypeOperations.hasOwnProperty(massType)
    ? massTypeOperations[massType](carga_de_ensayo)
    : 0;

  uMFinal = uM / 2 / 1000;

  repeatabilityTest.tests.forEach((test) => {
    const { desEstandar, lecturas } = test;

    if (lecturas) {
      uS.push(
        Number(desEstandar / Math.sqrt(lecturas.length)).toFixed(decimals)
      );
    }
  });

  uS.forEach((x) => {
    usSum += Math.pow(x, 2);
  });

  uC =
    2 *
    Math.sqrt(usSum + Math.pow(uR, 2) + Math.pow(uMFinal, 2) + Math.pow(uE, 2));

  return {
    status: errorScale <= maxAllowError,
    errorScale: errorScale.toFixed(decimals),
    uM: Number(uM).toFixed(decimals),
    uMFinal: Number(uMFinal).toFixed(decimals),
    uS,
    uR: Number(uR).toFixed(decimals),
    uE: Number(uE).toFixed(decimals),
    uC: Number(uC).toFixed(decimals),
  };
};
