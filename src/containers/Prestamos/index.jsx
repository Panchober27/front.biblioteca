import React, { useState,useEffect } from 'react';
import { Row, Col, Menu, Button, message, Collapse, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { InputField, SearchableTable } from '../../components/common';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const Prestamos = () => {
  const MySwal = withReactContent(swal);
  const history = useHistory();
  const { SubMenu } = Menu;
  const { Panel } = Collapse;

  // hook de estado: Cual panel esta activo. // ya no la niito
  const [activePanel, setActivePanel] = useState('1');

  // hook de estado: data del prestamo.
  const [prestamo, setPrestamo] = useState({
    alumno: {},
    ejemplares: [],
  });

  // formulario para ingresar datos del alumno.
  // validar, quizas mediante peticion que el alumno este habilitado.

  // columnas para la tabla de ejemplares(libros,revistas,trabalajos).
  const ejemplarColumns = [
    { title: 'Titulo', dataIndex: 'titulo', key: 'titulo' },
    { title: 'Autor', dataIndex: 'autor', key: 'autor' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
  ];

  // Data de demo para la tabla.
  const ejemplares = [
    {
      titulo: 'Libro 1',
      ejemplarId: 1,
      autor: 'Autor 1 y 2',
      stock: 5,
    },
    {
      titulo: 'Libro 2',
      ejemplarId: 2,
      autor: 'Autor 2',
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
            <p>
              {' '}
              {prestamo && prestamo.alumno && prestamo.alumno.nombres
                ? prestamo.alumno.nombres
                : ''}{' '}
            </p>
            <br />
            <h3>Ejemplares:</h3>
            <ul>
              {prestamo && prestamo.ejemplares && prestamo.ejemplares.length > 0
                ? prestamo.ejemplares.map((ejemplar) => (
                    <li key={ejemplar.ejemplarId}>{ejemplar.titulo}</li>
                  ))
                : 'No se han cargonado ejemplares'}
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
                  // usar sweet alert con boton y onClick function
                  MySwal.fire({
                    title: 'Objeto final',
                    text: JSON.stringify(prestamo),
                    icon: 'info',
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.value) {
                      // Se le envia hacia el home.
                      history.push('/');
                      console.log(prestamo);
                    }
                  });

                  console.log(prestamo);
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
              <p>Buscador con input select? usar modal de setsDeMasas!!!</p>
              <InputField
                label='Nombre'
                name='nombres'
                placeholder='Nombres'
                allowClear={true}
                onChange={(value) => {
                  setPrestamo({
                    ...prestamo,
                    alumno: { ...prestamo.alumno, nombres: value },
                  });
                }}
              />
            </Panel>
            <Panel
              key='2'
              collapsible='header'
              // style={{height: '500px'}}
              className='certification-panel'
              header={<h4>Ejemplares.</h4>}
            >
              <SearchableTable
                rowKey='ejemplarId'
                columns={ejemplarColumns}
                dataSource={ejemplares}
                onChange={(row) => {
                  setPrestamo({
                    ...prestamo,
                    ejemplares: row,
                  });
                }}
                selectedData={prestamo.ejemplares ? prestamo.ejemplares : []}
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

export default Prestamos;
