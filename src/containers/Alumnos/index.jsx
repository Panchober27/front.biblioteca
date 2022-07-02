import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Button, message, Drawer, Tooltip } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AdministrationTable,
  SearchableTable,
  InputField,
} from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  getAlumnos,
  clearAlumnosState,
} from "../../redux/reducers/alumnosReducer";

const Alumnos = ({ alumnos, getAlumnos, clearAlumnosState }) => {
  // Hook de estado: para visibilidad del drawer
  const [drawreVisible, setDrawreVisible] = useState(false);

  // Hook de estado: es edicion o creacion de alumnos
  const [isEdit, setIsEdit] = useState(false);

  // Hook de estado: datos del alumno a crear/editar
  const [alumnoData, setAlumnoData] = useState({});

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
            <span>Habilitado</span>
          ) : (
            <span>Deshabilitado</span>
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
            <Button
              style={{ marginRight: "10px" }}
              type="primary"
              onClick={() => {
                setDrawreVisible(true);
                setAlumnoData(record);
                setIsEdit(true);
              }}
            >
              editar
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button type="danger">eliminar</Button>
          </Tooltip>
        </span>
      ),
    },
  ];

  // Hook de Efecto inicial
  useEffect(() => {
    getAlumnos();
  }, []);

  // Funcion que renderiza el drawer de edcicion/registro de un alummno.
  const renderDrawer = () => (
    <Drawer
      title="Registro/Edicion de Alumno"
      width={"700px"}
      destroyOnClose
      placement="right"
      onClose={() => {
        setDrawreVisible(false);
        setAlumnoData({});
        setIsEdit(false);
      }}
      visible={drawreVisible}
    >
      <>
        <Row>
          <Col span={12}>
            <InputField
              label="Rut"
              name="rutAlumno"
              defaultValue={alumnoData.rutAlumno}
              onChange={(value) => {
                setAlumnoData({ ...alumnoData, rutAlumno: value });
              }}
            />
          </Col>
          <Col span={12}>
            <InputField
              label="Nombres"
              name="nombreAlumno"
              defaultValue={alumnoData.nombreAlumno}
              onChange={(value) => {
                setAlumnoData({ ...alumnoData, nombreAlumno: value });
              }}
            />
          </Col>

          <Col span={12}>
            <InputField
              label="Apellidos"
              name="apellidoAlumno"
              defaultValue={alumnoData.apellidoAlumno}
              onChange={(value) => {
                setAlumnoData({ ...alumnoData, apellidoAlumno: value });
              }}
            />
          </Col>

          <Col span={12}>
            <InputField
              label="Email"
              name="emailAlumno"
              defaultValue={alumnoData.emailAlumno}
              onChange={(value) => {
                setAlumnoData({ ...alumnoData, emailAlumno: value });
              }}
            />
          </Col>

          <Col span={12}>
            <p>
              Carrera:{" "}
              {alumnoData &&
              alumnoData.carrera &&
              alumnoData.carrera.nombreCarrera
                ? alumnoData.carrera.nombreCarrera
                : ""}
            </p>
          </Col>

          <Col span={12}>
            <p>
              Facultad:{" "}
              {alumnoData &&
              alumnoData.carrera &&
              alumnoData.carrera.facultad &&
              alumnoData.carrera.facultad.nombreFacultad
                ? alumnoData.carrera.facultad.nombreFacultad
                : ""}
            </p>
          </Col>
        </Row>
      </>
    </Drawer>
  );

  return (
    <>
      <h3 style={{ color: "red" }}>TODOS:</h3>
      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        Cambiar palabras en botones x iconos! <br />
        Ver como manejar info de porque estan Deshabilitados
      </p>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <AdministrationTable
              columns={alumnosColumns}
              tableTitle="Alumnos"
              dataSource={alumnos.data ? [...alumnos.data] : []}
              options={[
                {
                  title: "Crear Alumno",
                  onClick: () => {
                    setDrawreVisible(true);
                    setAlumnoData({});
                    setIsEdit(false);
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>

      {renderDrawer()}
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
