import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { AdministrationTable } from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {useHistory} from "react-router-dom";

const HomePage = () => {
  const MySwal = withReactContent(swal);
  const history = useHistory();

  const columns = [
    { title: "Codigo", dataIndex: "codigo", key: "codigo" },
    { title: "Alumno", dataIndex: "alumno", key: "alumno" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Dias atraso", dataIndex: "diasAtraso", key: "diasAtraso" },
  ];

  // esto despues sera el listado de prestamos, filtrados por el usuario logeado
  const data = [];

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
          <div className="col-12 col-md-6">otro contenido?...</div>
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
    </>
  );
};

// Reductores:
// - Prestamos filtrados por : prestamos del usuario en sesion y en estados vigentes o atrasados.

export default HomePage;
