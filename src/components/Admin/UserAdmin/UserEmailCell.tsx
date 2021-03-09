import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

interface IUserEmailCell {
  user: any;
}

const UserEmailCell = (props: IUserEmailCell) => {
  const {user} = props;

  return (
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
  )
}

export default UserEmailCell;
