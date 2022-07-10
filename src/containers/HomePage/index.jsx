import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Calendario from "./Calendario";
import { Button, Carousel, Row, Col, Tooltip, Modal } from "antd";
// importar moment para trabajar con fechas
import moment from "moment";

import { getUploads } from "../../redux/reducers/uploadsReducer";

import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";
import { AiOutlineFileDone } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const HomePage = () => {
  // Desestructurando objetos desde reducers.
  // Quizas mejor no desestructurar, y atacar directamente las propiedades del objeto.
  // const {} = prestamos;

  const MySwal = withReactContent(swal);
  const history = useHistory();


  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };



  return (
    <>
      <h1>HomePage</h1>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Carousel
          autoplay
          style={{ width: "50%" }}
          effect="fade"
        >
          <div style={{}}>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div style={{}}>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div style={{}}>
            <h3 style={contentStyle}>3</h3>
          </div>
        </Carousel>
      </div> */}

      <p style={{ textAlign: "center" }}>
        Demo para subir archivo al servidor <br />
        el servidor lee estos archivos y actualiza la base de datos.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <input
          type="file"
          name="files"
          id="iput-file"
          multiple
        />
        <button type="button">
          Subir
        </button>
      </div>

      {/* <div className='container-fluid'>
        <div className='row'>
            <ul>
              <li>Listar</li>
              <li>Solicitar Prestamos</li>
              <li>Realizar Devoluciones</li>
              <li>Otras Acciones a realizar.</li>
            </ul>
        </div>
      </div> */}
    </>
  );
};

const mapStateToProps = ({ uploads }) => ({
  uploads,
});

const mapDispatchToProps = (dispatch) => ({
  getUploads: () => dispatch(getUploads()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
