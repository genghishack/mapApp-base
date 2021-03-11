import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

import {useAuthContext} from "../../context/AuthContext";
import LoaderButton from "../LoaderButton/LoaderButton";

const Login = () => {
  const {
    authPhaseTransition, attemptSignin,
    isLoading, setIsLoading,
    fields, handleFieldChange,
  } = useAuthContext();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    await attemptSignin()
  }

  return (
    <div className="Auth Login">
      <Form onSubmit={handleSubmit}>
        <header>Login</header>
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
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="options">
          <Button className="option" variant="link" onClick={
            () => authPhaseTransition('resetPassword')
          }>
            Forgot password?
          </Button>
          <Button className="option" variant="link" onClick={
            () => authPhaseTransition('signup')
          }>
            Create an account
          </Button>
        </div>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  )
}

export default Login;
