import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import LoaderButton from "../LoaderButton";

import './Profile.scss';
import {connect} from "react-redux";

interface IProfileProps {
  currentUser: any;
}

const Profile = (props: IProfileProps) => {
  const {currentUser} = props;

  const { name, email, roles } = currentUser;

  const rolesDisplay = roles.join(', ');

  return (
    <div className="Profile">

      <div className="userAttributeRow">
        <div className="userAttribute">
          <div className="attrName">Email:</div>
          <div className="attrValue">{email}</div>
        </div>
        <LinkContainer to="/profile/email">
          {/*@ts-ignore*/}
          <LoaderButton bsSize="large">
            Change Email
          </LoaderButton>
        </LinkContainer>
      </div>

      <div className="userAttributeRow">
        <div className="userAttribute">
          <div className="attrName">Name:</div>
          <div className="attrValue">{name}</div>
        </div>
        <LinkContainer to="/profile/name">
          {/*@ts-ignore*/}
          <LoaderButton bsSize="large">
            Change Name
          </LoaderButton>
        </LinkContainer>
      </div>

      <div className="userAttributeRow">
        <div className="userAttribute">
          <div className="attrName">Roles:</div>
          <div className="attrValue">{rolesDisplay}</div>
        </div>
      </div>

      <div className="userAttributeRow">
        <LinkContainer to="/profile/password">
          {/*@ts-ignore*/}
          <LoaderButton block bsSize="large">
            Change Password
          </LoaderButton>
        </LinkContainer>
      </div>

    </div>
  );
}

const mapStateToProps = (state: { errors: any; currentUser: any }) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(Profile);
