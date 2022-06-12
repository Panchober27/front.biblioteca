import React, { useState } from "react";
import { Row, Col, Menu, Button, message, Collapse } from "antd";
import { useHistory } from "react-router-dom";
import { InputField, SearchableTable } from "../../components/common";

const Prestamos = () => {
  const history = useHistory();
  const { SubMenu } = Menu;
  const { Panel } = Collapse;

  // hook de estado: Cual panel esta activo.
  const [activePanel, setActivePanel] = useState("1");

  // hook de estado: data del prestamo.
  const [prestamo, setPrestamo] = React.useState({});

  // formulario para ingresar datos del alumno.
  // validar, quizas mediante peticion que el alumno este habilitado.

  // columnas para la tabla de ejemplares(libros,revistas,trabalajos).
  const ejemplarColumns = [
    { title: "Titulo", dataIndex: "titulo", key: "titulo" },
    { title: "Autor", dataIndex: "autor", key: "autor" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
  ];

  // Data de demo para la tabla.
  const ejemplares = [
    {
      titulo: "Libro 1",
      autor: "Autor 1 y 2",
      stock: 5,
    },
    {
      titulo: "Libro 2",
      autor: "Autor 2",
      stock: 10,
    },
  ];

  return (
    <>
      <Row>
        <Col span={12}>
          {/* DIV contenedor de los datos de preview */}
          <div>
            <h2>Datos del Prestamo</h2>
            <p>llenar mientras el usuario interactua</p>
            {/* input autocompletable? */}
            <h3>Alumno:</h3>
            <p> dasdsa </p>
            <br />
            <h3>Ejemplares:</h3>
            <ul>
              <li>Ejemplar 1 / fechas / otros</li>
              <li>Ejemplar 2 / fechas / otros</li>
              <li>Ejemplar 3 / fechas / otros</li>
            </ul>
          </div>
          {/* DIV contenedor para las opciones de prestamo. */}
          <div style={{ display: 'flex', justifyContent: 'right', marginRight: '175px' }}>
            <Button
              style={{backgroundColor: 'lightgreen'}}
              onClick={() => {
                message.success("Prestamo realizado con exito!");
              }}
            >
              <span>Aceptar</span>
            </Button>
          </div>
        </Col>

        <Col span={12}>
          {/* Alumno */}
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel
              key="1"
              collapsible='header'
              className="certification-panel"
              header={<h4>Alumno.</h4>}
            >
              <p>Buscador con input select? usar modal de setsDeMasas!!!</p>
              {/* <SearchableTable
                columns={ejemplarColumns}
                dataSource={ejemplares}
                rowKey="id"
                onChange={(prestamo) => setPrestamo(prestamo)}
              /> */}
            </Panel>
            <Panel
              key="2"
              collapsible='header'
              // style={{height: "500px"}}
              className="certification-panel"
              header={<h4>Ejemplares.</h4>}
            >
              <p>Buscador con input select? usar modal de setsDeMasas!!!</p>
              <SearchableTable
                columns={ejemplarColumns}
                dataSource={ejemplares}
                rowKey="id"
                onChange={(prestamo) => setPrestamo(prestamo)}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

export default Prestamos;
