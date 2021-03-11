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
    postalCode: ''
  });

  const validateForm = () => {
    return fields.street_1.length > 0
      || fields.city.length > 0
      || fields.state.length > 0
      || fields.country.length > 0
      || fields.postalCode.length > 0;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const {name, street_1, street_2, city, state, country, postalCode} = fields;
    try {
      await createResource({
        name,
        address: {street_1, street_2, city, state, country, postalCode}
      });
      await getMapMarkers();
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="EnterInfo">
      <Form onSubmit={handleSubmit}>
        <header>Create a resource</header>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="street_1">
          <Form.Label>Address 1 (e.g. Street)</Form.Label>
          <Form.Control
            type="text"
            value={fields.street_1}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="street_2">
          <Form.Label>Address 2 (e.g. Apt #)</Form.Label>
          <Form.Control
            type="text"
            value={fields.street_2}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={fields.city}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={fields.state}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={fields.country}
            onChange={handleFieldChange}
          />
        </Form.Group>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            value={fields.postalCode}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
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
