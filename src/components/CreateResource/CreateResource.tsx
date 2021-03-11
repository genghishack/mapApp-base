import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

import {useResourceContext} from "../../context/ResourceContext";
import {createResource} from "../../libs/resourceLib";
import LoaderButton from '../LoaderButton/LoaderButton';
import {useFormFields} from '../../libs/hooksLib';
import {onError} from '../../libs/errorLib';

import './CreateResource.scss';

const CreateResource = () => {
  const {getMapMarkers} = useResourceContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: '',
    street_1: '',
    street_2: '',
    city: '',
    state: '',
    country: 'US',
    postalCode: '',
    description: '',
  });

  const validateForm = () => {
    return fields.name.length > 0
      && (fields.street_1.length > 0
        || fields.city.length > 0
        || fields.state.length > 0
        || fields.country.length > 0
        || fields.postalCode.length > 0);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const {
      name, street_1, street_2, city, state,
      country, postalCode, description
    } = fields;

    try {
      await createResource({
        name,
        address: {street_1, street_2, city, state, country, postalCode},
        description,
      });
      await getMapMarkers();
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="CreateResource">
      <Form onSubmit={handleSubmit}>
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
        <LoaderButton
          block
          size="sm"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Add Resource
        </LoaderButton>
      </Form>
    </div>
  )
}

export default CreateResource;
