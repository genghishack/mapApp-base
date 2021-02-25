import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {connect} from "react-redux";
import {Auth} from "aws-amplify";

import LoaderButton from "../LoaderButton";
import {getUser} from "../../libs/userLib";
import {setCurrentUser} from "../../redux/actions/currentUser";
import {onError} from "../../libs/errorLib";
import {useHistory} from "react-router-dom";
import {useFormFields} from "../../libs/hooksLib";

interface IChangeEmailConfirmation {
  dispatch: Function;
}

const ChangeEmailConfirmation = (props: IChangeEmailConfirmation) => {
  const {dispatch} = props;
  const [isConfirming, setIsConfirming] = useState(false);
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    code: "",
  });

  const profilePhaseTransition = (phase) => {
    // no-op
  }

  const validateConfirmForm = () => {
    return fields.code.length > 0;
  }

  const handleConfirmClick = async (event) => {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.code);
      const user = await getUser();
      dispatch(setCurrentUser(user.data))
      history.push("/profile");
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  return (
    <div className="Profile ChangeEmailConfirmation">
      <Form onSubmit={handleConfirmClick}>
        <header>Change email confirmation</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="code">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={fields.code}
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
          bsSize="large"
          isLoading={isConfirming}
          disabled={!validateConfirmForm()}
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
