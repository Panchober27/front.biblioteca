import React, { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input } from "antd";

/**
 *  Estilos y demases para el input.
 * Quizas esto se pueda armar dentro de un SearchebleInput
 *
 * cambiar color del background de la sugerencia seleccionada.
 *
 *
 */

// Debe recibir por props una funcion para setear el estado de la direccion del cliente
// o de la ubicacion!
// divisiones del cliente (nombre pais o id)
const Places = ({ clientData, setClientData }) => {
  const [address, setAddress] = useState("");
  // funcion para editar data del cliente.
  const onCLientDataChange = (name, value) => {
    setClientData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      onCLientDataChange(
        "cliente_comuna",
        results[0].address_components[3].long_name
      );
      onCLientDataChange(
        "cliente_ciudad",
        results[0].address_components[4].long_name
      );
      onCLientDataChange(
        "cliente_region",
        results[0].address_components[5].long_name
      );
      onCLientDataChange("cliente_direccion", address);
    } catch (err) {
      console.error(err);
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Warning",
        text: "La dreccion es insuficiente",
        icon: "error",
      });
    }
  };

  // Hook de estado para restringir la busqueda de direcciones a 1 o más paises.
  const [countryRestrict, setCountryRestrict] = useState(["CL"]);

  const componentRestrictions = {
    country: countryRestrict,
  };

  console.log(clientData.cliente_direccion);

  // NO styled component.
  return (
    <Fragment>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={{ componentRestrictions }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              // buscar como hacer con defaultValue, en vez de con placeholder.
              {...getInputProps({
                placeholder: clientData.cliente_direccion
                  ? clientData.cliente_direccion
                  : "",
              })}
            />
            {/* Sugerencias! */}
            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#18f927" : "#fff",
                  fontSize: "16px",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {/* <p>Latitude: {coordinates.lat}</p>
      <p>Longitude: {coordinates.lng}</p>
      <p>Address to DB: {address}</p> */}
    </Fragment>
  );
};

export default Places;
