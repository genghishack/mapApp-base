import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {API, Auth} from 'aws-amplify';
import Form from 'react-bootstrap/Form';

import {useAppContext} from "../../libs/contextLib";
import {useFormFields} from "../../libs/hooksLib";
import {onError} from "../../libs/errorLib";
import {setCurrentUser} from "../../redux/actions/currentUser";
import LoaderButton from "../LoaderButton";

import './Login.scss';

interface ILoginProps {
  dispatch: Function;
}

const Login = (props: ILoginProps) => {
  const {dispatch} = props;

  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: ''
  });
  const history = useHistory();
  //@ts-ignore
  const {userHasAuthenticated} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const getUser = () => {
    return API.get('mapapp', '/user/self', {});
  }

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
      const user = await getUser();
      dispatch(setCurrentUser(user.data));
      history.push("/")
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
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
          <Link to="/login/reset">Forgot password?</Link>
          <Link to="/login/signup">Create an account</Link>
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

function mapStateToProps(state: { errors: any; currentUser: any; }) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(Login);
