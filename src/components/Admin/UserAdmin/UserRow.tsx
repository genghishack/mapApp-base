import React, { useState } from 'react';
import {connect} from "react-redux";

import {setCurrentUser} from "../../../redux/actions/currentUser";
import UserEnabledCell from "./UserEnabledCell";
import UserEmailCell from "./UserEmailCell";
import UserRolesCell from "./UserRolesCell";
import UserNameCell from "./UserNameCell";

interface IUserRow {
  initialUserData: any;
  getUserList: Function;
  roles: string[];
  currentUser: any;
  dispatch: Function;
}

const UserRow = (props: IUserRow) => {
  const {initialUserData, getUserList, roles, dispatch, currentUser} = props;
  const [user, setUser] = useState(initialUserData);

  const updateUser = (userData) => {
    if (currentUser.id === userData.id) {
      dispatch(setCurrentUser(userData));
    }
    setUser(userData);
  }

  return (
    <tr className="UserRow">
      <td>
        <UserEmailCell user={user}/>
      </td>
      <td>
        <UserNameCell user={user} setUser={updateUser}/>
      </td>
      <td>
        <UserRolesCell
          user={user}
          setUser={updateUser}
          roles={roles}
        />
      </td>
      <td>{user.status}</td>
      <td>
        <UserEnabledCell
          user={user}
          setUser={updateUser}
          getUserList={getUserList}
        />
      </td>
    </tr>
  )
}

function mapStateToProps(state: { errors: any; currentUser: any; }) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(UserRow);
