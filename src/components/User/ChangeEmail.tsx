import React from "react";
import {Auth} from "aws-amplify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

import LoaderButton from "../LoaderButton/LoaderButton";
import {onError} from "../../libs/errorLib";
import {useProfileContext} from "../../context/ProfileContext";

const ChangeEmail = () => {
  const {
    profilePhaseTransition,
    isLoading, setIsLoading,
    fields, handleFieldChange,
  } = useProfileContext();

  const validateForm = () => {
    return fields.email.length > 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {email: fields.email});
      profilePhaseTransition('emailConfirmation');
    } catch (error) {
      onError(error);
      setIsLoading(false);
    }
  }

  return (
    <div className="ChangeEmail">
      <Form onSubmit={handleSubmit}>
        <header>Change email</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="email">
          <Form.Text>Email</Form.Text>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
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
          Update Email
        </LoaderButton>
      </Form>
    </div>
  );
}

export default ChangeEmail;
