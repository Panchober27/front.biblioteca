import React, { Fragment, useState, useEffect, Row, Col } from "react";
import { Collapse } from "antd";

const Rankings = () => {
  const { Panel } = Collapse;

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
                <a href="https://www.youtube.com/watch?v=YaZJ3alT2no" target="_blank">
                  Tutorial
                </a>
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
      </Collapse>
    </>
  );
};

export default Rankings;
