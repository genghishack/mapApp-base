import React from "react";
import {Auth} from "aws-amplify";
import Form from "react-bootstrap/Form";

import LoaderButton from "../LoaderButton";
import {onError} from "../../libs/errorLib";
import {useAuthContext} from "../../libs/contextLib";

const ForceResetPassword = () => {
  const {
    //@ts-ignore
    authPhaseTransition, newUser,
    //@ts-ignore
    isLoading, setIsLoading,
    //@ts-ignore
    fields, handleFieldChange,
  } = useAuthContext();

  function validateForm() {
    return (
      fields.password.length > 0 &&
      fields.newPassword.length > 0 &&
      fields.newPassword === fields.confirmPassword &&
      fields.password !== fields.newPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.completeNewPassword(
        newUser,
        fields.newPassword,
        {
          email: fields.email
        }
      );
      authPhaseTransition("resetPasswordSuccess");
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ForceResetPassword">
      <Form onSubmit={handleSubmit}>
        <header>Change password</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="password">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.password}
          />
        </Form.Group>
        <hr/>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            onChange={handleFieldChange}
            value={fields.newPassword}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <div className="options">
          <div/>
          <a className="option" onClick={() => {
            authPhaseTransition('login')
          }}>
            Return to login
          </a>
        </div>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          disabled={!validateForm()}
          isLoading={isLoading}
        >
          Change Password
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ForceResetPassword;
