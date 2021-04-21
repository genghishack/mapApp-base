import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faArrowAltCircleRight,
  faCheck,
  faEdit,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";
import {useResourceContext} from "../../context/ResourceContext";
import {Button} from "react-bootstrap";

interface INavItem {
  resource: any;
  userId: string | null;
}

const NavItem = (props: INavItem) => {
  const {resource, userId} = props;
  const {
    setDisplayedResource,
    setSelectedResource,
    setShowDeleteResourceModal,
    setShowEditResourceModal,
    setShowSubmitResourceModal,
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
    setDisplayedResource(resource);
  }

  const handleSubmitClick = async () => {
    setSelectedResource(resource);
    setShowSubmitResourceModal(true);
  }

  const handleEditClick = () => {
    setSelectedResource(resource);
    setShowEditResourceModal(true);
  }

  const handleDeleteClick = () => {
    setSelectedResource(resource);
    setShowDeleteResourceModal(true);
  }

  return (
    <div className="NavItem">
      <div className="resourceInfo">
        <div className="resourceName">
          <Button variant="link" onClick={handleResourceClick}>
            {resource.name}
          </Button>
        </div>
        <div className="resourceLocation">
          {resourceLocation()}
        </div>
      </div>
      {userId ? (
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
      ) : null}
    </div>
  )
}

export default NavItem;
