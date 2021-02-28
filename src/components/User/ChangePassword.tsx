import React from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";

import LoaderButton from "../LoaderButton";
import { onError } from "../../libs/errorLib";
import {useProfileContext} from "../../libs/contextLib";

const ChangePassword = () => {
  const {
    //@ts-ignore
    profilePhaseTransition,
    //@ts-ignore
    isLoading, setIsLoading,
    //@ts-ignore
    fields, handleFieldChange,
  } = useProfileContext();

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        user,
        fields.oldPassword,
        fields.password
      );
      profilePhaseTransition("/profile");
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ChangePassword">
      <Form onSubmit={handleSubmit}>
        <header>Change password</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="oldPassword">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.oldPassword}
          />
        </Form.Group>
        <hr />
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.password}
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
            profilePhaseTransition('profile')
          }}>
            Return to profile
          </a>
        </div>
        <LoaderButton
          block
          type="submit"
          disabled={!validateForm()}
          isLoading={isLoading}
        >
          Change Password
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ChangePassword;
