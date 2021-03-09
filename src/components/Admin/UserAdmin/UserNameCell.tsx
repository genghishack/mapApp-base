import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faTimes, faEdit} from "@fortawesome/free-solid-svg-icons";

import {useFormFields} from "../../../libs/hooksLib";
import {changeUsername} from "../../../libs/userLib";

interface IUserNameCell {
  user: any;
  setUser: Function;
}

const UserNameCell = (props: IUserNameCell) => {
  const {user, setUser} = props;
  const [isEditing, setIsEditing] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: user.name,
  });

  const toggleChangeName = async () => {
    setIsEditing(!isEditing)
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsEditing(false);
    const updatedUser = await changeUsername(user.id, fields.name);
    setUser(updatedUser.data);
  }

  return (
    <div className="userCell">
      {isEditing ? (
        <>
          <Form className="inline" onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                value={fields.name}
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="link"
            ><FontAwesomeIcon
              icon={faCheckSquare}
              className="success"
            /></Button>
          </Form>
          <div className="option">
            <Button
              variant="link"
              onClick={toggleChangeName}
            ><FontAwesomeIcon
              icon={faTimes}
              className="failure"
            /></Button>
          </div>
        </>
      ) : (
        <>
          <div className="userName">
            {user.name}
          </div>
          <div className="option">
            <Button
              variant="link"
              onClick={toggleChangeName}
            ><FontAwesomeIcon
              icon={faEdit}
              className="info"
            /></Button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserNameCell;
