import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { AdministrationTable } from "../../components/common";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const HomePage = () => {
  const MySwal = withReactContent(swal);

  const columns = [
    { title: "Codigo", dataIndex: "codigo", key: "codigo" },
    { title: "Fecha Inicio", dataIndex: "fecha_inicio", key: "fecha_inicio" },
    { title: "Fecha Fin", dataIndex: "fecha_fin", key: "fecha_fin" },
  ];

  // esto despues sera el listado de prestamos, filtrados por el usuario logeado
  const data = [];

  return (
    <>
      <h1>HomePage</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6">
            otro contenido?...
          </div>
          <div className="col-12 col-md-6">
            <h4>Mis prestamos.</h4>
            <AdministrationTable columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
