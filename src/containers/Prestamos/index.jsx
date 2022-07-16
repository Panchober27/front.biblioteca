import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Button, message, Collapse, Tooltip } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SearchableTable, DatePickerField } from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getAlumnos,
  clearAlumnosState,
} from "../../redux/reducers/alumnosReducer";
import {
  getEjemplares,
  clearEjemplaresState,
} from "../../redux/reducers/ejemplaresReducer";
import {
  createPrestamo,
  clearPrestamoState,
} from "../../redux/reducers/prestamosReducer";
import * as moment from 'moment'

const Prestamos = ({
  prestamos,
  createPrestamo,
  clearPrestamosState,
  alumnos,
  getAlumnos,
  clearAlumnosState,
  ejemplaresReducer,
  getEjemplares,
  clearEjemplaresState,
}) => {
  const MySwal = withReactContent(swal);
  const history = useHistory();
  const { Panel } = Collapse;

  const [prestamoData, setPrestamoData] = useState({});
  const [alumno, setAlumno] = useState([]);
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    getAlumnos();
    getEjemplares();
  }, []);

  // podria hacer un useEffect para ervisar si hay cambios en alumno y/o ejemplares para setearlos a prestamoData.
  useEffect(() => {
    if (alumno.length > 0) {
      // setear el primer alumno del arreglo OJO que se pasa el indice, para solo tener un {} y no []
      setPrestamoData({
        ...prestamoData,
        alumno: alumno[0],
      });
    } else if (!alumno.length) {
      setPrestamoData({
        ...prestamoData,
        alumno: {},
      });
    }
  }, [alumno]);


  useEffect(() => {
    if (libros.length > 0) {
      setPrestamoData({ ...prestamoData, libros });
    } else if (!libros.length) {
      setPrestamoData({ ...prestamoData, libros: [] });
    }
  }, [libros]);

  // Hooks de Efecto para peticion para crear un prestamo.
  useEffect(() => {
    if (prestamos.onSuccessPostPutFetch) {
      MySwal.fire({
        title: "Prestamo creado",
        text: "El prestamo se creo correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      clearPrestamoState();
      history.push("/prestamos");
    } else if (prestamos.onStartFetch) {
      MySwal.fire({
        title: "Creando Prestamo",
        icon: "success",
      });
      MySwal.showLoading();
    } else if (prestamos.onErrorFetch) {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: "No se pudo crear el prestamo",
      });
      clearPrestamoState();
    }
  }, [prestamos]);



  // columnas para la tabla de alumnos (selector de alumno para prestamos)
  const alumnosColumns = [
    {
      title: "Nombre",
      dataIndex: "nombreAlumno",
      key: "nombreAlumno",
    },
    {
      title: "Rut",
      dataIndex: "rutAlumno",
      key: "rutAlumno",
    },
    {
      title: "Correo",
      dataIndex: "emailAlumno",
      key: "emailAlumno",
    },
    {
      title: "Activo",
      dataIndex: "alumnoActivo",
      key: "alumnoActivo",
      render: (text) => (
        <span>
          {text ? (
            <span style={{ backgroundColor: 'green'}}>
              SI
            </span>
          ) : (
            <span style={{ backgroundColor: 'red'}}>
              NO
            </span>
          )}
        </span>
      ),
    }
  ];

  const ejemplarColumns = [
    {
      title: "Titulo",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Fecha de Publicacion",
      dataIndex: "fechaPublicacion",
      key: "fechaPublicacion",
    },
    {
      title: "Stock Disponible",
      render: (row, record, index) => (
        <span>
          {record.libroStocks.map((libroStock) => {
            return libroStock.enBiblioteca;
          })}
        </span>
      ),
    },
    {
      title: "Stock Prestado",
      render: (row, record, index) => (
        <span>
          {record.libroStocks.map((libroStock) => {
            return libroStock.enPrestamo;
          })}
        </span>
      ),
    },
  ];

  return (
    <>
      <button
        onClick={() => {
          console.log(prestamoData);
          const fechaDevolucion = prestamoData.libros.reduce((fechaDev, l) => {
            console.log(l.fechaRetorno)
            const fecha = moment(l.fechaRetorno, "YYYY-MM-DD").valueOf()
            return fecha > fechaDev ? fecha : fechaDev
          }, 0)
          console.log(moment(fechaDevolucion).format("DD-MM-YYYY"))
        }}
      >
        Ver prestamoData
      </button>

      <Row>
        <Col span={12}>
          {/* DIV contenedor de los datos de preview */}
          <div>
            <h2>Datos del Prestamo</h2>
            <p>llenar mientras el usuario interactua</p>
            {/* input autocompletable? */}
            <h3>Alumno:</h3>
            <p>
              {alumno.length ? (
                <div className="card">
                  <div className="card-body">
                    <>
                      {alumno[0].nombreAlumno}
                      <br />
                      {alumno[0].rutAlumno}
                      <br />
                      {alumno[0].emailAlumno}
                    </>
                  </div>
                </div>
              ) : (
                <>
                  <span>Seleccione un alumno</span>
                </>
              )}
            </p>
            <br />
            <h3>Libros:</h3>
            <p>
              {libros.length ? (
                <>
                  {/* Titulo: {libros[0].nombre} */}
                  {/* {libros[0].fechaPublicacion} */}
                </>
              ) : (
                <>
                  <span>Seleccione un libro</span>
                </>
              )}
            </p>
            <ul>
              {libros.length
                ? libros.map((libro) => (
                    <li key={libro.libroId}>
                      {/* TODO: FIX */}
                      <p>{libro.nombre}</p>
                      <p>setear fecha de devolucion</p>
                      <DatePickerField
                        style={{ width: "10px" }}
                        name="fechaDevolucion"
                        label="Fecha de Devolucion"
                        placeholder="Seleccione una fecha"
                        // TODO: en el onChange, setear fechas de devolucion en los ejemplares
                        // almacenar las ficehas de devolucion en una variable para calcular la ultima y asignarla al prestamo.
                        onChange={(value) => {
                          // crear un hook de estado para almacenar de manera correcta la fecha en los libros.

                        // EL BENJA ME AYUDO CON ESTOOOO!!!!
                        // 🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤🐱‍👤📗📗📗📗📗📗📗📗📗
                          setPrestamoData((prevData) => ({
                            ...prevData,
                            libros: prevData.libros.map((l) => {
                              if (l.libroId === libro.libroId) {
                                const date = moment(value).format("DD-MM-YYYY");
                                l.fechaRetorno = value;
                                l.ejemplars[0].fechaFin = value;
                                console.log(l.ejemplars[0].fechaFin);
                              }
                              return l;
                            }),
                          }));
                        }}
                      />
                      <p>{libro.isbnTipo}</p>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          {/* DIV contenedor para las opciones de prestamo. */}
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginRight: "175px",
            }}
          >
            <Tooltip title="Ver en consola objeto final">
              <Button
                style={{ backgroundColor: "lightgreen" }}
                onClick={() => {
                  setPrestamoData({
                    ...prestamoData,
                    alumno: alumno,
                  });


                  // TODO: MOSTRAR VISTA PREVIA FINAL DEL PRESTAMO A PRESTAR
                  MySwal.fire({
                    title: "Desea guardar el prestamo?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Guardar Prestamo",
                    denyButtonText: `Cancelar`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      createPrestamo(prestamoData);
                      // TODO: cuando el reductor responda de manera correcta. enviar por history a prestamosList
                    }
                    // else if (result.isDenied) {
                    //   MySwal.fire('Cancelado', '', 'info')
                    // }
                  });
                  console.log(prestamoData);
                }}
              >
                <span>Aceptar</span>
              </Button>
            </Tooltip>
          </div>
        </Col>

        <Col span={12}>
          <Collapse defaultActiveKey={["0"]}>
            <Panel
              key="1"
              collapsible="header"
              className="certification-panel"
              header={<h4>Alumno.</h4>}
            >
              <SearchableTable
                alumnos={true}
                columns={alumnosColumns}
                rowKey="rutAlumno"
                dataSource={alumnos.data ? [...alumnos.data] : []}
                onChange={(value) => {
                  setAlumno(value);
                }}
                selectedData={alumno}
                maxSelection={1}
                maxSelecctionMessage="Solo puede seleccionar un alumno."
                emptyMessage="No hay alumnos para mostrar."
              />
            </Panel>
            <Panel
              key="2"
              collapsible="header"
              className="certification-panel"
              header={<h4>Ejemplares.</h4>}
            >
              <SearchableTable
                rowKey="libroId"
                columns={ejemplarColumns}
                dataSource={
                  ejemplaresReducer.data ? [...ejemplaresReducer.data] : []
                }
                onChange={(value) => {
                  setLibros(value);
                }}
                selectedData={libros}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};


const mapStateToProps = ({ alumnos, ejemplaresReducer, prestamos }) => ({
  alumnos,
  ejemplaresReducer,
  prestamos,
});

const mapDispatchToProps = (dispatch) => ({
  getAlumnos: () => dispatch(getAlumnos()),
  clearAlumnosState: () => dispatch(clearAlumnosState()),
  getEjemplares: () => dispatch(getEjemplares()),
  clearEjemplaresState: () => dispatch(clearEjemplaresState()),
  createPrestamo: (body) => dispatch(createPrestamo(body)),
  clearPrestamoState: () => dispatch(clearPrestamoState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prestamos);
