import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faArrowAltCircleRight,
  faCheck,
  faEdit,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";
import {useResourceContext} from "../../context/ResourceContext";
import {submitResource} from "../../libs/resourceLib";

interface INavItem {
  resource: any;
}

const NavItem = (props: INavItem) => {
  const {resource} = props;
  const {
    setDisplayedResource,
    setSelectedResource,
    setShowDeleteResourceModal,
    setActiveTab,
    getMapMarkers,
  } = useResourceContext();

  const resourceLocation = () => {
    const address = resource.address_json;
    const display: string[] = [];
    if (address.city) {
      display.push(address.city);
    }
    if (address.state) {
      display.push(address.state);
    }
    if (!address.city) {
      display.push(address.country);
    }
    return display.join(', ');
  }

  const handleResourceClick = (evt) => {
    evt.preventDefault();
    setActiveTab('info');
    setDisplayedResource(resource.id);
  }

  const handleSubmitClick = async () => {
    try {
      await submitResource(resource.id);
      await getMapMarkers();
    } catch (e) {
      // TODO: handle error
      console.log('error submitting resource');
    }
  }

  const handleEditClick = () => {
    console.log('edit resource');
  }

  const handleDeleteClick = () => {
    setSelectedResource(resource);
    setShowDeleteResourceModal(true);
  }

  return (
    <div className="NavItem">
      <div className="resourceInfo">
        <div className="resourceName">
          <a href="#" onClick={handleResourceClick}>
            {resource.name}
          </a>
        </div>
        <div className="resourceLocation">
          {resourceLocation()}
        </div>
      </div>
      <div className="resourceControls">
        <FontAwesomeIcon
          className="control edit"
          icon={faEdit}
          title="edit resource"
          onClick={handleEditClick}
        />
        <FontAwesomeIcon
          className="control delete"
          icon={faMinusSquare}
          title="delete resource"
          onClick={handleDeleteClick}
        />
        {resource.submitted_for_approval ? (
          <FontAwesomeIcon
            className="info submit"
            icon={faCheck}
            title="submitted"
          />
        ) : (
          <FontAwesomeIcon
            className="control submit"
            icon={faArrowAltCircleRight}
            title="submit for approval"
            onClick={handleSubmitClick}
          />
        )}
      </div>
    </div>
  )
}

export default NavItem;
