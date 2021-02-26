import React, {useState} from "react";
import {Auth} from "aws-amplify";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";

import {AuthContext, useAppContext} from "../libs/contextLib";
import {useFormFields} from "../libs/hooksLib";
import {getUser} from "../libs/userLib";
import {onError} from "../libs/errorLib";
import {setCurrentUser} from "../redux/actions/currentUser";
import Signup from "../components/Auth/Signup";
import SignupConfirmation from "../components/Auth/SignupConfirmation";
import ResetPassword from "../components/Auth/ResetPassword";
import ResetPasswordConfirmation from "../components/Auth/ResetPasswordConfirmation";
import ResetPasswordSuccess from "../components/Auth/ResetPasswordSuccess";
import Login from '../components/Auth/Login';

import './Auth.scss';

interface IAuthContainerProps {
  dispatch: Function;
}

const AuthContainer = (props: IAuthContainerProps) => {
  const {dispatch} = props;
  const history = useHistory();
  //@ts-ignore
  const {userHasAuthenticated} = useAppContext()
  const initialFormFields = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    resetCode: "",
    confirmationCode: "",
  }
  const [authPhase, setAuthPhase] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCodeConfirmed, setResetCodeConfirmed] = useState(false);
  const [fields, handleFieldChange] = useFormFields(initialFormFields);

  const clearSensitiveFields = () => {
    fields.confirmPassword = '';
    fields.resetCode = '';
    fields.confirmationCode = '';
  };

  const resetFormState = () => {
    setIsLoading(false);
    clearSensitiveFields();
  }

  const clearResetPasswordState = () => {
    setResetCodeSent(false);
    setResetCodeConfirmed(false);
  }

  const authPhaseTransition = (phase) => {
    setNewUser(null);
    resetFormState()
    clearResetPasswordState()
    setAuthPhase(phase);
  }

  const attemptSignin = async () => {
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      const user = await getUser();
      dispatch(setCurrentUser(user.data));
      resetFormState();
      history.push("/")
    } catch (e) {
      if (e.code === 'UserNotConfirmedException') {
        authPhaseTransition('signupConfirmation');
      } else {
        onError(e);
        setIsLoading(false);
      }
    }
  }

  const renderAuthPhase = () => {
    switch (authPhase) {
      case 'signup':
        return (
          <>
            {newUser === null ? <Signup/> : <SignupConfirmation/>}
          </>
        );
      case 'signupConfirmation':
        return <SignupConfirmation/>;
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
        isLoading, setIsLoading,
        fields, handleFieldChange,
        newUser, setNewUser, attemptSignin,
        resetCodeSent, setResetCodeSent,
        resetCodeConfirmed, setResetCodeConfirmed,
        authPhaseTransition, resetFormState,
      }}>
        {renderAuthPhase()}
      </AuthContext.Provider>
    </div>
  )
}

function mapStateToProps(state: { errors: any; currentUser: any; }) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(AuthContainer);
