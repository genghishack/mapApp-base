import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Form from 'react-bootstrap/Form';
import {useAppContext} from "../../libs/contextLib";
import { onError} from "../../libs/errorLib";
import LoaderButton from "../LoaderButton";

import './Login.scss';

const Login = () => {
  //@ts-ignore
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/');
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        {/*//@ts-ignore*/}
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {/*//@ts-ignore*/}
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
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
