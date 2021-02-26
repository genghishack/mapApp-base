import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

import {useAuthContext} from "../../libs/contextLib";

const ResetPasswordSuccess = () => {
  const {
    //@ts-ignore
    authPhaseTransition,
  } = useAuthContext();

  return (
    <div className="Auth ResetPassword">
      <header>Reset password</header>
      <div className="success-message">
        <FontAwesomeIcon className="success-icon" icon={faCheckCircle}/>
        <p>Your password has been reset.</p>
      </div>
      <a className="success-link" onClick={() => {
        authPhaseTransition('login')
      }}>
        Click here to login with your new credentials.
      </a>
    </div>
  );
}

export default ResetPasswordSuccess;
