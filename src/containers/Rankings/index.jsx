import React, { Fragment, useState, useEffect, Row, Col } from "react";
import { Collapse } from "antd";
import { UserData } from "./Data";
import { BarChart, LineChart, PieChart } from "../../components/charts";
const Rankings = () => {
  const { Panel } = Collapse;

  const [userData, setUserData] = useState({
    labels: UserData.map((user) => user.year),
    datasets: [
      {
        label: "Users Gain",
        data: UserData.map((user) => user.userGain),
        // data: UserData.map((user) => user.userLost),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      <h1>Rankings</h1>

      <Collapse defaultActiveKey={["0"]}>
        <Panel
          key="1"
          collapsible="header"
          className="certification-panel"
          header={<h4>Alumnos.</h4>}
        >
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                Probar grafico de barras sin librería. <br />
                el grafico se encuantra en este link. <br />
              </p>
            </div>
          </div>
          <br />


          <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
            <div style={{ width: "500px" }}>
              <BarChart chartData={userData} />
            </div>
            <div style={{ width: "500px" }}>
              <LineChart chartData={userData} />
            </div>
            <div style={{ width: "500px" }}>
              <PieChart chartData={userData} />
            </div>
          </div>

        </Panel>

        <Panel
          key="2"
          collapsible="header"
          className="certification-panel"
          header={<h4>Libros.</h4>}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            tempore est asperiores?
          </p>
        </Panel>
      </Collapse>
    </>
  );
};

export default Rankings;
