import React from 'react';
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {Auth} from "aws-amplify";

import LoaderButton from "../LoaderButton";
import {getUser} from "../../libs/userLib";
import {setCurrentUser} from "../../redux/actions/currentUser";
import {onError} from "../../libs/errorLib";
import {useProfileContext} from '../../libs/contextLib';

interface IChangeEmailConfirmation {
  dispatch: Function;
}

const ChangeEmailConfirmation = (props: IChangeEmailConfirmation) => {
  const {dispatch} = props;
  const {
    //@ts-ignore
    profilePhaseTransition,
    //@ts-ignore
    isLoading, setIsLoading,
    //@ts-ignore
    fields, handleFieldChange,
  } = useProfileContext();

  const validateForm = () => {
    return fields.confirmationCode.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.confirmationCode);
      const user = await getUser();
      dispatch(setCurrentUser(user.data))
      profilePhaseTransition('profile');
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ChangeEmailConfirmation">
      <Form onSubmit={handleSubmit}>
        <header>Change email confirmation</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={fields.confirmationCode}
            onChange={handleFieldChange}
          />
          <Form.Text>
            Please check your email ({fields.email}) for the confirmation code.
          </Form.Text>
        </Form.Group>
        <div className="options">
          <div/>
          <a className="option" onClick={() => {
            profilePhaseTransition('profile')
          }}>
            Return to profile
          </a>
        </div>
        <LoaderButton
          block
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Confirm
        </LoaderButton>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(ChangeEmailConfirmation);
