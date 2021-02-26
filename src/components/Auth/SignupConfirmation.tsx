import React from 'react';
import {Auth} from "aws-amplify";
import Form from "react-bootstrap/Form";

import {useAuthContext} from "../../libs/contextLib";
import {onError} from "../../libs/errorLib";
import LoaderButton from "../LoaderButton";

const SignupConfirmation = () => {
  const {
    // @ts-ignore
    authPhaseTransition, attemptSignin,
    // @ts-ignore
    isLoading, setIsLoading,
    // @ts-ignore
    fields, handleFieldChange,
  } = useAuthContext();

  const validateForm = () => {
    return fields.confirmationCode.length > 0;
  }

  const resendCode = async () => {
    try {
      await Auth.resendSignUp(fields.email);
      alert('A new confirmation code has been sent.');
    } catch (e) {
      onError(e);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await attemptSignin();
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <header>Confirm account</header>
      {/*@ts-ignore*/}
      <Form.Group controlId="confirmationCode" size="lg">
        <Form.Label>Confirmation Code</Form.Label>
        <Form.Control
          autoFocus
          type="tel"
          onChange={handleFieldChange}
          value={fields.confirmationCode}
        />
        <Form.Text muted>Please check your email for the code.</Form.Text>
      </Form.Group>
      <div className="options">
        <a className="option" onClick={() => resendCode()}>
          Resend code
        </a>
        <a className="option" onClick={() => authPhaseTransition('login')}>
          Return to login
        </a>
      </div>
      <LoaderButton
        block
        size="lg"
        type="submit"
        variant="success"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Verify
      </LoaderButton>
    </Form>
  );
}

export default SignupConfirmation;
