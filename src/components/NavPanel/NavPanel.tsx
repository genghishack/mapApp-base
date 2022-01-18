import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import { useResourceContext } from '../../context/ResourceContext';
import NavItem from "./NavItem";
import CategoryItem from './CategoryItem';

import './NavPanel.scss';

interface INavPanel {
  resources: any;
  categories: any;
  userId: string | null;
}

const NavPanel = (props: INavPanel) => {
  const {resources, categories, userId} = props;
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

      <div className="categoryItems">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            resources={resources}
            category={category}
            userId={userId}
          />
        ))}
      </div>

    </div>
  )
}

export default NavPanel;
