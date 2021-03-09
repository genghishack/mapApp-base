import React, {useEffect, useState} from 'react';
import {addUserToRole, removeUserFromRole} from "../../../libs/userLib";
import {Dropdown, DropdownButton} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";

interface IUserRolesCell {
  user: any;
  setUser: Function;
  roles: string[];
}

const UserRolesCell = (props: IUserRolesCell) => {
  const {user, setUser, roles} = props;
  const [roleSuggestions, setRoleSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const suggestions: string[] = [];
    roles.forEach(role => {
      if (!user.roles.includes(role)) {
        suggestions.push(role);
      }
    })
    setRoleSuggestions(suggestions);
  }, [roles, user.roles]);

  const handleAddRole = async (role) => {
    const updatedUser = await addUserToRole(user.id, role);
    setUser(updatedUser.data);
  }

  const handleRemoveRole = async (role) => {
    const updatedUser = await removeUserFromRole(user.id, role);
    setUser(updatedUser.data);
  }

  return (
    <div className="userCell">
      <div className="chips">
        {user.roles.map((role, idx) => (
          <span className="chip" key={idx}>
            <span className="chip-value">{role}</span>
            <button
              type="button"
              className="chip-delete-button"
              onClick={() => handleRemoveRole(role)}
            >x</button>
          </span>
        ))}
      </div>
      <div className="option">
        <Dropdown>
          <DropdownButton
            disabled={!roleSuggestions.length}
            className="addRoleMenu"
            title="add role"
            variant="link"
          >
            {roleSuggestions.map(role => (
              <DropdownItem
                key={role}
                onClick={() => handleAddRole(role)}
              >{role}</DropdownItem>
            ))}
          </DropdownButton>
        </Dropdown>
      </div>
    </div>
  )
}

export default UserRolesCell;
