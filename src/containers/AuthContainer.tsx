import React, {useState} from "react";

import {AuthContext} from "../libs/contextLib";
import {useFormFields} from "../libs/hooksLib";
import Signup from "../components/Auth/Signup";
import SignupConfirmation from "../components/Auth/SignupConfirmation";
import ResetPassword from "../components/Auth/ResetPassword";
import ResetPasswordConfirmation from "../components/Auth/ResetPasswordConfirmation";
import ResetPasswordSuccess from "../components/Auth/ResetPasswordSuccess";
import Login from '../components/Auth/Login';

import './Auth.scss';

const AuthContainer = () => {
  const [authPhase, setAuthPhase] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [isSendingResetCode, setIsSendingResetCode] = useState(false);
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCodeConfirmed, setResetCodeConfirmed] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    resetCode: "",
    confirmationCode: "",
  });

  const renderAuthPhase = () => {
    switch (authPhase) {
      case 'signup':
        return (
          <>
            {newUser === null ? <Signup/> : <SignupConfirmation/>}
          </>
        );
      case 'reset':
        return (
          <>
            {!resetCodeSent
              ? <ResetPassword/>
              : !resetCodeConfirmed
                ? <ResetPasswordConfirmation/>
                : <ResetPasswordSuccess/>
            }
          </>
        );
      case 'login':
      default:
        return <Login/>;
    }
  }

  return (
    <div className="Auth AuthContainer">
      {/*@ts-ignore*/}
      <AuthContext.Provider value={{
        authPhase, setAuthPhase,
        isLoading, setIsLoading,
        fields, handleFieldChange,
        newUser, setNewUser,
        isSendingResetCode, setIsSendingResetCode,
        resetCodeSent, setResetCodeSent,
        resetCodeConfirmed, setResetCodeConfirmed,
      }}>
        {renderAuthPhase()}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContainer;
