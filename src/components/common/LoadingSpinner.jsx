import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = () => {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        padding: 5,
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined style={{ color: '#3EA4FC', fontSize: 30 }} spin />
        }
        size='large'
      />
    </div>
  );
};

export default LoadingSpinner;
