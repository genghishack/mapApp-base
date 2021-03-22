import React from 'react';
import {useResourceContext} from "../../context/ResourceContext";

const ResourceInfo = () => {
  const {selectedResource: resource} = useResourceContext();

  const renderAddress = () => {
    const {address_json: address} = resource;
    const street: string = `${address.street_1} ${address.street_2}`;
    const locality: string[] = [];
    if (address.city) {
      locality.push(address.city);
    }
    if (address.state) {
      locality.push(address.state);
    }

    return (
      <div className="address">
        <div className="street">{street}</div>
        <div className="locality">
          {`${locality.join(', ')} ${address.postalCode}`}
        </div>
        <div className="country">{address.country}</div>
      </div>
    );
  }

  return (
    <div className="ResourceInfo">
      {resource.id ? (
        <>
          <div className="name">
            {resource.name}
          </div>
          {renderAddress()}
          <div className="description">
            {resource.description}
          </div>
        </>
      ) : (
        <div className="no-info">
          Click on a resource to display information
        </div>
      )}
    </div>
  )
}

export default ResourceInfo;
