import React, { useState, useEffect } from "react";
import { InputField, AdministrationTable } from "../../components/common";
import { Drawer, Button, Tooltip, Menu, Panel, Collapse } from "antd";
import { MenuOutlined, FileAddTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PrestamosList = () => {
  const { SubMenu } = Menu;
  const { Panel } = Collapse;

  // hook de estado: Cual panel esta activo.
  const [activePanel, setActivePanel] = useState("0");



  // hook de estado: Filtros para busqueda de prestamos.
  // filtros pueden ser: [fechas, usuario, estado, titulo(nombre:libro(ejemplar))]
  const [filters, setFilters] = useState({});



  // columnas para la tabla principal de prestamos.
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
  ];

  return (
    <>
      <h1 style={{textAlign: "center"}}>Listado Prestamos</h1>

      <Collapse
        accordion
        defaultActiveKey={["1"]}
        activeKey={activePanel}
        destroyInactivePanel
        // onChange={(activePanel) => setActivePanel(activePanel === '1' ? '1' : '0')}
      >
        <Panel
          className="certification-panel"
          header={
            <h4
              onClick={() => {
                activePanel === 1 ? setActivePanel(0) : setActivePanel(1);
              }}
            >
              Filtros de Busqueda
            </h4>
          }
          extra={
            <>
              <Tooltip title="Agregar">
                <Button>
                  <FileAddTwoTone />
                </Button>
              </Tooltip>
            </>
            // <CertMenu showExcel={showExcel} downloadExcel={downloadExcel} />
          }
          key="1"
        >
          <p>
            Formulario con filtros.
          </p>
          {/* <CertFilters
            filterCerts={filterCerts}
            filters={filters}
            setFilters={setFilters}
            cleanFiltersFields={cleanFiltersFields}
            divisions={divisions.divisions}
            onSubmit={(e) => console.log(e)}
          /> */}
        </Panel>
      </Collapse>

      <Tooltip title="Ejemplo de tooltip" placement="right">
        <Link to="/cePrestamo">
          {/* ENVIAR POR ROUTER EL ID DEL PRESTAMO A EDITAR (SI ES EDICIÓN) */}
        </Link>
      </Tooltip>

      {/* <div className="container-fluid">
        <div className="row">
          <div className="col 12">
            <AdministrationTable
              columns={columns}
              dataSource={[]}
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PrestamosList;
