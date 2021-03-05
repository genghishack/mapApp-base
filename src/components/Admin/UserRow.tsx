import React, { useState } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";

import {enableUser, disableUser, deleteUser} from "../../libs/userLib";

interface IUserRow {
  initialUserData: any;
}

const UserRow = (props: IUserRow) => {
  const {initialUserData} = props;
  const [user, setUser] = useState(initialUserData);

  const renderUserEnabledCell = () => {
    if (user.enabled) {
      return (
        <div className="userCell">
          <FontAwesomeIcon
            className="success"
            icon={faCheckCircle}
            title="user enabled"
          />
          <div className="options">
            <div className="option">
              <Button
                variant="link"
                onClick={async () => {
                  const updatedUser = await disableUser(user.id);
                  setUser(updatedUser.data);
                }}
              >Disable</Button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="userCell">
          <FontAwesomeIcon
            className="failure"
            icon={faTimesCircle}
            title="user not enabled"
          />
          <div className="options">
            <div className="option">
              <Button
                variant="link"
                onClick={async () => {
                  const updatedUser = await enableUser(user.id);
                  setUser(updatedUser.data);
                }}
              >Enable</Button>
            </div>
            <div className="option">
              <Button
                variant="link"
                onClick={() => deleteUser(user.id)}
              >Delete</Button>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <tr className="UserRow">
      <td>
        <div className="userCell">
          <div className="userEmail">{user.email}</div>
          <div className="userEmailVerified">
            {user.email_verified === 'true' ?
              (<FontAwesomeIcon
                className="success"
                icon={faCheckCircle}
                title="email verified"
              />) :
              (<FontAwesomeIcon
                className="failure"
                icon={faTimesCircle}
                title="email not verified"
              />)
            }
          </div>
        </div>
      </td>
      <td>{user.name}</td>
      <td>{user.roles}</td>
      <td>{user.status}</td>
      <td>
        {renderUserEnabledCell()}
      </td>
    </tr>
  )
}

export default UserRow;
