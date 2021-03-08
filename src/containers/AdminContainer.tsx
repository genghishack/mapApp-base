import React, {useState} from 'react';

import {AdminContext} from "../libs/contextLib";
import UserAdmin from "../components/Admin/UserAdmin";

import './Admin.scss';

const AdminContainer = () => {
  const [adminPhase, setAdminPhase] = useState('user');

  const adminPhaseTransition = (phase) => {
    setAdminPhase(phase);
  }

  const renderAdminPhase = () => {
    switch (adminPhase) {
      default:
        return <UserAdmin/>;
    }
  }

  return (
    <div className="Admin AdminContainer">
      {/*@ts-ignore*/}
      <AdminContext.Provider value={{}} displayName="AdminContext">
        {renderAdminPhase()}
      </AdminContext.Provider>
    </div>
  )
}

export default AdminContainer;
