import React, { useState, useEffect } from 'react';
import { Select, message } from 'antd';

const SelectField = ({
  defaultValue,
  data = [],
  placeholder,
  onChange,
  clear = false,
  multiple = false,
  onDeselect,
  maxSelection = 0,
  keyValue = 'value',
  keyTitle = 'title',
  label = '',
  disabled = false,
}) => {
  const [value, setValue] = useState(null);

  const { Option } = Select;

  useEffect(() => {
    if (clear) {
      setValue(null);

      onChange(null, null);
    }
  }, [clear]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className='field-container'>
      <span>{label}</span>
      <Select
        disabled={disabled}
        mode={multiple ? 'multiple' : ''}
        value={value}
        style={{ width: '100%' }}
        placeholder={placeholder}
        onDeselect={multiple ? onDeselect : () => {}}
        onChange={(value, option) => {
          if (multiple) {
            if (maxSelection >= 1 && value.length > maxSelection) {
              message.error(
                `Solo puede seleccionar un máximo de ${maxSelection} opciones`
              );

              return;
            }
          }

          setValue(value);

          if (onChange) {
            onChange(value, option);
          }
        }}
      >
        {[...data]
          .filter(
            (e, i, self) =>
              i ===
              self.findIndex(
                (t) =>
                  t[keyValue] === e[keyValue] && t[keyTitle] === e[keyTitle]
              )
          )
          .map((d, i) => (
            <Option key={`${i}`} value={d[keyValue]}>
              {d[keyTitle]}
            </Option>
          ))}
      </Select>
    </div>
  );
};

export default SelectField;
