import React, { Fragment, useState, useEffect, Row, Col } from "react";
import { Collapse, Tabs, Button } from "antd";
import { UserData } from "./Data";
import { carrerasData } from "./carrerasData";
import { BarChart, LineChart, PieChart } from "../../components/charts";
import { InputField, DatePickerField } from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const Rankings = () => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;

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

  // constante para la data del grafico delas carreras.
  const [carrData, setCarrData] = useState({
    labels: carrerasData.map((carrera) => carrera.name),
    datasets: [
      {
        label: "Ranking Atrasos Carreras",
        data: carrerasData.map((carrera) => carrera.atrasos),
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // opciones para el grafico!
  const options = {
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    scales: {
      y: {
        // defining min and max so hiding the dataset does not change scale range
        min: 0,
        max: 25,
      },
    },
  };

  return (
    <>
      <h1>Rankings</h1>

      {/* <Collapse defaultActiveKey={["0"]}>
        <Panel
          key="1"
          collapsible="header"
          className="certification-panel"
          header={<h4>Alumnos.</h4>}
        >
          <div className="card">
            <div
              className="card-body"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div>
                <div className="form-group">
                  <InputField
                    label="Alumno"
                    name="alumno"
                    type="text"
                    placeholder="Ingrese el nombre del alumno"
                    onChange={(e) => {}}
                  />

                  <DatePickerField
                    label="Fecha"
                    name="fecha"
                    placeholder="Desde"
                    onChange={(e) => {}}
                  />
                  <DatePickerField
                    label="Fecha"
                    name="fecha"
                    placeholder="Hasta"
                    onChange={(e) => {}}
                  />

                  <Button
                    type="primary"
                    style={{ marginLeft: "20px" }}
                    onClick={() => {
                      const MySwal = withReactContent(swal);
                      MySwal.fire({
                        title: "Buscar data",
                        text: "¿Estas seguro de buscar la data?",
                        icon: "info",
                        showCancelButton: false,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Si, buscar!",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        if (result.value) {
                          MySwal.fire("Buscando data...", "", "info");
                          MySwal.showLoading();
                          setTimeout(() => {
                            MySwal.close();
                          }, 2000);
                        }
                      });
                    }}
                  >
                    Buscar
                  </Button>
                </div>

                <Tabs>
                  <TabPane tab="Bar Chart" key="1">
                    <div style={{ width: "500px" }}>
                      <BarChart chartData={userData} />
                    </div>
                  </TabPane>
                  <TabPane tab="Line Chart" key="2">
                    <div style={{ width: "500px" }}>
                      <LineChart chartData={userData} />
                    </div>
                  </TabPane>
                  <TabPane tab="Pie Chart" key="3">
                    <div style={{ width: "500px" }}>
                      <PieChart chartData={userData} />
                    </div>
                  </TabPane>
                </Tabs>
              </div>

              <p className="card-text" style={{ width: "420px" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut
                labore corporis aspernatur voluptate magni? Quas doloremque
                illum obcaecati sint ullam molestiae amet error aliquid
                aspernatur, modi commodi ex, iure inventore odio? Eaque
                laudantium vero voluptate assumenda minima eos et rem illo
                reiciendis a accusamus corporis enim laboriosam voluptatum ipsam
                beatae sed alias, laborum explicabo quo quae similique
                consequatur pariatur. Sunt voluptatum a inventore repudiandae,
                voluptates ullam perferendis provident sit maxime at! Eligendi
                aperiam accusamus voluptatibus veritatis harum animi, repellat
                blanditiis quibusdam unde illo laudantium amet impedit, tenetur
                autem. Qui, quia esse. Sunt perferendis, cupiditate culpa
                provident voluptatum, accusamus iure illum ducimus est
                repudiandae dicta numquam nemo nam blanditiis architecto quia
                ipsa quos velit! Voluptatibus molestiae necessitatibus sed
                nostrum sapiente dicta repellendus quos atque eos?
              </p>
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
      </Collapse> */}

      <div className="container">
        <div className="row">
          <div className="col-6">
            Carreras con mas atrasados en las ultimas semanas.
            <BarChart chartData={carrData} chartOptions={options} />
            {/* <PieChart chartData={carrData} /> */}
            {/* <LineChart chartData={carrData} chartOptions={options} /> */}
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Titulo</h5>
                <p className="card-text">
                  Solicite reporte sobre libros, carreras, etc... <br/>
                  <Button type="primary" onClick={() => {
                    const MySwal = withReactContent(swal);
                    MySwal.fire({
                      title: "Buscar data",
                      text: "Esto será parte de una actualización futura...",
                      icon: "info",
                      showCancelButton: false,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Si, buscar!",
                      cancelButtonText: "Cancelar",
                    }).then((result) => {
                      if (result.value) {
                        MySwal.fire("Buscando data...", "", "info");
                        MySwal.showLoading();
                        setTimeout(() => {
                          MySwal.close();
                        }, 2000);
                      }
                    });
                  }
                  }>Recargar</Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rankings;
