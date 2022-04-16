import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';

const InputNumberField = ({
  min = 0,
  max = Number.MAX_VALUE,
  onChange,
  decimal = true,
  value = '',
  step = '0.01',
  clear = false,
  label = '',
  children,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (clear) {
      setInputValue('');
    }
  }, [clear]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className='field-container'>
      <span>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputNumber
          placeholder={placeholder}
          value={inputValue}
          style={{ width: '100%' }}
          defaultValue={() => {
            if (!decimal) {
              return '';
            }

            return value ? value : 0;
          }}
          parser={(value) => value.replace(/,/g, '.')}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            setInputValue(e);

            onChange(e);
          }}
          stringMode={decimal}
        />
        {children}
      </div>
    </div>
  );
};

export default InputNumberField;
