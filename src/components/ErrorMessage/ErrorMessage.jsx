import PropTypes from "prop-types";
import React from "react";
import { Alert } from "react-bootstrap";
import errorImage from "../../images/error.png";
import Header from "../Header/index";

function ErrorMessage(props) {
  const { message = "Please, try to reload your page." } = props;
  return (
    <div>
      <Header />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img
          src={errorImage}
          alt="ErrorMessage"
          className="w-50 d-flex mx-auto mb-5"
        />
        <Alert
          variant="danger"
          style={{
            minWidth: 320,
            textAlign: "center",
          }}
        >
          Oops, something went wrong.
          <div>{message}</div>
        </Alert>
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
