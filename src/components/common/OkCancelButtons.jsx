import React from 'react';
import { Button } from 'antd';

const OkCancelButtons = ({
  okTitle,
  cancelTitle,
  onOkClick,
  onCancelClick,
  className = '',
  okButtonStyle = {},
  cancelButtonStyle = {},
  withExtraButton = false,
  extraButtonTitle = '',
  extraButtonStyle = {},
  onExtraButtonClick,
}) => {
  return (
    <div className={className} key='buttons'>
      <Button
        key='cancel'
        type='primary'
        danger
        onClick={onCancelClick}
        style={cancelButtonStyle}
      >
        {typeof cancelTitle === 'function' ? cancelTitle() : cancelTitle}
      </Button>
      {withExtraButton ? (
        <Button
          key='extra'
          type='primary'
          onClick={onExtraButtonClick}
          style={extraButtonStyle}
        >
          {typeof extraButtonTitle === 'function'
            ? extraButtonTitle()
            : extraButtonTitle}
        </Button>
      ) : null}
      <Button
        key='save'
        type='primary'
        onClick={onOkClick}
        style={okButtonStyle}
      >
        {typeof okTitle === 'function' ? okTitle() : okTitle}
      </Button>
    </div>
  );
};

export default OkCancelButtons;
