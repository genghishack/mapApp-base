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
import ForceResetPassword from "../components/Auth/ForceResetPassword";
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
  const [authPhase, setAuthPhase] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    name: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    resetCode: "",
    confirmationCode: "",
  });

  const clearPassword = () => {
    fields.password = '';
  }

  const clearSensitiveFields = () => {
    fields.newPassword = '';
    fields.confirmPassword = '';
    fields.resetCode = '';
    fields.confirmationCode = '';
  };

  const resetFormState = () => {
    setIsLoading(false);
    clearSensitiveFields();
  }

  const authPhaseTransition = (phase) => {
    resetFormState()
    setAuthPhase(phase);
  }

  const updateStateWithCurrentUser = async () => {
    const user = await getUser();
    dispatch(setCurrentUser(user.data));
    clearPassword();
    resetFormState();
  }

  const attemptSignin = async () => {
    try {
      const signin = await Auth.signIn(fields.email, fields.password);
      if (signin.challengeName) {
        switch (signin.challengeName) {
          case 'NEW_PASSWORD_REQUIRED':
            setNewUser(signin);
            authPhaseTransition('forceResetPassword');
            break;
          default:
            alert(signin.challengeName);
        }
      } else {
        userHasAuthenticated(true);
        await updateStateWithCurrentUser();
        history.push("/")
      }
    } catch (e) {
      if (authPhase === 'signup' && e.code === 'NotAuthorizedException') {
        alert('User already exists.');
      }
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
        return <Signup/>;
      case 'signupConfirmation':
        return <SignupConfirmation/>;
      case 'resetPassword':
        return <ResetPassword/>;
      case 'resetPasswordConfirmation':
        return <ResetPasswordConfirmation/>
      case 'resetPasswordSuccess':
        return <ResetPasswordSuccess/>;
      case 'forceResetPassword':
        return <ForceResetPassword/>
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
        newUser, attemptSignin,
        authPhaseTransition,
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
