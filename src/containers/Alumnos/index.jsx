import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Button, message, Collapse, Tooltip } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { AdministrationTable, SearchableTable } from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  getAlumnos,
  clearAlumnosState,
} from "../../redux/reducers/alumnosReducer";

const Alumnos = ({ alumnos, getAlumnos, clearAlumnosState }) => {
  // Columnas para la tabla de alumnos.
  const alumnosColumns = [
    {
      title: "Rut",
      dataIndex: "rutAlumno",
      key: "rutAlumno",
    },
    {
      title: "Nombre",
      render: (text, record) => (
        <span>
          {record.nombreAlumno} {record.apellidoAlumno}
        </span>
      ),
    },
    {
      title: "Correo",
      dataIndex: "emailAlumno",
      key: "emailAlumno",
    },
    {
      title: "Alumno Activo",
      dataIndex: "alumnoActivo",
      key: "alumnoActivo",
      render: (text, record) => (
        <span>
          {record.alumnoActivo ? (
            <span>
              Habilitado
            </span>
          ) : (
            <span>
              Deshabilitado
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (text, record) => (
        <span>
          <Tooltip title="Editar">
            <Button type="primary">
              editar
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button type="danger">
              eliminar
            </Button>
          </Tooltip>
        </span>
      ),
    },
  ];

  // Hook de Efecto inicial
  useEffect(() => {
    getAlumnos();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <AdministrationTable
              columns={alumnosColumns}
              tableTitle="Alumnos"
              dataSource={alumnos.data ? [...alumnos.data] : []}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ alumnos }) => ({
  alumnos,
});

const mapDispatchToProps = (dispatch) => ({
  getAlumnos: (isAdmin = true) => dispatch(getAlumnos({ isAdmin })),
  clearAlumnosState: () => dispatch(clearAlumnosState()),
});

// Reducers.

export default connect(mapStateToProps, mapDispatchToProps)(Alumnos);
