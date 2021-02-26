import React from 'react';
import Form from 'react-bootstrap/Form';

import {useAuthContext} from "../../libs/contextLib";
import LoaderButton from "../LoaderButton";

const Login = () => {
  const {
    //@ts-ignore
    authPhaseTransition, attemptSignin,
    //@ts-ignore
    isLoading, setIsLoading,
    //@ts-ignore
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
    <div className="Auth">
      <Form onSubmit={handleSubmit}>
        <header>Login</header>
        {/*//@ts-ignore*/}
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*//@ts-ignore*/}
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="options">
          <a className="option" onClick={() => authPhaseTransition('reset')}>
            Forgot password?
          </a>
          <a className="option" onClick={() => authPhaseTransition('signup')}>
            Create an account
          </a>
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
