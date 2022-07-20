import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData, chartOptions }) => {
  

  // create const options and give animations to it
  const options = {
    animation: {
      duration: 1000,
      easing: "linear",
      from: 1,
    },
  };

  
  return (
    <>
      <Line data={chartData} options={options} />
    </>
  );
};

export default LineChart;
