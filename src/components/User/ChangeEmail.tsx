import React from "react";
import {Auth} from "aws-amplify";
import Form from "react-bootstrap/Form";

import LoaderButton from "../LoaderButton";
import {onError} from "../../libs/errorLib";
import {useProfileContext} from '../../libs/contextLib';

const ChangeEmail = () => {
  const {
    //@ts-ignore
    profilePhaseTransition, resetFormState,
    //@ts-ignore
    isLoading, setIsLoading, setConfirmationCodeSent,
    //@ts-ignore
    fields, handleFieldChange,
  } = useProfileContext();

  const validateForm = () => {
    return fields.email.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {email: fields.email});
      resetFormState();
      setConfirmationCodeSent(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ChangeEmail">
      <Form onSubmit={handleSubmit}>
        <header>Change email</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="email">
          <Form.Text>Email</Form.Text>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
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
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Update Email
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ChangeEmail;
