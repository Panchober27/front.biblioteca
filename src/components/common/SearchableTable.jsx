import React, { useState, useEffect } from 'react';
import { Space, Table, message, Menu, Dropdown } from 'antd';
import InputField from './Input';
import { GoThreeBars } from 'react-icons/go';

/**
 * Renderiza tabla la cual contiene un campo de búsqueda para todas las columnas
 * @param {object} param0
 * @param {object[]} param0.columns
 * @param {object[]} param0.dataSource
 * @param {object[]} param0.selectedData
 * @param {number | 0} param0.maxSelection
 * @param {string} param0.maxSelecctionMessage
 * @param {string} param0.rowKey
 * @param {function} param0.onChange
 * @param {{title:string, onClick:function}[]} param0.menuOptions
 */
const SearchableTable = ({
  columns,
  expandableRows = false,
  expandableItem,
  dataSource,
  maxSelection = 0,
  maxSelecctionMessage,
  rowKey,
  selectedData,
  onChange,
  menuOptions = [],
}) => {
  const [selectedTempData, setSelectedTempData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    let keys = [];

    if (selectedData) {
      for (const data of selectedData) {
        keys.push(data[rowKey]);
      }
    }

    setSelectedRows(keys);
  }, []);

  useEffect(() => {
    if (maxSelection > 0 && selectedData.length > maxSelection) {
      message.error(maxSelecctionMessage, 2.5);

      return;
    }

    onChange(selectedData);
  }, [selectedData]);

  const rowSelection = {
    selectedRowKeys: selectedRows,
    preserveSelectedRowKeys: true,
    hideSelectAll: true,
    onChange: (rowKeys, row) => {
      if (maxSelection > 0 && rowKeys.length > maxSelection) {
        message.error(maxSelecctionMessage, 2.5);

        return;
      }

      setSelectedRows(rowKeys);
      onChange(row);
    },
  };

  return (
    <Space direction='vertical'>
      <div
        style={{
          display: 'flex',
          flexdirection: 'row',
          alignItems: 'center',
        }}
      >
        <InputField
          allowClear={true}
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
        {menuOptions.length ? (
          <Dropdown
            overlay={
              <Menu>
                {menuOptions.map((option) => (
                  <Menu.Item key={option.title} onClick={option.onClick}>
                    {option.title}
                  </Menu.Item>
                ))}
              </Menu>
            }
            placement='bottomRight'
          >
            <GoThreeBars className='administration-menu-icon' />
          </Dropdown>
        ) : null}
      </div>
      <Table
        columns={columns}
        dataSource={
          selectedTempData.length ? [...selectedTempData] : [...dataSource]
        }
        size='small'
        scroll={{ y: 240 }}
        rowSelection={rowSelection}
        rowKey={(row) => row[rowKey]}
        pagination={{ showSizeChanger: false }}
        expandable={
          expandableRows
            ? {
                expandedRowRender: (record) => <p>{record.description}</p>,
                rowExpandable: (record) => record.name !== 'Not Expandable',
              }
            : null
        }
      />
    </Space>
  );
};

export default SearchableTable;
