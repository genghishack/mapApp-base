import React, {ChangeEventHandler} from 'react';
import Form from 'react-bootstrap/Form';

import "./ResourceFields.scss";

interface IResourceFields {
  fields: any;
  handleFieldChange: ChangeEventHandler;
}

const ResourceFields = (props: IResourceFields) => {
  const {fields, handleFieldChange} = props;

  return (
    <div className="ResourceFields">
      {/*@ts-ignore*/}
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          tabIndex={1}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="business">
        <Form.Label>Business Name</Form.Label>
        <Form.Control
          type="text"
          value={fields.business}
          onChange={handleFieldChange}
          tabIndex={2}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={fields.description}
          onChange={handleFieldChange}
          tabIndex={3}
        />
      </Form.Group>

      <div className="form-heading">Contact</div>
      <div className="form-section">

        <div className="form-column">
          {/*@ts-ignore*/}
          <Form.Group controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              value={fields.website}
              onChange={handleFieldChange}
              tabIndex={4}
            />
          </Form.Group>
          {/*@ts-ignore*/}
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={fields.phone}
              onChange={handleFieldChange}
              tabIndex={6}
            />
          </Form.Group>
        </div>

        <div className="form-column">
          {/*@ts-ignore*/}
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={fields.email}
              onChange={handleFieldChange}
              tabIndex={5}
            />
          </Form.Group>
          {/*@ts-ignore*/}
          <Form.Group controlId="fax">
            <Form.Label>Fax</Form.Label>
            <Form.Control
              type="text"
              value={fields.fax}
              onChange={handleFieldChange}
              tabIndex={7}
            />
          </Form.Group>
        </div>
      </div>

      <div className="form-heading">Location</div>
      <div className="form-section">

        <div className="form-column">
          {/*@ts-ignore*/}
          <Form.Group controlId="street_1">
            <Form.Label>Address 1 (e.g. Street)</Form.Label>
            <Form.Control
              type="text"
              value={fields.street_1}
              onChange={handleFieldChange}
              tabIndex={8}
            />
          </Form.Group>
          {/*@ts-ignore*/}
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={fields.city}
              onChange={handleFieldChange}
              tabIndex={10}
            />
          </Form.Group>
          {/*@ts-ignore*/}
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={fields.country}
              onChange={handleFieldChange}
              tabIndex={12}
            />
          </Form.Group>
        </div>

        <div className="form-column">
          {/*@ts-ignore*/}
          <Form.Group controlId="street_2">
            <Form.Label>Address 2 (e.g. Apt #)</Form.Label>
            <Form.Control
              type="text"
              value={fields.street_2}
              onChange={handleFieldChange}
              tabIndex={9}
            />
          </Form.Group>
          {/*@ts-ignore*/}
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              value={fields.state}
              onChange={handleFieldChange}
              tabIndex={11}
            />
          </Form.Group>
          {/*@ts-ignore*/}
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              value={fields.postalCode}
              onChange={handleFieldChange}
              tabIndex={13}
            />
          </Form.Group>
        </div>
      </div>

    </div>
  )
}

export default ResourceFields;
