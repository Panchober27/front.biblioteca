import React, { useState, useEffect } from "react";
import Calendario from "./Calendario";
import { Button, Table, Row, Col } from "antd";
import {
  AdministrationTable,
  CustomModal,
  InputField,
} from "../../components/common";
import swal from "sweetalert2";
import { Tooltip, Modal } from "antd";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";

const HomePage = () => {
  const MySwal = withReactContent(swal);
  const history = useHistory();

  // hook de estado: El modal de detalles es visible o no.
  const [prestamoDetailsModalVisible, setPrestamoDetailsModalVisible] =
    useState(false);

  // hook de estado: Prestamo obtenido desde la tabla.
  const [prestamo, setPrestamo] = useState({});

  const columns = [
    { title: "Codigo", dataIndex: "codigo", key: "codigo" },
    { title: "Alumno", dataIndex: "alumno", key: "alumno" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Dias atraso", dataIndex: "diasAtraso", key: "diasAtraso" },
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (text, record) => (
        <div className="administration-actions-container">
          <Tooltip title="Ver detalle">
            <button style={{ border: "none" }}>
              <VscPreview
                className="administration-action-icon"
                style={{ fontSize: "20px", color: "#2B8EFB" }}
                onClick={() => {
                  setPrestamo(record);
                  setPrestamoDetailsModalVisible(true);
                }}
              />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Funcion para renderizar el modal con el detalle de cada prestamo.
  const renderPrestamoDetails = () => (
    // <CustomModal
    <Modal
      title="Detalle del prestamo"
      visible={prestamoDetailsModalVisible}
      width={900}
      destroyOnClose
      onCancel={() => {
        setPrestamo({});
        setPrestamoDetailsModalVisible(false);
      }}
      footer={
        <div className="administration-modal-footer">
          <Button
            type="danger"
            onClick={() => {
              setPrestamo({});
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
            <b>Codigo:</b> {prestamo.codigo}
          </p>
          {/* <InputField label="Codigo" defaultValue={prestamo.codigo} disabled={true} /> */}
        </Col>
        <Col span={12}>
          <p>
            <b>Alumno:</b> {prestamo.alumno}
          </p>
        </Col>
        <Col span={12}>
          <p>
            <b>Estado:</b> {prestamo.estado}
          </p>
        </Col>
        {/* si el prestamo tiene dias de atraso se muestra el dato, sino no */}
        {prestamo.diasAtraso > 0 ? (
          <Col span={12}>
            <p>
              <b>Dias de Atraso:</b> {prestamo.diasAtraso}
            </p>
          </Col>
        ) : null}
      </Row>
      {/* </CustomModal> */}
    </Modal>
  );

  // esto despues sera el listado de prestamos, filtrados por el usuario logeado
  const data = [
    { codigo: "1", alumno: "Juan", estado: "Prestado", diasAtraso: "0" },
    { codigo: "2", alumno: "Pedro", estado: "Prestado", diasAtraso: "1" },
    { codigo: "3", alumno: "Maria", estado: "Prestado", diasAtraso: "2" },
  ];

  // Opciones para la tabla de prestamos.
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

  return (
    <>
      <h1>HomePage</h1>

      <div className="conta">
        <div className="row">
          <div className="col-12 col-md-3">
            <Button>Editar mis datos</Button>
          </div>
          <div className="col-12 col-md-3">
            <Button>ss</Button>
          </div>
          <div className="col-12 col-md-3">
            <Button>ss</Button>
          </div>
          <div className="col-12 col-md-3">
            <Button>Reporte Prestamos Mensual.</Button>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
          Colocar calendario dentro de Scroll
          <Calendario />
          </div>
          <div className="col-12 col-md-6">
            <h4>Mis prestamos.</h4>
            <AdministrationTable
              size="small"
              columns={columns}
              options={prestamosTableOptions}
              dataSource={data}
            />
          </div>
        </div>
      </div>
      {renderPrestamoDetails()}
    </>
  );
};

// Reductores:
// - Prestamos filtrados por : prestamos del usuario en sesion y en estados vigentes o atrasados.

export default HomePage;
