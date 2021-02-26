import React, {useState} from 'react';
import {connect} from "react-redux";

import {useFormFields} from "../libs/hooksLib";
import {ProfileContext} from '../libs/contextLib';
import Profile from "../components/User/Profile";
import ChangeEmail from "../components/User/ChangeEmail";
import ChangeEmailConfirmation from "../components/User/ChangeEmailConfirmation";
import ChangeName from '../components/User/ChangeName';
import ChangePassword from "../components/User/ChangePassword";

import './Profile.scss';

interface IProfileContainer {
  currentUser: any;
}
const ProfileContainer = (props: IProfileContainer) => {
  const {currentUser} = props;

  const initialFormFields = {
    email: currentUser.email,
    name: '',
    confirmationCode: '',
    password: '',
    oldPassword: '',
    confirmPassword: '',
  }
  const [profilePhase, setProfilePhase] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
  const [fields, handleFieldChange] = useFormFields(initialFormFields);

  const clearSensitiveFields = () => {
    fields.confirmationCode = '';
    fields.password = '';
    fields.oldPassword = '';
    fields.confirmPassword = '';
  };

  const resetFormState = () => {
    setIsLoading(false);
    clearSensitiveFields();
  }

  const clearChangeEmailState = () => {
    setConfirmationCodeSent(false);
  }

  const profilePhaseTransition = (phase) => {
    resetFormState()
    clearChangeEmailState()
    setProfilePhase(phase);
  }

  const renderProfilePhase = () => {
    switch (profilePhase) {
      case 'email':
        return (
          <>
            {!confirmationCodeSent ? <ChangeEmail/> : <ChangeEmailConfirmation/>}
          </>
        )
      case 'name':
        return <ChangeName/>;
      case 'password':
        return <ChangePassword/>;
      case 'profile':
      default:
        return <Profile/>;
    }
  }
  return (
    <div className="Profile ProfileContainer">
      {/*@ts-ignore*/}
      <ProfileContext.Provider value={{
        isLoading, setIsLoading,
        fields, handleFieldChange,
        profilePhaseTransition, resetFormState,
        setConfirmationCodeSent,
      }}>
        {renderProfilePhase()}
      </ProfileContext.Provider>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(ProfileContainer);
