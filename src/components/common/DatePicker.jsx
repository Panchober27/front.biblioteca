import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import 'moment/locale/es-mx';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/es_ES';

const DatePickerField = ({
  onChange,
  placeholder,
  dateFormat = 'DD-MM-YYYY',
  label = '',
  children,
  defaultValue = null,
}) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (defaultValue) {
      const m = moment(defaultValue);

      setDate(m.isValid() ? m : null);
    }
  }, [defaultValue]);

  return (
    <div className='field-container'>
      <label style={{ margin: 0 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <DatePicker
          style={{ width: '100%' }}
          value={date}
          placeholder={placeholder}
          locale={locale}
          onChange={(date, dateString) => {
            setDate(date);

            onChange(dateString);
          }}
          format={dateFormat}
          picker={dateFormat === 'MM-YYYY' ? 'month' : 'date'}
        />
        {children}
      </div>
    </div>
  );
};

export default DatePickerField;
