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

const Prestamos = ({ alumnos, getAlumnos, clearAlumnosState }) => {
  const MySwal = withReactContent(swal);
  const history = useHistory();
  const { SubMenu } = Menu;
  const { Panel } = Collapse;

  // hook de estado: Cual panel esta activo. // ya no la niito
  const [activePanel, setActivePanel] = useState('1');

  // hook de estado: data del prestamo.

  // Separo la data para prestamoData.
  const [prestamoData, setPrestamoData] = useState({});
  const [alumno, setAlumno] = useState([]);
  const [ejemplares, setEjemplares] = useState([]);

  // hook de efecto inicial.
  useEffect(() => {
    getAlumnos();
  }, []);

  // hook de efecto final.
  useEffect(() => {
    return () => {
      clearAlumnosState();
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
    { title: 'Autor', dataIndex: 'autor', key: 'autor' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  ];

  // Data de demo para la tabla.
  // const ejemplares = [
  //   {
  //     titulo: 'Libro 1',
  //     ejemplarId: 1,
  //     autor: 'Autor 1 y 2',
  //     stock: 5,
  //   },
  //   {
  //     titulo: 'Libro 2',
  //     ejemplarId: 2,
  //     autor: 'Autor 2',
  //     stock: 10,
  //   },
  // ];

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
            {/* <ul>
              {prestamo && prestamo.ejemplares && prestamo.ejemplares.length > 0
                ? prestamo.ejemplares.map((ejemplar) => (
                    <li key={ejemplar.ejemplarId}>{ejemplar.titulo}</li>
                  ))
                : 'No se han cargonado ejemplares'}
            </ul> */}
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
                dataSource={ejemplares}
                onChange={(row) => {}}
                selectedData={[]}
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

const mapStateToProps = ({ alumnos }) => ({
  alumnos,
});

const mapDispatchToProps = (dispatch) => ({
  getAlumnos: () => dispatch(getAlumnos()),
  clearAlumnosState: () => dispatch(clearAlumnosState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Prestamos);
