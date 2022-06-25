import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getEjemplares,
  clearEjemplaresState,
} from '../../redux/reducers/ejemplaresReducer';
import { Button, Drawer, Row, Col, Tooltip, Modal } from 'antd';
// importar moment para trabajar con fechas
import moment from 'moment';
import {
  AdministrationTable,
  SearchableTable,
  CustomModal,
  InputField,
} from '../../components/common';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useHistory } from 'react-router-dom';
import { VscPreview } from 'react-icons/vsc';
import { AiOutlineFileDone } from 'react-icons/ai';

const Books = () => {
  const MySwal = withReactContent(swal);
  const history = useHistory();

  // Hook de estado: Mostrar/ocultar el Drawer para editar/darDeBaja/darDeAlta un ejemplar.
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Hook de estado: Ejemplar a crear/editar. en caso de editar puede ser la cantidad de ejemplares disponibles!
  const [isEdit, setIsEdit] = useState(false);

  // Funcion para renderizar el drawer de edicion/creacion de ejemplares.
  const renderDrawerForm = () => (
    <Drawer
      title='Editar Ejemplar'
      placement='right'
      closeOnClick={() => setDrawerVisible(false)}
      onClose={() => setDrawerVisible(false)}
      visible={drawerVisible}
      width={500}
      footer={
        <div>
          <Button type='primary' onClick={() => setDrawerVisible(false)}>
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
              <Col span={24}>CREACION!</Col>
            </Row>
          </>
        )}

        <Row>
          <Col span={24}>
            <InputField
              label='Titulo'
              name='title'
              placeholder='Titulo'
              type='text'
              required
            />
          </Col>
        </Row>
      </>
    </Drawer>
  );

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Mantenedor de Libros-Ejemplares</h1>

      <Button
        type='primary'
        onClick={() => {
          setDrawerVisible(!drawerVisible);
        }}
      >
        mostrar/ocultar drawer
      </Button>

      {renderDrawerForm()}
    </>
  );
};

export default Books;
