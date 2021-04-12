import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useResourceContext} from "../../context/ResourceContext";
import {
  faArrowAltCircleRight,
  faCheck,
  faCheckSquare,
  faEdit,
  faMinusCircle,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";
import {API} from "aws-amplify";

interface INavItem {
  resource: any;
}

const NavItem = (props: INavItem) => {
  const {resource} = props;
  const {setSelectedResource, setActiveTab} = useResourceContext();
  const [currentResource, setCurrentResource] = useState(resource);

  const resourceLocation = () => {
    const address = currentResource.address_json;
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
    setSelectedResource(currentResource);
  }

  const handleSubmitClick = async () => {
    console.log('submitted for approval');
    try {
      const updatedResource = await API.patch('mapapp', `/resource/submit/${currentResource.id}`, {})
      setCurrentResource(updatedResource.data);
    } catch (e) {
      // todo: handle error
      console.log('error submitting');
    }
  }

  const handleEditClick = () => {
    console.log('edit resource');
  }

  const handleDeleteClick = async () => {
    console.log('delete resource');
    try {
      const deletedResource = await API.del('mapapp', `/resource/${currentResource.id}`, {});
      console.log({deletedResource});
      // todo: reload list
    } catch (e) {
      // todo: handle error
      console.log('error deleting')
    }
  }

  return (
    <div className="NavItem">
      <div className="resourceInfo">
        <div className="resourceName">
          <a href="#" onClick={handleResourceClick}>
            {currentResource.name}
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
        {currentResource.submitted_for_approval ? (
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
