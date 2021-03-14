import React from 'react';
import {useResourceContext} from "../../context/ResourceContext";

interface INavItem {
  resource: any;
}

const NavItem = (props: INavItem) => {
  const {resource} = props;
  const {setSelectedResource, setActiveTab} = useResourceContext();

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

  const handleClick = (evt) => {
    evt.preventDefault();
    setActiveTab('info');
    setSelectedResource(resource);
  }

  return (
    <div className="NavItem">
      <div className="resourceName">
        <a href="#" onClick={handleClick}>
          {resource.name}
        </a>
      </div>
      <div className="resourceLocation">
        {resourceLocation()}
      </div>
    </div>
  )
}

export default NavItem;
