import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import { useResourceContext } from '../../context/ResourceContext';
import CategoryItem from './CategoryItem';

import './NavPanel.scss';
import {connect} from "react-redux";

interface INavPanel {
  resources: any;
  categories: any;
  states: any;
  userId: string | null;
}

/* TODO: build tree menu array using states, categories and resources
    as in https://www.npmjs.com/package/react-simple-tree-menu
 */

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

function mapStateToProps(
  state: {
    errors: any;
    resources: any;
    categories: any;
    states: any;
  }
) {
  return {
    resources: state.resources,
    categories: state.categories,
    states: state.states,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(NavPanel);
