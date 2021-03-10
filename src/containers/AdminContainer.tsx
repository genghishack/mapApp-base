import React, {useState} from 'react';

import {AdminContext} from "../context/AdminContext";
import UserAdmin from "../components/Admin/UserAdmin/UserAdmin";
import ResourceAdmin from "../components/Admin/ResourceAdmin/ResourceAdmin";

import './Admin.scss';
import AdminMenu from "../components/Admin/AdminMenu";

const AdminContainer = () => {
  const [adminPhase, setAdminPhase] = useState('user');

  const adminPhaseTransition = (phase) => {
    setAdminPhase(phase);
  }

  const renderAdminPhase = () => {
    switch (adminPhase) {
      case 'resource':
        return <ResourceAdmin/>;
      case 'user':
      default:
        return <UserAdmin/>;
    }
  }

  return (
    <div className="Admin AdminContainer">
      <AdminContext.Provider value={{
        adminPhaseTransition,
      }}>
        <AdminMenu/>
        <div className="AdminContent">
          {renderAdminPhase()}
        </div>
      </AdminContext.Provider>
    </div>
  )
}

export default AdminContainer;
