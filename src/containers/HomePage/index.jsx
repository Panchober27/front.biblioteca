import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Calendario from './Calendario';
import { Button, DatePicker, Row, Col, Tooltip, Modal } from 'antd';
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
import InfiniteScroll from 'react-infinite-scroll-component';
const HomePage = () => {
  // Desestructurando objetos desde reducers.
  // Quizas mejor no desestructurar, y atacar directamente las propiedades del objeto.
  // const {} = prestamos;

  const MySwal = withReactContent(swal);
  const history = useHistory();

  
  // Columnas para la tabla con ejemplares del prestamo seleccionado para editar (devoluciones)
  const ejemplaresCols = [
    {
      title: 'ISBN',
      dataIndex: ['ejemplar', 'isbn'],
      key: 'isbn',
    },
    {
      title: 'Titulo',
      render: (row, record, index) => (
        <div>
          {record.ejemplar.libro.nombre
            ? record.ejemplar.libro.nombre
            : 'no hay'}
        </div>
      ),
    },
    {
      title: 'Fecha Inicio',
      render: (row, record, index) => (
        <div>
          {record.ejemplar.fechaEntrega
            ? record.ejemplar.fechaEntrega
            : 'no hay fecha'}
        </div>
      ),
    },
    {
      title: 'Fecha Fin',
      render: (row, record, index) => (
        <div>
          {record.ejemplar.fechaFin
            ? record.ejemplar.fechaFin
            : 'no hay fecha!'}
        </div>
      ),
    },
  ];

  
  return (
    <>
      <h1>HomePage</h1>

      <div className='conta'>
        <div className='row'>
          <div className='col-12 col-md-3'>
            <Button>Editar mis datos</Button>
          </div>
          <div className='col-12 col-md-3'>
            <Button>ss</Button>
          </div>
          <div className='col-12 col-md-3'>
            <Button>
              VER LISTADO ALUMNOS ATRASADOS
            </Button>
          </div>
          <div className='col-12 col-md-3'>
            <Button
              onClick={() => {
                MySwal.fire({
                  title: 'Mostrar Reporte por mes',
                  html: (
                    <div>
                      <Calendario />
                    </div>
                  ),
                  showCancelButton: true,
                  confirmButtonColor: '#2B8EFB',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Aceptar',
                  cancelButtonText: 'Cancelar',
                });
              }}
            >
              Reporte Prestamos Mensual.
            </Button>
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <ul>
              <li>Listar</li>
              <li>Solicitar Prestamos</li>
              <li>Realizar Devoluciones</li>
              <li>Otras Acciones a realizar.</li>
            </ul>
          </div>
          <div className='col-12 col-md-6'>
            <h4>Prestamos Realizados.</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
