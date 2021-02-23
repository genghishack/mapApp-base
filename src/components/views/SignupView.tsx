import React, {useState} from "react";

import {useFormFields} from "../../libs/hooksLib";
import SignupConfirmation from "../Auth/SignupConfirmation";
import Signup from "../Auth/Signup";

import '../Auth/Login.scss';

const SignupView = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fieldState = {fields, handleFieldChange};
  const newUserState = {newUser, setNewUser};
  const loadingState = {isLoading, setIsLoading};

  return (
    <div className="Login SignupView">
      {newUser === null ? (
        <Signup
          fieldState={fieldState}
          loadingState={loadingState}
          newUserState={newUserState}
        />
      ) : (
        <SignupConfirmation
          fieldState={{fields, handleFieldChange}}
          loadingState={{isLoading, setIsLoading}}
        />
      )}
    </div>
  )
}

export default SignupView;
