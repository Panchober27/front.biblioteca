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
import {
  getPrestamosOfLoggedUser,
  clearPrestamosState,
} from '../../redux/reducers/prestamosReducer';
const HomePage = ({
  prestamos,
  getPrestamosOfLoggedUser,
  clearPrestamosState,
}) => {
  // Desestructurando objetos desde reducers.
  // Quizas mejor no desestructurar, y atacar directamente las propiedades del objeto.
  // const {} = prestamos;

  const MySwal = withReactContent(swal);
  const history = useHistory();

  // hook de estado: El modal de detalles es visible o no.
  const [prestamoDetailsModalVisible, setPrestamoDetailsModalVisible] =
    useState(false);

  // hook de estado: Modal para realizar devolucion de ejemplares.
  const [devolucionesModalVisible, setDevolucionesModalVisible] =
    useState(false);

  // hook de estado: Prestamo obtenido desde la tabla.
  const [prestamoData, setPrestamoData] = useState({});

  // HOOKS DE EFECTO
  useEffect(() => {
    getPrestamosOfLoggedUser();
  }, []);

  useEffect(() => {
    if (prestamos.onStartFetch) {
      MySwal.fire({
        title: 'Cargando Datos...',
      });
      MySwal.showLoading();
    } else {
      MySwal.close();
    }
  }, [prestamos.onStartFetch]);

  // Hook de efecto final: resetear los datos necesarios.
  useEffect(() => {
    return () => {
      clearPrestamosState();
    };
  }, []);


  // Columnas para la tabla con multiples prestamos.🐱‍👤
  const columns = [
    { title: 'Codigo', dataIndex: 'prestamoId', key: 'prestamoId' },
    { title: 'Ejemplares', dataIndex: 'ejemplares', key: 'ejemplares' },
    {
      title: 'Alumno',
      dataIndex: ['alumno', 'nombreAlumno'],
      key: 'alumno.nombres',
    },
    { title: 'Estado', dataIndex: 'estado', key: 'estado' },
    { title: 'Dias atraso', dataIndex: 'diasAtraso', key: 'diasAtraso' },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (row, record, index) => (
        <div className='administration-actions-container'>
          <Tooltip title='Ver detalle'>
            <button
              style={{ border: 'none' }}
              onClick={() => {
                setPrestamoData(record);
                setPrestamoDetailsModalVisible(true);
              }}
            >
              <VscPreview
                className='administration-action-icon'
                style={{ fontSize: '20px', color: '#2B8EFB' }}
                // onClick={() => {
                //   // setPrestamoData(record);
                //   setPrestamoDetailsModalVisible(true);
                // }}
              />
            </button>
          </Tooltip>

          {/* VALIDAR SI EL PRESTAMO ESTA PARA SER DEVUELTO */}

          <Tooltip title='Realizar Devolución'>
            <button style={{ border: 'none' }}>
              <AiOutlineFileDone
                className='administration-action-icon'
                style={{ fontSize: '20px', color: '#2B8EFB' }}
                onClick={() => {
                  setDevolucionesModalVisible(true);
                  // TODO: Obtener el prestamo seleccionado.
                  setPrestamoData(record);
                  // manipular datos para que el renderizado.
                }}
              />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];


  // Columnas para la tabla con ejemplares del prestamo seleccionado para editar (devoluciones)

  const columnsEjemplares = [
    { title: 'ISBN', dataIndex: '', key: '' },

  // Para renderizar las columnas de los ejemplares de manera correcta,
  // quizas recorrer y filtrar los ejemplares del prestamo seleccionado.
  // para poder manipular los datos dentro de la tabla ✌
    { title: '', dataIndex: '', key: '' },
    { title: '', dataIndex: '', key: '' },
  ]




  // Funcion para renderizar el modal con el detalle de cada prestamoData.
  const renderPrestamoDetails = () => (
    // <CustomModal
    <Modal
      title='Detalle del prestamoData'
      visible={prestamoDetailsModalVisible}
      width={900}
      destroyOnClose
      onCancel={() => {
        setPrestamoData({});
        setPrestamoDetailsModalVisible(false);
      }}
      footer={
        <div className='administration-modal-footer'>
          <Button
            type='danger'
            onClick={() => {
              setPrestamoData({});
              setPrestamoDetailsModalVisible(false);
            }}
          >
            Cerrar
          </Button>
        </div>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <p>
            <b>Codigo:</b>{' '}
            {prestamoData.prestamoId ? prestamoData.prestamoId : '----'}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <b>Alumno:</b>{' '}
            {prestamoData.alumno && prestamoData.alumno.nombreAlumno
              ? prestamoData.alumno.nombreAlumno
              : '----'}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <b>Estado:</b> {prestamoData.estado ? prestamoData.estado : '----'}
          </p>
        </Col>
        {/* si el prestamoData tiene dias de atraso se muestra el dato, sino no */}
        {prestamoData.diasAtraso > 0 ? (
          <Col span={12}>
            <p>
              <b>Dias de Atraso:</b> {prestamoData.diasAtraso}
            </p>
          </Col>
        ) : null}
        {prestamoData.usuario ? (
          <Col span={12}>
            <p>
              <b>Usuario Responsable:</b>{' '}
              {prestamoData.usuario.nombre +
                ' ' +
                prestamoData.usuario.apellido}
            </p>
          </Col>
        ) : null}
      </Row>
      {/* </CustomModal> */}
    </Modal>
  );

  // Funcion que renderiza Modal o Drawer
  // para reliazar devoluciones de ejemplares asociados al prestamo seleccionado.
  const renderDevolucionModal = () => (
    <>
      <Modal
        title='Realizar Devolución'
        visible={devolucionesModalVisible}
        width={900}
        destroyOnClose
        onCancel={() => {
          setDevolucionesModalVisible(false);
        }}
        footer={
          <div className='administration-modal-footer'>
            <Button
              type='danger'
              onClick={() => {
                setPrestamoData({});
                setDevolucionesModalVisible(false);
              }}
            >
              Cerrar
            </Button>
          </div>
        }
      >
        <Row gutter={16}>
          <Col span={12}>
            <SearchableTable
              columns={columns}
              dataSource={[]}
              rowKey='prestamoId'
              onChange={() => {
                console.log('cambio');
              }}
            />
          </Col>

          <Col span={12}>
            <p>
              <b>Estado:</b> {prestamoData.estado}
            </p>
            {prestamoData.usuario ? (
            <p>
              <b>Usuario Responsable:</b>{' '}
              {prestamoData.usuario.nombre +
                ' ' +
                prestamoData.usuario.apellido}
            </p>
            ) : null}

            {prestamoData.alumno ? (
            <p>
              <b>Alumno:</b> {`${prestamoData.alumno.nombreAlumno} ${prestamoData.alumno.apellidoAlumno}`}
            </p>
            ) : null}

          </Col>
        </Row>
      </Modal>
    </>
  );

  // esto despues sera el listado de prestamos, filtrados por el usuario logeado
  const data = [
    { codigo: '1', alumno: 'Juan', estado: 'Prestado', diasAtraso: '0' },
    { codigo: '2', alumno: 'Pedro', estado: 'Prestado', diasAtraso: '1' },
    { codigo: '3', alumno: 'Maria', estado: 'Prestado', diasAtraso: '2' },
  ];

  // Opciones para la tabla de prestamos.
  const prestamosTableOptions = [
    {
      title: 'Crear Nuevo Prestamo',
      onClick: () => {
        // enviar a ruta /cePrestamo
        // enviar id si es revision de datos.
        history.push('/cePrestamo');
      },
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
            <Button>ss</Button>
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
              <li>Datos del Usuario?</li>
              <li>Calendario?</li>
              <li> :( </li>
            </ul>
          </div>
          <div className='col-12 col-md-6'>
            <h4>Mis prestamos.</h4>
            <AdministrationTable
              size='small'
              columns={columns}
              options={prestamosTableOptions}
              dataSource={prestamos.data ? [...prestamos.data] : []}
            />
          </div>
        </div>
      </div>
      {renderPrestamoDetails()}
      {renderDevolucionModal()}
    </>
  );
};

// Reductores:
// - Prestamos filtrados por : prestamos del usuario en sesion y en estados vigentes o atrasados.
// - Modificar datos del usuario. (restringidos!)

const mapStateToProps = ({ prestamos }) => ({
  prestamos,
});

const mapDispatchToProps = (dispatch) => ({
  getPrestamosOfLoggedUser: () => dispatch(getPrestamosOfLoggedUser()),
  clearPrestamosState: () => dispatch(clearPrestamosState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
