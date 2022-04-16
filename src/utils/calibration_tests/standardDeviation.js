/**
 * Realiza cálculo de desviacion standar según datos.
 * @param {number[]} data
 */
const standardDeviation = (data) => {
  let media = 0;
  let varia = 0;

  data.forEach((x) => {
    media += x;
  });

  media = media / data.length;

  data.forEach((x) => {
    varia += Math.pow(x - media, 2);
  });

  const result = Math.sqrt(varia / (data.length - 1));

  return result;
};

export { standardDeviation };
