import React from "react";
import { Auth } from "aws-amplify";
import Form from "react-bootstrap/Form";
import LoaderButton from "../LoaderButton";
import { onError } from "../../libs/errorLib";
import {useAuthContext} from "../../libs/contextLib";

const ResetPassword = () => {
  const {
    //@ts-ignore
    setAuthPhase, isLoading, setIsLoading,
    //@ts-ignore
    setResetCodeSent,
    //@ts-ignore
    fields, handleFieldChange,
  } = useAuthContext();

  function validateForm() {
    return fields.email.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPassword(fields.email);
      setIsLoading(false);
      setResetCodeSent(true);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ResetPassword">
      <Form onSubmit={handleSubmit}>
        <header>Reset password</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
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
            setIsLoading(false);
            setResetCodeSent(false);
            setAuthPhase('login')
          }}>
            Return to login
          </a>
        </div>
        <LoaderButton
          block
          type="submit"
          size="lg"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Send Confirmation
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ResetPassword;
