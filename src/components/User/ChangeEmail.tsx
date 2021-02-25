import React, {useState} from "react";
import {Auth} from "aws-amplify";
import Form from "react-bootstrap/Form";

import LoaderButton from "../LoaderButton";
import {useFormFields} from "../../libs/hooksLib";
import {onError} from "../../libs/errorLib";
import ChangeEmailConfirmation from "./ChangeEmailConfirmation";

import "./ChangeEmail.scss";

interface IChangeEmailProps {
}

const ChangeEmail = (props: IChangeEmailProps) => {
  const [codeSent, setCodeSent] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
  });
  const [isSendingCode, setIsSendingCode] = useState(false);

  const profilePhaseTransition = (phase) => {
    // no-op
  }

  const validateEmailForm = () => {
    return fields.email.length > 0;
  }

  const handleUpdateClick = async (event) => {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {email: fields.email});
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }

  const renderUpdateForm = () => {
    return (
      <div className="Profile ChangeEmail">
        <Form onSubmit={handleUpdateClick}>
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
            <a className="option" onClick={() => {
              profilePhaseTransition('profile')
            }}>
              Return to profile
            </a>
          </div>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isSendingCode}
            disabled={!validateEmailForm()}
          >
            Update Email
          </LoaderButton>
        </Form>
      </div>
    );
  }

  return (
    <>
      {!codeSent ? renderUpdateForm() : <ChangeEmailConfirmation/>}
    </>
  );
}


export default ChangeEmail;
