import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getEjemplares,
  clearEjemplaresState,
} from '../../redux/reducers/ejemplaresReducer';
import { Button, Drawer, Row, Col, Tooltip, message } from 'antd';
// importar moment para trabajar con fechas
import moment from 'moment';
import {
  AdministrationTable,
  SearchableTable,
  CustomModal,
  InputField,
  SelectField,
  DatePickerField,
} from '../../components/common';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';
import { VscPreview } from 'react-icons/vsc';
import { AiOutlineFileDone } from 'react-icons/ai';

const Books = () => {
  const MySwal = withReactContent(swal);
  const history = useHistory();

  // Hook de estado: Mostrar/ocultar el Drawer para editar/darDeBaja/darDeAlta un Libro.
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Hook de estado: Mostrar/ocultar el Modal para editar/darDeBaja/darDeAlta un ejemplar.
  const [modalVisible, setModalVisible] = useState(false);

  // Hook de estado: Ejemplar a crear/editar. en caso de editar puede ser la cantidad de ejemplares disponibles!
  const [isEdit, setIsEdit] = useState(false);

  // Hook de estado: Libro a crear/editar.
  const [libroData, setLibroData] = useState({});

  // Definicion Columnas tabla Libros.
  const librosColumns = [
    {
      title: 'Titulo',
      dataIndex: 'nombre',
      key: 'nombre',
      width: '30%',
    },
    {
      title: 'Ejemplares',
      dataIndex: 'autor',
      key: 'autor',
      width: '30%',
    },
    {
      title: 'Stocks',
      dataIndex: 'stock',
      key: 'stock',
      width: '30%',
    },
  ];

  // Opciones de la tabla de libros.
  const librosOptions = [
    {
      title: 'Crear Nuevo Libro',
      onClick: () => {
        setDrawerVisible(true);
      },
    },
  ];

  // Funcion para renderizar el drawer de edicion/creacion de ejemplares.
  const renderDrawerForm = () => (
    <Drawer
      title='Editar Ejemplar'
      placement='right'
      destroyOnClose={true}
      closeOnClick={() => {
        setLibroData({});
        setDrawerVisible(false);
      }}
      onClose={() => {
        setLibroData({});
        setDrawerVisible(false);
      }}
      visible={drawerVisible}
      width={500}
      footer={
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            type='danger'
            style={{ marginRight: '10px' }}
            onClick={() => {
              setLibroData({});
              setDrawerVisible(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type='primary'
            onClick={() => {
              setDrawerVisible(false);
              MySwal.fire({
                title: 'Ejemplar editado con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              });
            }}
          >
            Guardar
          </Button>
        </div>
      }
    >
      <>
        {/* Validar si es edicion de un ejemplar o no */}
        {isEdit ? (
          <>
            <Row>
              <Col span={24}>EDICION!</Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col span={12}>
                <InputField
                  label='Titulo'
                  name='title'
                  type='text'
                  required
                  onChange={(value) => {
                    setLibroData({ ...libroData, nombre: value });
                  }}
                />
              </Col>
              <Col span={12}>
                <SelectField
                  label='Tipo'
                  name='insbnTipo'
                  data={[
                    { value: '1', title: 'Tapa Blanda' },
                    { value: '2', title: 'Tapa Dura' },
                    { value: '3', title: 'De Bolsillo' },
                  ]}
                  required
                  onChange={(value) => {
                    setLibroData({ ...libroData, isbnTipo: value });
                  }}
                />
              </Col>
              <Col span={12}>
                <InputField
                  label='Editorial'
                  name='editorial'
                  type='text'
                  required
                  onChange={(value) => {
                    setLibroData({ ...libroData, editorial: value });
                  }}
                />
              </Col>
              <Col span={12}>
                <InputField
                  label='Edición'
                  name='edicion'
                  type='text'
                  required
                  onChange={(value) => {
                    setLibroData({ ...libroData, edicion: value });
                  }}
                />
              </Col>

              <Col span={12}>
                <DatePickerField
                  label='Fecha de Publicación'
                  name='fechaPublicacion'
                  required
                  onChange={(value) => {
                    setLibroData({ ...libroData, fechaPublicacion: value });
                  }}
                />
              </Col>

              <Col span={12}>
                <Button
                  type='primary'
                  onClick={() => {
                    setModalVisible(true);
                  }}
                >
                  Agregar Ejemplares
                </Button>
              </Col>
            </Row>
            <Button
              type='primary'
              onClick={() => {
                console.log(libroData);
              }}
            >
              ver libro data.
            </Button>
          </>
        )}
      </>
    </Drawer>
  );

  // Funcion para renderizar el modal para crear o editar ejemplares de un libro.
  const renderModalForm = () => (
    <CustomModal
      title='Crear Ejemplar'
      visible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      footer={
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            type='danger'
            style={{ marginRight: '10px' }}
            onClick={() => {
              setModalVisible(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type='primary'
            onClick={() => {
              setModalVisible(false);
              MySwal.fire({
                title: 'Ejemplar creado con éxito',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
              });
            }}
          >
            Guardar
          </Button>
        </div>
      }
    >
      <>
        <Row>
          <Col span={12}>Datos del ejemplar</Col>
        </Row>
      </>
    </CustomModal>
  );

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Mantenedor de Libros-Ejemplares</h1>

      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-4'>
            <SearchableTable
              columns={librosColumns}
              menuOptions={librosOptions}
              dataSource={[]}
              rowKey='id'
              pagination={false}
              onChange={(pagination, filters, sorter) => {
                console.log('params', pagination, filters, sorter);
              }}
            />
          </div>
          <div className='col-12 col-md-4'>TABLA DE REVISTAS</div>
          <div className='col-12 col-md-4'>TABLA DE TRABAJOS</div>
        </div>
      </div>

      {renderDrawerForm()}
      {renderModalForm()}
    </>
  );
};

export default Books;
