import React, { useState } from 'react';
import { Table, Menu, Dropdown } from 'antd';
import { GoThreeBars } from 'react-icons/go';
import InputField from './Input';

const { Item } = Menu;

/**
 * Renderiza tabla para administración de datos
 * @param {object} params
 * @param {object[]} params.columns columnas a mostrar en tabla
 * @param {object []} params.dataSource datos a mostrar en tabla
 * @param {string} params.rowKey llave a usar para cada fila de tabla
 * @param {{title: string, onClick: function}} params.options opciones a renderizar en menú de tabla
 * @param {string} params.tableTitle titúlo a mostrar en tabla
 */
const AdministrationTable = ({
  columns,
  dataSource,
  rowKey,
  options = [],
  tableTitle = '',
  pageSize = 10,
}) => {
  const [selectedTempData, setSelectedTempData] = useState([]);

  const menu = (
    <Menu>
      {options.map((option) => (
        <Item key={option.title} onClick={option.onClick}>
          {option.title}
        </Item>
      ))}
    </Menu>
  );

  return (
    <Table
      bordered
      size='small'
      columns={columns}
      dataSource={
        selectedTempData.length ? [...selectedTempData] : [...dataSource]
      }
      pageSize={pageSize}
      scroll={{ y: 240 }}
      rowKey={(row) => row[rowKey]}
      pagination={{ showSizeChanger: false }}
      title={() => (
        <div className='administration-menu-container-table'>
          <h4>{tableTitle}</h4>
          <InputField
            isTableSearch={true}
            allowClear={true}
            maxLength={50}
            placeholder='Buscar en tabla'
            onChange={(e) => {
              const foundedData = dataSource.filter((x) => {
                const keys = Object.keys(x);
                for (const key of keys) {
                  if (String(x[key]).toLowerCase().includes(e.toLowerCase())) {
                    return true;
                  }
                }
              });
              setSelectedTempData(foundedData);
            }}
          />
          {options.length ? (
            <Dropdown overlay={menu} placement='bottomRight'>
              <GoThreeBars className='administration-menu-icon' />
            </Dropdown>
          ) : null}
        </div>
      )}
    />
  );
};

export default AdministrationTable;
