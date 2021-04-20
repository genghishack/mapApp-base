import React, {ChangeEventHandler} from 'react';
import Form from 'react-bootstrap/Form';

interface IResourceFields {
  fields: any;
  handleFieldChange: ChangeEventHandler;
}

const ResourceFields = (props: IResourceFields) => {
  const {fields, handleFieldChange} = props;

  return (
    <>
      {/*@ts-ignore*/}
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          autoFocus
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="business">
        <Form.Label>Business Name</Form.Label>
        <Form.Control
          type="text"
          value={fields.business}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="website">
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="text"
          value={fields.website}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          value={fields.email}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={fields.phone}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="fax">
        <Form.Label>Fax</Form.Label>
        <Form.Control
          type="text"
          value={fields.fax}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="street_1">
        <Form.Label>Address 1 (e.g. Street)</Form.Label>
        <Form.Control
          type="text"
          value={fields.street_1}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="street_2">
        <Form.Label>Address 2 (e.g. Apt #)</Form.Label>
        <Form.Control
          type="text"
          value={fields.street_2}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          value={fields.city}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          type="text"
          value={fields.state}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          value={fields.country}
          onChange={handleFieldChange}
        />
      </Form.Group>
      {/*@ts-ignore*/}
      <Form.Group controlId="postalCode">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          value={fields.postalCode}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={fields.description}
          onChange={handleFieldChange}
        />
      </Form.Group>
    </>
  )
}

export default ResourceFields;
