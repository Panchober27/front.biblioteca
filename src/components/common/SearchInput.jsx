import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, AutoComplete } from 'antd';

/**
 * Renderiza un componente para realizar busquedas en base de datos.
 * @param {object} param0
 * @param {callback} param0.onSearch
 * @param {callback} param0.onSelect
 * @param {boolean} param0.disabled
 * @param {object[]} param0.values
 * @param {'DEFAULT' | 'ALUMNOS' | 'CLIENT' | 'CLIENTS_LOCATION' | 'ACTIVES'} param0.type
 * @returns
 */
const SearchInput = ({
  onSearch,
  disabled = false,
  values = [],
  onSelect,
  type = 'DEFAULT',
  label = '',
  defaultValue = null,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [open, setOpent] = useState(false);

  const { Search } = Input;

  useEffect(() => {
    const optionsValues = [];

    if (values) {
      for (let val of values) {
        let label = '';
        let value = '';

        if (type === 'CLIENT') {
          label = `${val.cliente_nombre} (${val.cliente_rut})`;
          value = val.cliente_id;
        } else if (type === 'CLIENTS_LOCATION') {
          value = val.clientes_ubicaciones_clie_ubi_id;
          label = `${val.clientes_ubicaciones_clie_ubi_nombre} (${val.clientes_ubicaciones_clie_ubi_direccion})`;
        } else if (type === 'ACTIVES') {
          value = val.activo_id;
          label = val.activo_tipo_equipo;
        } else if(type === 'ALUMNOS') {
          value = val.alumno_id;
          label = `${val.alumno_nombres} (${val.alumno_rut})`;
        } else {
          label = val.label;
          value = val.value;
        }

        optionsValues.push({
          label,
          value: `${value}`,
        });
      }

      setOptions(optionsValues);
      setOpent(true);
    }
  }, [values, type]);

  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className='field-container'>
      <span>{label}</span>
      <AutoComplete
        onSelect={(val, opt) => {
          const { value, label } = opt;

          setSelectedValue(label);
          setOpent(false);

          onSelect({ value, label });
        }}
        open={open}
        style={{ width: '100%' }}
        disabled={disabled}
        options={options}
        value={selectedValue}
        onChange={(e) => setSelectedValue(e)}
      >
        <Search onSearch={onSearch} enterButton />
      </AutoComplete>
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  values: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.string
  ),
  type: PropTypes.string,
};

export default SearchInput;
