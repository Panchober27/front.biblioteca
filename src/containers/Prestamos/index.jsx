import React, { useState, useEffect } from 'react';
import { Row, Col, Menu, Button, message, Collapse, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  InputField,
  SearchableTable,
  SearchInput,
} from '../../components/common';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  getAlumnos,
  clearAlumnosState,
} from '../../redux/reducers/alumnosReducer';
import {
  getEjemplares,
  clearEjemplaresState,
} from '../../redux/reducers/ejemplaresReducer';

const Prestamos = ({
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

  useEffect(() => {
    if (ejemplares.length > 0) {
      setPrestamoData({ ...prestamoData, ejemplares });
    } else if (!ejemplares.length) {
      setPrestamoData({ ...prestamoData, ejemplares: [] });
    }
  }, [ejemplares]);

  // hook de efecto final.
  useEffect(() => {
    return () => {
      setAlumno([]);
      setEjemplares([]);
      setPrestamoData({});
      clearAlumnosState();
      clearEjemplaresState();
    };
  }, []);

  // formulario para ingresar datos del alumno.
  // validar, quizas mediante peticion que el alumno este habilitado.

  // columnas para la tabla de alumnos (selector de alumno para prestamos)
  const alumnosColumns = [
    {
      title: 'Nombre',
      dataIndex: 'nombreAlumno',
      key: 'nombreAlumno',
    },
    {
      title: 'Rut',
      dataIndex: 'rutAlumno',
      key: 'rutAlumno',
    },
    {
      title: 'Correo',
      dataIndex: 'emailAlumno',
      key: 'emailAlumno',
    },
  ];

  // columnas para la tabla de ejemplares(libros,revistas,trabalajos).
  const ejemplarColumns = [
    { title: 'Titulo', dataIndex: 'titulo', key: 'titulo' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    { title: 'Fecha Fin', dataIndex: 'fechaFin', key: 'fechaFin' },
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
            <h3>Ejemplares:</h3>
            <ul>
              {ejemplares.length ? (
                ejemplares.map((ejemplar) => (
                  <li key={ejemplar.ejemplarId}>{ejemplar.ejemplarId}</li>
                ))
              ) : (
                <li>Seleccione un ejemplar</li>
              )}
            </ul>
          </div>
          {/* DIV contenedor para las opciones de prestamo. */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              marginRight: '175px',
            }}
          >
            <Tooltip title='Ver en consola objeto final'>
              <Button
                style={{ backgroundColor: 'lightgreen' }}
                onClick={() => {
                  setPrestamoData({
                    ...prestamoData,
                    alumno: alumno,
                    ejemplares: ejemplares,
                  });

                  // usar sweet alert con boton y onClick function
                  MySwal.fire({
                    title: 'Objeto final',
                    text: JSON.stringify(prestamoData),
                    icon: 'info',
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.value) {
                      // Se le envia hacia el home.
                      history.push('/');
                      console.log(prestamoData);
                    }
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
          {/* Alumno */}
          {/* <Collapse defaultActiveKey={['1', '2']}> */}
          <Collapse defaultActiveKey={['0']}>
            <Panel
              key='1'
              collapsible='header'
              className='certification-panel'
              header={<h4>Alumno.</h4>}
            >
              <SearchableTable
                columns={alumnosColumns}
                rowKey='rutAlumno'
                dataSource={alumnos.data ? [...alumnos.data] : []}
                onChange={(value) => {
                  setAlumno(value);
                  console.log(alumno);
                }}
                selectedData={alumno}
                maxSelection={1}
                maxSelecctionMessage='Solo puede seleccionar un alumno.'
                emptyMessage='No hay alumnos para mostrar.'
              />
            </Panel>
            <Panel
              key='2'
              collapsible='header'
              className='certification-panel'
              header={<h4>Ejemplares.</h4>}
            >
              <SearchableTable
                rowKey='ejemplarId'
                columns={ejemplarColumns}
                dataSource={
                  ejemplaresReducer.data ? [...ejemplaresReducer.data] : []
                }
                onChange={(value) => {
                  setEjemplares(value);
                  console.log(ejemplares);
                }}
                selectedData={ejemplares}
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

const mapStateToProps = ({ alumnos, ejemplaresReducer }) => ({
  alumnos,
  ejemplaresReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAlumnos: () => dispatch(getAlumnos()),
  clearAlumnosState: () => dispatch(clearAlumnosState()),
  getEjemplares: () => dispatch(getEjemplares()),
  clearEjemplaresState: () => dispatch(clearEjemplaresState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prestamos);
