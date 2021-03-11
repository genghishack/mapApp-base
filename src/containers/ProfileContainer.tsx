import React, {useState} from 'react';

import {useFormFields} from "../libs/hooksLib";
import {ProfileContext} from '../context/ProfileContext';
import Profile from "../components/User/Profile";
import ChangeEmail from "../components/User/ChangeEmail";
import ChangeEmailConfirmation from "../components/User/ChangeEmailConfirmation";
import ChangeName from '../components/User/ChangeName';
import ChangePassword from "../components/User/ChangePassword";

import './Profile.scss';

const ProfileContainer = () => {

  const [profilePhase, setProfilePhase] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    name: '',
    confirmationCode: '',
    password: '',
    oldPassword: '',
    confirmPassword: '',
  });

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

  const profilePhaseTransition = (phase) => {
    resetFormState()
    setProfilePhase(phase);
  }

  const renderProfilePhase = () => {
    switch (profilePhase) {
      case 'email':
        return <ChangeEmail/>;
      case 'emailConfirmation':
        return <ChangeEmailConfirmation/>;
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
      <ProfileContext.Provider value={{
        isLoading, setIsLoading,
        fields, handleFieldChange,
        profilePhaseTransition,
      }}>
        {renderProfilePhase()}
      </ProfileContext.Provider>
    </div>
  )
}

export default ProfileContainer;
