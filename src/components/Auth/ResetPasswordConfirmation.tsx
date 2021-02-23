import React from 'react';
import Form from "react-bootstrap/Form";
import LoaderButton from "../LoaderButton";
import {Auth} from "aws-amplify";
import {onError} from "../../libs/errorLib";
import {useAuthContext} from "../../libs/contextLib";

const ResetPasswordConfirmation = () => {
  const {
    //@ts-ignore
    setAuthPhase,
    //@ts-ignore
    isLoading, setIsLoading,
    //@ts-ignore
    fields, handleFieldChange,
    //@ts-ignore
    setResetCodeSent, setResetCodeConfirmed,
  } = useAuthContext();

  function validateForm() {
    return (
      fields.resetCode.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.resetCode,
        fields.password
      );
      setResetCodeConfirmed(true);
      setIsLoading(false);
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="Auth ResetPassword">
      <Form onSubmit={handleSubmit}>
        <header>Reset password</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="resetCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={fields.resetCode}
            onChange={handleFieldChange}
          />
          <Form.Text>
            Please check your email ({fields.email}) for the confirmation code.
          </Form.Text>
        </Form.Group>
        <hr />
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="options">
          <div/>
          <a className="option" onClick={() => {
            setIsLoading(false);
            setResetCodeSent(false);
            setResetCodeConfirmed(false);
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
          Confirm
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ResetPasswordConfirmation;
