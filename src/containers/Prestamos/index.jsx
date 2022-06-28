import React, { useState, useEffect } from "react";
import { Row, Col, Menu, Button, message, Collapse, Tooltip } from "antd";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { SearchableTable } from "../../components/common";
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
  clearPrestamosState,
  clearPrestamoV2State,
} from "../../redux/reducers/prestamosReducer";

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
  const { SubMenu } = Menu;
  const { Panel } = Collapse;

  // hook de estado: data del prestamo.
  // Separo la data para prestamoData.
  const [prestamoData, setPrestamoData] = useState({});
  const [alumno, setAlumno] = useState([]);
  const [libros, setLibros] = useState([]);
  const [ejemplares, setEjemplares] = useState([]);

  // hook de efecto inicial.
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

  // useEffect(() => {
  //   if (ejemplares.length > 0) {
  //     setPrestamoData({ ...prestamoData, ejemplares });
  //   } else if (!ejemplares.length) {
  //     setPrestamoData({ ...prestamoData, ejemplares: [] });
  //   }
  // }, [ejemplares]);
  
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
      clearPrestamosState();
      clearPrestamoV2State();
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
        text: "El prestamo no se pudo crear",
        icon: "error",
        confirmButtonText: "Ok",
      });
      clearPrestamosState();
      clearPrestamoV2State();
    }
  }, [prestamos]);

  useEffect(() => {
    return () => {
      setAlumno([]);
      setEjemplares([]);
      setLibros([]);
      setPrestamoData({});
      clearAlumnosState();
      clearEjemplaresState();
      clearPrestamosState();
      clearPrestamoV2State();
    };
  }, []);

  // formulario para ingresar datos del alumno.
  // validar, quizas mediante peticion que el alumno este habilitado.

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
  ];

  // columnas para la tabla de ejemplares(libros,revistas,trabalajos).
  // const ejemplarColumns = [
  //   { title: "Titulo", dataIndex: "nombre", key: "nombre" },
  //   { title: "Tipo-validar", dataIndex: "isbn", key: "isbn" },
  //   // usar render para acceder al arreglo libroStocks y mostrar el stock(enBiblioteca)
  //   {
  //     title: "Stock Disponible",
  //     dataIndex: "enBiblioteca",
  //     key: "enBiblioteca",
  //     render: (index, record) => {
  //       return record.libroStocks.map((libroStock) => {
  //         return libroStock.enBiblioteca;
  //       });
  //     },
  //   },
  //   // acciones.
  // ];

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
                <>
                  {alumno[0].nombreAlumno}
                  <br />
                  {alumno[0].rutAlumno}
                  <br />
                  {alumno[0].emailAlumno}
                </>
              ) : (
                <>
                  <span>Seleccione un alumno</span>
                </>
              )}
            </p>
            <br />
            <h3>Libros:</h3>
            <ul>
              {ejemplares.length ? (
                ejemplares.map((ejemplar) => (
                  <li key={ejemplar.ejemplarId}>
                    <p>
                      {/* TODO: FIX */}
                      {ejemplar.libro ? (
                        <>
                          <p>{ejemplar.nombre}</p>
                          <p>{ejemplar.libro.nombre}</p>
                          <p>Colocar mas datos del libro??</p>
                          <p>{/* {ejemplar.libro.nombre} */}</p>
                          <p>{/* {ejemplar.libro.nombre} */}</p>
                        </>
                      ) : ejemplar.revista ? (
                        ejemplar.revista.nombre
                      ) : ejemplar.trabajo ? (
                        ejemplar.trabajo.titulo
                      ) : null}
                    </p>
                  </li>
                ))
              ) : (
                <li>Seleccione un ejemplar</li>
              )}
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
                    ejemplares: ejemplares,
                  });

                  MySwal.fire({
                    title: "Desea guardar el prestamo?",
                    showDenyButton: true,
                    showCancelButton: false,
                    confirmButtonText: "Guardar Prestamo",
                    denyButtonText: `Cancelar`,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      createPrestamo(prestamoData);
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
                columns={alumnosColumns}
                rowKey="rutAlumno"
                dataSource={alumnos.data ? [...alumnos.data] : []}
                onChange={(value) => {
                  setAlumno(value);
                  console.log(alumno);
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
              {/*
                TODO: 
                      - Cambiar la data y columnas de esta tabla, ahora traera libros,revistas y trabajos.
                        los, ejemplares se obtendran por id probablemente. 
               */}
              <SearchableTable
                rowKey="libroId"
                columns={ejemplarColumns}
                dataSource={
                  ejemplaresReducer.data ? [...ejemplaresReducer.data] : []
                }
                onChange={(value) => {
                  // setEjemplares(value);
                  setLibros(value);
                }}
                // selectedData={ejemplares}
                selectedData={libros}
              />
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </>
  );
};

// Reducers.
// - Ejemplares.
// - Alumnos.
// - Prestamos.

//  Al traer alumnos se traeran los prestamos relacionados al alumno.

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
  clearPrestamosState: () => dispatch(clearPrestamosState()),
  clearPrestamoV2State: () => dispatch(clearPrestamoV2State()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prestamos);
