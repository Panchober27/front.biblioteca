import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Drawer, Row, Col, Tooltip, Modal } from "antd";
// importar moment para trabajar con fechas
import moment from "moment";
import {
  AdministrationTable,
  SearchableTable,
  CustomModal,
  InputField,
} from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";
import { AiOutlineFileDone } from "react-icons/ai";

/**
 * Este componente contiene el mantenedor de ejemplares[libros, revistas, trabajos]
 *
 */
const Books = () => {
  // Hook de estado: Ejemplar a crear/editar.
  const [ejemplarData, setEjemplarData] = useState({});

  // Hook de estado: Si el Drawer para editar/darDeBaja/darDeAlta un ejemplar.
  const [ejemplarDrawerVisible, setEjemplarDrawerVisible] = useState(false);


  const ejemplaresColumns = [
    { title: "Titulo", dataIndex: "title", key: "title" },
    { title: "Tipo", dataIndex: "autor", key: "autor" },
    // Tipo/ diferencia si es libro, revista o trabajo.
    { title: "Autor", dataIndex: "autor", key: "autor" },
    { title: "Editorial", dataIndex: "editorial", key: "editorial" },
    {
      title: "Fecha de Publicacion",
      dataIndex: "fechaPublicacion",
      key: "fechaPublicacion",
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (text, record) => (
        <span>
          <Tooltip title="Opciones Ejemplar">
            <Button
              type="primary"
              shape="circle"
              icon={<VscPreview />}
              onClick={() => {
                setEjemplarData(record);
                setEjemplarDrawerVisible(true);
              }}
            />
          </Tooltip>
        </span>
      ),
    },
  ];

  const demoData = [
    {
      title: "Harry Potter",
      tipo: "Libro",
      autor: "J.K. Rowling",
      editorial: "Bloomsbury",
      fechaPublicacion: "01/01/2020",
    },
    {
      title: "El Señor de los anillos",
      tipo: "Libro",
      autor: "Tolkien",
      editorial: "de bolsillo",
      fechaPublicacion: "01/11/1954",
    },
  ];





  // Funcion que renderiza el Drawer para editar/crear un ejemplar.
  const renderEjemplarDrawer = () => (
    <Drawer
        title="Opciones Ejemplar"
        placement="right"
        closeOnClick={false}
        onClose={() => setEjemplarDrawerVisible(false)}
        visible={ejemplarDrawerVisible}
        width={500}
    >
        Formulario para Mantener Ejemplar ✌
        {JSON.stringify(ejemplarData)}

    </Drawer>
  );




  return (
    <>
      <h1 style={{ textAlign: "center" }}>Ejemplares</h1>
      <AdministrationTable
        columns={ejemplaresColumns}
        dataSource={demoData}
        // options={userTableOptions}
        pagination={true}
        pageSize={4}
      />
      {renderEjemplarDrawer()}
    </>
  );
};

// Reductores.

// Listado de ejemplares.
//  - Libros
//  - Revistas
//  - Trabajos
//
// Se debe poder filtrar por mas cosas como por ejemplo, mas atributos para los libros.

export default Books;
