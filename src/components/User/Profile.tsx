import React, { useState, useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import LoaderButton from "../LoaderButton";

import './Profile.scss';

export default function Profile() {

  return (
    <div className="Settings">
      <LinkContainer to="/profile/email">
        {/*@ts-ignore*/}
        <LoaderButton block bsSize="large">
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/profile/password">
        {/*@ts-ignore*/}
        <LoaderButton block bsSize="large">
          Change Password
        </LoaderButton>
      </LinkContainer>
    </div>
  );
}
