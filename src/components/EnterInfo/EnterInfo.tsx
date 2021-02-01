import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import {FormControl, InputLabel, Input, Button} from '@material-ui/core';
import LoaderButton from '../LoaderButton';
import { useFormFields } from '../../libs/hooksLib';
import { onError } from '../../libs/errorLib';
import config from '../../config';

import './EnterInfo.scss';

const EnterInfo = () => {
  const history = useHistory();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    address: '',
  });

  const validateForm = () => {
    return fields.address.length > 0;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setIsLoading(true);
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
