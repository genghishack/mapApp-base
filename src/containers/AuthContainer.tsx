import React, {useState} from "react";

import {AuthContext} from "../libs/contextLib";
import {useFormFields} from "../libs/hooksLib";
import Signup from "../components/Auth/Signup";
import SignupConfirmation from "../components/Auth/SignupConfirmation";
import ResetPassword from "../components/Auth/ResetPassword";
import Login from '../components/Auth/Login';

import './Auth.scss';

const AuthContainer = () => {
  const [authPhase, setAuthPhase] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const newUserState = {newUser, setNewUser};

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
            {/*{!resetCodeSent*/}
            {/*  ? <ResetPassword />*/}
            {/*  : !resetCodeConfirmed*/}
            {/*    ? <ResetPasswordConfirmation />*/}
            {/*    : <ResetPasswordSuccess />*/}
            {/*}*/}
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
        newUser, setNewUser
      }}>
        {renderAuthPhase()}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthContainer;
