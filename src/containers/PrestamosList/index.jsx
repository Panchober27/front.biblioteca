import React, { useState, useEffect } from "react";
import { InputField, AdministrationTable } from "../../components/common";
import { Drawer, Button, Tooltip, Menu } from "antd";
import { MenuOutlined, FileAddTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PrestamosList = () => {
  const { SubMenu } = Menu;

  // listado de prestamos.
  const [prestamosList, setPrestamosList] = useState([
    {
      prestamoId: 101,
      alumno: "Benjamin Meneses",
      ejemplares: [],
      fechaPrestamo: "18/05/2022",
      estado: "EN PRESTAMO",
    },
    {
      prestamoId: 125,
      alumno: "Carla Gonzalez",
      ejemplares: [],
      fechaPrestamo: "18/05/2022",
      estado: "EN PRESTAMO",
    },
    {
      prestamoId: 165,
      alumno: "Francisco Meneses",
      ejemplares: [],
      fechaPrestamo: "18/05/2022",
      estado: "EN PRESTAMO",
    },
  ]);

  // estado para el prestamo en record para drawer.
  const [selectedPrestamo, setSelectedPrestamo] = useState({});

  const columns = [
    { title: "Codigo", dataIndex: "prestamoId", key: "prestamoId" },
    { title: "Alumno", dataIndex: "alumno", key: "alumno" },
    // crear coolumna dinamica en base a la cantidad de ejemplares dentro del prestamo!!!
    { title: "Ejemplar(dinamic)", dataIndex: "ejemplares", key: "ejemplares" },
    {
      title: "Fecha de prestamo",
      dataIndex: "fechaPrestamo",
      key: "fechaPrestamo",
    },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    {
      title: "Acciones",
      dataIndex: "actions",
      // hidden: !hasPermission("ver-acciones-certificado", userPermissions),
      render: (row, record, index) => (
        <>
          <Tooltip title="Opciones Prestamo">
            <Menu mode="vertical" expandIcon={<MenuOutlined />}>
              <SubMenu key="sub1">
                <Menu.Item key="1">
                  <Button
                    onClick={() => {
                      setSelectedPrestamo(record);
                      setDrawerVisible(true);
                    }}
                  >
                    Ver detalle prestamo
                  </Button>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Tooltip>
        </>
      ),
    },
  ];

  // estado para validar visibilidad del drawer
  const [drawerVisible, setDrawerVisible] = useState(false);

  // funcion para renderizar Drawer con infromacion del prestamo seleccionado en la tabla.
  const renderPrestamoDrawer = () => {
    return (
      <>
        <Drawer
          title="Informacion del prestamo"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          width={500}
        >
          <div>
            <p style={{ color: "red" }}>EDITAR/ESILIZAR ESTO</p>
            <h5>Codigo: {selectedPrestamo.prestamoId}</h5>
            <h5>Alumno: {selectedPrestamo.alumno}</h5>
            <h5>Fecha de prestamo: {selectedPrestamo.fechaPrestamo}</h5>
            <h5>Estado: {selectedPrestamo.estado}</h5>
          </div>
        </Drawer>
      </>
    );
  };

  return (
    <>
      <h1>Listado Prestamos</h1>

      <Tooltip title="Ejemplo de tooltip" placement="right">
        <Link to="/cePrestamo">
          <Button
            type="primary"
            icon={<FileAddTwoTone />}
            size="large"
            style={{ marginBottom: "10px" }}
          >
            Nuevo Prestamo
          </Button>
        </Link>
      </Tooltip>
      <div className="container-fluid">
        <div className="row">
          <div className="col 12">
            <AdministrationTable columns={columns} dataSource={prestamosList} />
          </div>
        </div>
      </div>
      {renderPrestamoDrawer()}
    </>
  );
};

export default PrestamosList;
