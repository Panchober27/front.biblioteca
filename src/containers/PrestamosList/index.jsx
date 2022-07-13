import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getPrestamosOfLoggedUser,
  clearUserPrestamosState,
} from '../../redux/reducers/userPrestamosReducer';

import { useHistory } from "react-router-dom";
import {
  InputField,
  AdministrationTable,
  SearchableTable,
} from "../../components/common";
import { Drawer, Button, Tooltip, Modal, Row, Col } from "antd";
import { MenuOutlined, FileAddTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { VscPreview } from "react-icons/vsc";
import { AiOutlineFileDone } from "react-icons/ai";
// importar moment
import moment from "moment";

const PrestamosList = ({
  userPrestamos,
  getPrestamosOfLoggedUser,
  clearPrestamosState,
}) => {
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

  // Hook de estado para arreglo de ejemplares que se les realizara una devolucion.
  // caso de uso: alumno retorna 2 libros de un prestamo, usuario selecciona esos libros y se guardan en este hook.
  const [selectedEjemplares, setSelectedEjemeplares] = useState([{}]);

  // Columnas para la tabla con multiples userPrestamos.🐱‍👤
  const columns = [
    { title: "Codigo", dataIndex: "prestamoId", key: "prestamoId" },
    { title: "Ejemplares", dataIndex: "ejemplares", key: "ejemplares" },
    {
      title: "Alumno",
      dataIndex: ["alumno", "nombreAlumno"],
      key: "alumno.nombres",
    },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Dias atraso", dataIndex: "diasAtraso", key: "diasAtraso" },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (row, record, index) => (
        <div className="administration-actions-container">
          <Tooltip title="Ver detalle">
            <button
              style={{ border: "none" }}
              onClick={() => {
                setPrestamoData(record);
                setPrestamoDetailsModalVisible(true);
              }}
            >
              <VscPreview
                className="administration-action-icon"
                style={{ fontSize: "20px", color: "#2B8EFB" }}
                // onClick={() => {
                //   // setPrestamoData(record);
                //   setPrestamoDetailsModalVisible(true);
                // }}
              />
            </button>
          </Tooltip>

          {/* VALIDAR SI EL PRESTAMO ESTA PARA SER DEVUELTO */}

          <Tooltip title="Realizar Devolución">
            <button style={{ border: "none" }}>
              <AiOutlineFileDone
                className="administration-action-icon"
                style={{ fontSize: "20px", color: "#2B8EFB" }}
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
  const ejemplaresCols = [
    {
      title: "ISBN",
      dataIndex: ["ejemplar", "isbn"],
      key: "isbn",
    },
    {
      title: "Titulo",
      render: (row, record, index) => (
        <div>
          {record.ejemplar.libro.nombre
            ? record.ejemplar.libro.nombre
            : "no hay"}
        </div>
      ),
    },
    {
      title: "Fecha Inicio",
      render: (row, record, index) => (
        <div>
          {record.ejemplar.fechaEntrega
            ? record.ejemplar.fechaEntrega
            : "no hay fecha"}
        </div>
      ),
    },
    {
      title: "Fecha Fin",
      render: (row, record, index) => (
        <div>
          {record.ejemplar.fechaFin
            ? record.ejemplar.fechaFin
            : "no hay fecha!"}
        </div>
      ),
    },
  ];

  // Opciones para la tabla de userPrestamos.
  const prestamosTableOptions = [
    {
      title: "Crear Nuevo Prestamo",
      onClick: () => {
        // enviar a ruta /cePrestamo
        // enviar id si es revision de datos.
        history.push("/cePrestamo");
      },
    },
  ];

  // HOOKS DE EFECTO
  useEffect(() => {
    getPrestamosOfLoggedUser();
  }, []);

  useEffect(() => {
    if (userPrestamos.onStartFetch) {
      MySwal.fire({
        title: "Cargando Datos...",
      });
      MySwal.showLoading();
    } else {
      MySwal.close();
    }
  }, [userPrestamos]);

  // Hook de efecto final: resetear los datos necesarios.
  useEffect(() => {
    return () => {
      clearPrestamosState();
    };
  }, []);

  // Funcion para renderizar el modal con el detalle de cada prestamoData.
  const renderPrestamoDetails = () => (
    // <CustomModal
    <Modal
      title="Detalle del prestamoData"
      visible={prestamoDetailsModalVisible}
      width={900}
      destroyOnClose
      onCancel={() => {
        setPrestamoData({});
        setPrestamoDetailsModalVisible(false);
      }}
      footer={
        <div className="administration-modal-footer">
          <Button
            type="danger"
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
            <b>Codigo:</b>{" "}
            {prestamoData.prestamoId ? prestamoData.prestamoId : "----"}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <b>Alumno:</b>{" "}
            {prestamoData.alumno && prestamoData.alumno.nombreAlumno
              ? prestamoData.alumno.nombreAlumno
              : "----"}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <b>Estado:</b> {prestamoData.estado ? prestamoData.estado : "----"}
          </p>
        </Col>

        <Col span={12}>
          <p>
            <b>Fecha Inicio:</b>{" "}
            {prestamoData.fechaInicio
              ? moment(prestamoData.fechaInicio).format("DD-MM-YYYY")
              : "----"}
          </p>
        </Col>

        <Col span={12}>
          <p>
            <b>Fecha Termino:</b>{" "}
            {prestamoData.fechaFin
              ? moment(prestamoData.fechaFin).format("DD-MM-YYYY")
              : "----"}
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
              <b>Usuario Responsable:</b>{" "}
              {prestamoData.usuario.nombre +
                " " +
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
        title="Realizar Devolución"
        visible={devolucionesModalVisible}
        width={900}
        destroyOnClose
        onCancel={() => {
          setDevolucionesModalVisible(false);
        }}
        footer={
          <div className="administration-modal-footer">
            <Button
              type="danger"
              onClick={() => {
                setPrestamoData({});
                setDevolucionesModalVisible(false);
              }}
            >
              Cerrar
            </Button>
            <Button
              type="primary"
              onClick={() => {
                // alert('new button');
                MySwal.fire({
                  title: "Actualizar Prestamo",
                  text: "Crear validacion, en caso de que e entreguen todos o el ultimo ejemplar!🐱‍👤",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Si, realizar devolución!",
                  cancelButtonText: "Cancelar",
                }).then((result) => {
                  if (result.value) {
                    // TODO: Realizar devoluciones de ejemplares.
                    // usar contador de array de ejemplares???
                    // cuando el contador llegue a 0, se termina el prestamo🐱‍👤.
                  }
                });
              }}
            >
              Guardar Cambios
            </Button>
          </div>
        }
      >
        <button
          onClick={() => {
            console.log(prestamoData);
          }}
        >
          Ver Prestamos Data.
        </button>
        <Row gutter={16}>
          <Col span={12}>
            <SearchableTable
              columns={ejemplaresCols}
              dataSource={
                prestamoData.prestamoEjemplars
                  ? [...prestamoData.prestamoEjemplars]
                  : []
              }
              rowKey="prestamoId"
              onChange={(row) => {
                setSelectedEjemeplares(row);
              }}
            />
            <p>Ejemplares a devolver:</p>

            {selectedEjemplares && selectedEjemplares.length > 0 ? (
              <ul>
                {selectedEjemplares.map((ejemplar) => (
                  <li key={ejemplar.ejemplarId}>
                    {ejemplar.ejemplarId} -
                    {ejemplar.ejemplar && ejemplar.ejemplar.libro ? (
                      <>{ejemplar.ejemplar.libro.nombre}</>
                    ) : ejemplar.ejemplar && ejemplar.ejemplar.revista ? (
                      <>{ejemplar.ejemplar.revista.nombre}</>
                    ) : ejemplar.ejemplar && ejemplar.ejemplar.trabajo ? (
                      <>{ejemplar.ejemplar.trabajo.nombre}</>
                    ) : null}
                    {/* TODO:
                        Armar vista de los ejemplares que se estan
                        guardando para ser devueltos.
                     */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay ejemplares seleccionados</p>
            )}
          </Col>
          <Col span={12}>
            <p>
              <b>Estado:</b> {prestamoData.estado}
            </p>
            {prestamoData.usuario ? (
              <p>
                <b>Usuario Responsable:</b>{" "}
                {prestamoData.usuario.nombre +
                  " " +
                  prestamoData.usuario.apellido}
              </p>
            ) : null}
            {prestamoData.alumno ? (
              <p>
                <b>Alumno:</b>{" "}
                {`${prestamoData.alumno.nombreAlumno} ${prestamoData.alumno.apellidoAlumno}`}
              </p>
            ) : null}
            <p>
              <b>Fecha Inicio:</b>
              {moment(prestamoData.fechaInicio).format("DD-MM-YYYY")}
            </p>
            <p>
              <b>Fecha Fin:</b>
              {moment(prestamoData.fechaFin).format("DD-MM-YYYY")}
            </p>
          </Col>
        </Row>
      </Modal>
    </>
  );

  return (
    <>
      <h2>Nueva vista de userPrestamos.</h2>
      <AdministrationTable
        size="small"
        columns={columns}
        options={prestamosTableOptions}
        dataSource={userPrestamos.data ? [...userPrestamos.data] : []}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12"></div>
        </div>
      </div>

      {renderPrestamoDetails()}
      {renderDevolucionModal()}
    </>
  );
};

const mapStateToProps = ({ userPrestamos }) => ({
  userPrestamos,
});

const mapDispatchToProps = (dispatch) => ({
  getPrestamosOfLoggedUser: () => dispatch(getPrestamosOfLoggedUser()),
  clearUserPrestamosState: () => dispatch(clearUserPrestamosState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrestamosList);
