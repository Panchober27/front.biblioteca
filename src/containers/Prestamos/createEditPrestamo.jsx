import React, { useState, useEffect } from "react";
import { InputField, AdministrationTable } from "../../components/common";
import { Collapse, Divider, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
// import antd icons
import { SearchOutlined, FileAddTwoTone } from "@ant-design/icons";

const CreateEditPrestamo = () => {
  // estado para el super objeto con los datos del nuevo prestamo.
  const [prestamoData, setPrestamoData] = useState({});

  // en el listado de libros agregar botones para seleccionar revistas, etc...
  // el boton solo es de muestra, ya que solo soportaremos libros en la demo.

  // formato del prestamoData

  // estado para el alumno seleccionado.
  const [studentSelected, setStudentSelected] = useState({});

  const columns = [
    { title: "Titulo", dataIndex: "title", key: "title" },
    { title: "Autor", dataIndex: "author", key: "author" },
    { title: "Editorial", dataIndex: "editorial", key: "editorial" },
    { title: "Edicion", dataIndex: "edition", key: "edition" },
  ];

  const booksList = [
    {
      title: "El señor de los anillos",
      author: "J.R.R. Tolkien",
      editorial: "Planeta",
      edition: "1",
    },
    {
      title: "El señor de los anillos las dos torres",
      author: "J.R.R. Tolkien",
      editorial: "Planeta",
      edition: "1",
    },
    {
      title: "El señor de los anillos El Retorno Del Rey",
      author: "J.R.R. Tolkien",
      editorial: "Planeta",
      edition: "1",
    },
  ];

  

  return (
    <>
      <h1>Prestamos</h1>

      <div className="row">
        <div className="col-12 col-md-6">
          Selectores Alumnos, Libros, etc...
          <Collapse bordered={false}>
            <Collapse.Panel header="Alumno" key="1">
              Selector datos alumno
            </Collapse.Panel>
            <Collapse.Panel header="Ejemplares" key="2">
              Selector datos ejemplar (libro) <br />
              <AdministrationTable columns={columns} dataSource={booksList} />
            </Collapse.Panel>
          </Collapse>
        </div>
        <div className="col-12 col-md-6">
          Previsualizacion del prestamo que se esta generando.
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Datos del prestamo</h5>
              <p className="card-text">
                {studentSelected.nombre} {studentSelected.apellido} <br />
                {studentSelected.email} <br />
                {studentSelected.carrera} <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEditPrestamo;
