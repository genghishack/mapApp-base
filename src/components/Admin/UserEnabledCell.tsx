import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {deleteUser, disableUser, enableUser} from "../../libs/userLib";

interface IUserEnabledCell {
  user: any;
  setUser: Function;
  getUserList: Function;
}

const UserEnabledCell = (props: IUserEnabledCell) => {
  const {user, setUser, getUserList} = props;

  const renderEnabled = () => {
    return (
      <>
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
      </>
    );
  }

  const renderDisabled = () => {
    return (
      <>
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
              onClick={async () => {
                await deleteUser(user.id)
                getUserList()
              }}
            >Delete</Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="userCell">
      {user.enabled ? renderEnabled() : renderDisabled()}
    </div>
  )
}

export default UserEnabledCell;
