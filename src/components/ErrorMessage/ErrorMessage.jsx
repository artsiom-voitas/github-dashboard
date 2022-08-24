import PropTypes from 'prop-types';
import React from 'react';
import { Alert } from 'react-bootstrap';
import errorImage from '../../images/error.png';
import Header from '../Header/';

const ErrorMessage = React.memo(function ErrorMessage(props) {
  const { message = 'Please, try to reload your page.' } = props;
  return (
    <div>
      <Header />
      <div className="position-absolute start-50 top-50 transform-translate-50">
        <img src={errorImage} alt="Sad face" className="w-50 d-flex mx-auto mb-5" />
        <Alert variant="danger" className="text-center min-w-320">
          Oops, something went wrong.
          <div>{message}</div>
        </Alert>
      </div>
    </div>
  );
});

ErrorMessage.propTypes = {
  message: PropTypes.string
};

export default ErrorMessage;
