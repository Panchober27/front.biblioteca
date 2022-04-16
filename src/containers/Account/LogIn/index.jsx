import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import LogInForm from "../../../shared/components/loginForm/LogInForm";
import { signin } from "../../../redux/reducers/authReducer";
import swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button } from "antd";

const LogIn = ({ signin }) => {
  const token = localStorage.getItem("token");

  const MySwal = withReactContent(swal);

  if (token) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div className="account account--not-photo">
        <div className="account__wrapper">
          <div className="account__card">
            <LogInForm
              onSubmit={({ userName, password }) =>
                signin({ userName, password })
              }
              form="log_in_form"
            />
          </div>
        </div>
      </div>
    );
  }
};
LogIn.propTypes = {
  signin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signin: ({ userName, password }) => dispatch(signin({ userName, password })),
});

export default connect(null, mapDispatchToProps)(LogIn);
