import React from 'react';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {Auth} from "aws-amplify";
import {setCurrentUser} from "../../redux/actions/currentUser";
import {useAppContext, useAuthContext} from "../../libs/contextLib";
import {onError} from "../../libs/errorLib";
import {createUser} from '../../libs/userLib';
import Form from "react-bootstrap/Form";
import LoaderButton from "../LoaderButton";

interface ISignupConfirmationProps {
  dispatch: Function;
}

const SignupConfirmation = (props: ISignupConfirmationProps) => {
  const {dispatch} = props;

  const history = useHistory();
  // @ts-ignore
  const {userHasAuthenticated} = useAppContext();
  const {
    // @ts-ignore
    authPhaseTransition, resetFormState,
    // @ts-ignore
    isLoading, setIsLoading,
    // @ts-ignore
    fields, handleFieldChange,
  } = useAuthContext();

  const validateForm = () => {
    return fields.confirmationCode.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      const user = await createUser();
      dispatch(setCurrentUser(user.data));
      resetFormState();
      history.push("/");
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
        <div/>
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

const mapStateToProps = (state: { errors: any; currentUser: any }) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(SignupConfirmation);
