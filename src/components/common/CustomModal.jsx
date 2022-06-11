import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({
  title,
  visible,
  children,
  footer,
  width = 520,
  destroyOnClose = true,
}) => {
  return (
    <Modal
      destroyOnClose={destroyOnClose}
      title={title}
      visible={visible}
      footer={footer}
      closable={true}
      style={{ top: 20 }}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
