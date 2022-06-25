import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getEjemplares,
  clearEjemplaresState,
} from '../../redux/reducers/ejemplaresReducer';
import { Button, Drawer, Row, Col, Tooltip, Modal } from "antd";
// importar moment para trabajar con fechas
import moment from "moment";
import {
  AdministrationTable,
  SearchableTable,
  CustomModal,
  InputField,
} from "../../components/common";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";
import { AiOutlineFileDone } from "react-icons/ai";

/**
 * Este componente contiene el mantenedor de ejemplares[libros, revistas, trabajos]
 *
 */
const Books = ({ ejemplares, getEjemplares, clearEjemplaresState }) => {


  const MySwal = withReactContent(swal);
  const history = useHistory();

  // Hook de estado: Ejemplar a crear/editar.
  const [ejemplarData, setEjemplarData] = useState({});

  // Hook de estado: Si el Drawer para editar/darDeBaja/darDeAlta un ejemplar.
  const [ejemplarDrawerVisible, setEjemplarDrawerVisible] = useState(false);


  // Hook de efecto inicial.
  useEffect(() => {
    // Obtener los ejemplares.
    // getEjemplares();
  },[]);

  // useEffect(() => {
  //   if (ejemplares.onStartFetch) {
  //     MySwal.fire({
  //       title: 'Cargando Ejemplares...',
  //     });
  //     MySwal.showLoading();
  //   } else {
  //     MySwal.close();
  //   }
  // }, [ejemplares.onStartFetch]);

  // Hook de efecto final: resetear los datos necesarios.
  useEffect(() => {
    return () => {
      clearEjemplaresState();
    };
  }, []);



  const ejemplaresColumns = [
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    { title: "USA RENDER! para los titulos", dataIndex: "none", key: "none" },
    // Tipo/ diferencia si es libro, revista o trabajo.
    {
      title: "Acciones",
      dataIndex: "acciones",
      key: "acciones",
      render: (text, record) => (
        <span>
          <Tooltip title="Opciones Ejemplar">
            <Button
              type="primary"
              shape="circle"
              icon={<VscPreview />}
              onClick={() => {
                setEjemplarData(record);
                setEjemplarDrawerVisible(true);
              }}
            />
          </Tooltip>
        </span>
      ),
    },
  ];



  // Funcion que renderiza el Drawer para editar/crear un ejemplar.
  const renderEjemplarDrawer = () => (
    <Drawer
        title="Opciones Ejemplar"
        placement="right"
        closeOnClick={false}
        onClose={() => setEjemplarDrawerVisible(false)}
        visible={ejemplarDrawerVisible}
        width={500}
    >
        Formulario para Mantener Ejemplar ✌
        {JSON.stringify(ejemplarData)}

    </Drawer>
  );




  return (
    <>
      <h1 style={{ textAlign: "center" }}>Ejemplares</h1>
      <h3>3 Tablas?</h3>
      <AdministrationTable
        columns={ejemplaresColumns}
        // dataSource={ejemplares.data ? [...ejemplares.data] : []}
        dataSource={[]}
        pagination={true}
        pageSize={4}
      />
      {renderEjemplarDrawer()}
    </>
  );
};

// Reductores.

// Listado de ejemplares.
//  - Libros
//  - Revistas
//  - Trabajos
//
// Se debe poder filtrar por mas cosas como por ejemplo, mas atributos para los libros.

const mapStateToProps = ({ ejemplares }) => ({
  ejemplares,
});


const mapDispatchToProps = (dispatch) => ({
  getEjemplares: () => dispatch(getEjemplares()),
  clearEjemplaresState: () => dispatch(clearEjemplaresState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);

