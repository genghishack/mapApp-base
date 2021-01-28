import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Button } from 'react-bootstrap';
import {useAppContext} from "../../libs/contextLib";

import './Login.scss';

const Login = () => {
  const history = useHistory();
  //@ts-ignore
  const { userHasAuthenticated } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push('/');
    } catch (e) {
      alert(e.message);
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  )
}

export default Login;
