import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { API } from 'aws-amplify';
import LoaderButton from '../LoaderButton';
import { useFormFields } from '../../libs/hooksLib';
import { onError } from '../../libs/errorLib';

import './EnterInfo.scss';

const EnterInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    address: '',
    // street: '',
    // city: '',
    // state: '',
    // country: 'US',
    // postalCode: ''
  });

  const validateForm = () => {
    return fields.address.length > 0;
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    try {
      await createResource({address: fields.address});
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false)
    }
  }

  const createResource = (resource) => {
    return API.post('mapapp', '/resource', {
      body: resource
    });
  }

  return (
    <div className="EnterInfo">
      <Form onSubmit={handleSubmit}>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.address}
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
          Add Address
        </LoaderButton>
      </Form>
    </div>
  )
}

export default EnterInfo;
