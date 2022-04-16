import React, { Fragment } from "react";
import { Button } from "antd";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";




const HomePage = () => {

  const MySwal = withReactContent(swal);

  return (
    <Fragment>
      <h1>HomePage</h1>
      <p>Boton para probar los sweetAlert!</p>
      <Button
        type="primary"
        onClick={() => {
          // alert("Hola mundo!");
          MySwal.fire({
            title: "Hola mundo!",
            text: "Este es un mensaje de prueba",
            icon: "success",
            confirmButtonText: "Cool"
          });
        }}
      >
        demo
      </Button>






      
    </Fragment>
  );
};

export default HomePage;
