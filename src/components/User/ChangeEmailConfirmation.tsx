import React from 'react';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';
import {connect} from "react-redux";
import {Auth} from "aws-amplify";

import LoaderButton from "../LoaderButton/LoaderButton";
import {getUser} from "../../libs/userLib";
import {setCurrentUser} from "../../redux/actions/currentUser";
import {onError} from "../../libs/errorLib";
import {useProfileContext} from "../../context/ProfileContext";

interface IChangeEmailConfirmation {
  dispatch: Function;
}

const ChangeEmailConfirmation = (props: IChangeEmailConfirmation) => {
  const {dispatch} = props;
  const {
    profilePhaseTransition,
    isLoading, setIsLoading,
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
          <Button className="option" variant="link" onClick={() => {
            profilePhaseTransition('profile')
          }}>
            Return to profile
          </Button>
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
