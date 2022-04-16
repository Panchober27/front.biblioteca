import React, { useState, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

/**
 * Componente el cual renderiza campo de tipo texto, para el ingreso de datos
 * @param {object} param0
 * @param {string} param0.placeholder
 * Mesaje a mostrar para indicar instrucción
 * @param {function} param0.onChange
 * Función que retorna valor ingresado
 * @param {number | 1} param0.lines
 * Determina número máximo de lineas a ingresar. Si valor es mayor a 1 se reemplaza input por textarea
 * @param {boolean | false} param0.withButton
 * Muestra boton junto a input para ejecutar alguna acción
 * @param {boolean | false} param0.disabled
 * Habilita input para ingreso de datos
 * @param {string | 'Buscar'} param0.buttonTitle
 * Título a mostrar en botón
 * @param {string | ''} param0.defaultValue
 * Valor por defecto a mostrar en input
 * @param {function} param0.buttonFunction
 * Función a ejecutar al presionar botón
 * @param {string} param0.label label a mostrar junto a input
 * @param {number} param0.maxLength Determina largo máximo para escribir
 */
const InputField = ({
  placeholder,
  onChange,
  lines = 1,
  withButton = false,
  disabled = true,
  buttonTitle = 'Buscar',
  buttonFunction,
  allowClear = false,
  defaultValue = '',
  label = '',
  maxLength,
  isTableSearch = false,
}) => {
  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setTextValue(defaultValue);
    }
  }, [defaultValue]);

  if (lines > 1) {
    const { TextArea } = Input;

    return (
      <div className='field-container'>
        <span>{label}</span>
        <TextArea
          rows={lines}
          value={textValue}
          placeholder={placeholder}
          onChange={(e) => {
            const text = e.target.value;

            setTextValue(text);
            onChange(text);
          }}
          maxLength={maxLength}
          showCount={maxLength ? true : false}
        />
      </div>
    );
  }

  if (withButton) {
    return (
      <Input.Group style={{ display: 'flex', flexDirection: 'row' }}>
        <span>{label}</span>
        <Input
          value={textValue}
          disabled={disabled}
          onChange={(e) => {
            const text = e.target.value;
            setTextValue(text);
            onChange(text);
          }}
        />
        <Button type='primary' onClick={buttonFunction} disabled={disabled}>
          {buttonTitle === 'Buscar' ? <SearchOutlined /> : buttonTitle}
        </Button>
      </Input.Group>
    );
  }

  return (
    // <div className={isTableSearch ? 'field-table-container' : 'field-container'}>
    <div className={'field-container'}>
      <span>{label}</span>
      <Input
        value={textValue}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={(e) => {
          const text = e.target.value;
          setTextValue(text);
          onChange(text);
        }}
        disabled={!disabled}
        allowClear={allowClear}
      />
    </div>
  );
};

export default InputField;
