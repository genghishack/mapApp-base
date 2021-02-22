import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {Auth, API} from "aws-amplify";
import Form from "react-bootstrap/Form";

import {useAppContext} from "../../libs/contextLib";
import {useFormFields} from "../../libs/hooksLib";
import {onError} from "../../libs/errorLib";
import {setCurrentUser} from "../../redux/actions/currentUser";
import LoaderButton from "../../components/LoaderButton";

import "./Login.scss";

interface ISignupProps {
  dispatch: Function;
}

const Signup = (props: ISignupProps) => {
  const {dispatch} = props;

  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  //@ts-ignore
  const {userHasAuthenticated} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const createUser = () => {
    return API.post('mapapp', '/user', {});
  }

  const validateForm = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      // @ts-ignore
      setNewUser(newUser);
      console.log({newUser})
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        // Check to see if user has not been confirmed.
        // if not, redirect user to confirmation screen.
        // if yes, sign them in as long as they got the
        // email and password correct.
        // Use Auth.resendSignup() method to re-send code
        // AWS Auth API: https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
        // Tutorial: https://serverless-stack.com/chapters/signup-with-aws-cognito.html
      }
      console.log(e);
      onError(e);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      const user = await createUser();
      dispatch(setCurrentUser(user.data));
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Form onSubmit={handleConfirmationSubmit}>
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
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <header>Create an account</header>
        {/*@ts-ignore*/}
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="Login">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}

function mapStateToProps(state: { errors: any; currentUser: any; }) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(Signup);
