import React, { useState, useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import LoaderButton from "../LoaderButton";

import './Profile.scss';

export default function Profile() {

  return (
    <div className="Settings">
      <LinkContainer to="/settings/email">
        {/*@ts-ignore*/}
        <LoaderButton block bsSize="large">
          Change Email
        </LoaderButton>
      </LinkContainer>
      <LinkContainer to="/settings/password">
        {/*@ts-ignore*/}
        <LoaderButton block bsSize="large">
          Change Password
        </LoaderButton>
      </LinkContainer>
    </div>
  );
}
