import React from 'react';
import {useResourceContext} from "../../context/ResourceContext";

const ResourceInfo = () => {
  const {displayedResource: resource} = useResourceContext();

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
      <>
        <div className="street">{street}</div>
        <div className="locality">
          {`${locality.join(', ')} ${address.postalCode}`}
        </div>
        <div className="country">{address.country}</div>
      </>
    );
  }

  const renderPhone = () => {
    const {phone_json: phone} = resource;

    return (
      <>
        {phone.main ? `${phone.main} (m)` : null}
        {(phone.main && phone.cell) ? '/' : null}
        {phone.cell ? `${phone.cell} (c)` : null}
      </>
    )
  }

  return (
    <div className="ResourceInfo">
      {resource.id ? (
        <>
          <div className="name">
            {`${resource.name_json.first} ${resource.name_json.last}`}
          </div>
          <div className="infoSection business">
            <div className="label">Business</div>
            {resource.name_json.business}
          </div>
          <div className="infoSection website">
            <div className="label">Website</div>
            {resource.internet_json.web}
          </div>
          <div className="infoSection email">
            <div className="label">Email</div>
            {resource.internet_json.email}
          </div>
          <div className="infoSection phone">
            <div className="label">Phone</div>
            {renderPhone()}
          </div>
          <div className="infoSection fax">
            <div className="label">Fax</div>
            {resource.phone_json.fax}
          </div>
          <div className="infoSection address">
            <div className="label">Location</div>
            {renderAddress()}
          </div>
          <div className="infoSection description">
            <div className="label">Description</div>
            {resource.description}
          </div>
        </>
      ) : (
        <div className="no-info">
          Click on a resource to display information.
        </div>
      )}
    </div>
  )
}

export default ResourceInfo;
