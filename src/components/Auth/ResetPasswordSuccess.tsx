import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import {useAuthContext} from "../../context/AuthContext";

const ResetPasswordSuccess = () => {
  const {
    authPhaseTransition,
  } = useAuthContext();

  return (
    <div className="Auth ResetPassword">
      <header>Reset password</header>
      <div className="success-message">
        <FontAwesomeIcon className="success-icon" icon={faCheckCircle}/>
        <p>Your password has been reset.</p>
      </div>
      <Button className="success-link" variant="link" onClick={
        () => authPhaseTransition('login')
      }>
        Click here to login with your new credentials.
      </Button>
    </div>
  );
}

export default ResetPasswordSuccess;
