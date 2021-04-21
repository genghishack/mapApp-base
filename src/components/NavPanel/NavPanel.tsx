import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import { useResourceContext } from '../../context/ResourceContext';
import NavItem from "./NavItem";

import './NavPanel.scss';

interface INavPanel {
  resources: any;
  userId: string | null;
}

const NavPanel = (props: INavPanel) => {
  const {resources, userId} = props;
  const {
    setShowAddResourceModal,
  } = useResourceContext();

  const handleAddClick = async () => {
    setShowAddResourceModal(true);
  }

  return (
    <div className="NavPanel">
      <div className="navHeader">
        <header>Resources</header>
        {userId ? (
          <div className="navControls">
            <FontAwesomeIcon
              className="control add"
              icon={faPlusSquare}
              title="add resource"
              onClick={handleAddClick}
            />
          </div>
        ) : null}
      </div>

      <div className="navItems">
        {resources.map(resource => (
          <NavItem
            key={resource.id}
            resource={resource}
            userId={userId}
          />
        ))}
      </div>
    </div>
  )
}

export default NavPanel;
