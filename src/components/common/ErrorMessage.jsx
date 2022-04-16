import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

const ErrorMessage = ({
  permissions,
  children,
}) => {
  useEffect(() => {
    if (
      permissions.onErrorFetch
    ) {
      message.error(
        permissions.onErrorFetch,
        2.5
      );
    }
  }, [
    permissions.onErrorFetch,
  ]);

  return <>{children}</>;
};

ErrorMessage.propTypes = {
  permissions: PropTypes.object,
};

const mapStateToProps = ({
  permissions,
}) => ({
  permissions,
});

export default connect(mapStateToProps)(ErrorMessage);
