import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const LoadingMessage = ({
  children,
}) => {
  
  const showLoadinMessage = (title) => {
    MySwal.fire({ title });
    MySwal.showLoading();
  };

  const hideLoadingMessage = () => {
    if (MySwal.isVisible) {
      MySwal.close();
    }
  };

  return <>{children}</>;
};

LoadingMessage.propTypes = {
  permissions: PropTypes.object,
};

const mapStateToProps = ({
  permissions,
}) => ({
  permissions,
});

export default connect(mapStateToProps)(LoadingMessage);
