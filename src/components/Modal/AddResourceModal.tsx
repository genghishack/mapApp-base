import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import ResourceFields from "../Form/ResourceFields";
import LoaderButton from "../LoaderButton/LoaderButton";
import {useResourceContext} from "../../context/ResourceContext";
import {useFormFields} from "../../libs/hooksLib";
import {createResource} from "../../libs/resourceLib";
import {onError} from "../../libs/errorLib";

const AddResourceModal = () => {
  const {
    getMapMarkers,
    showAddResourceModal: show,
    setShowAddResourceModal: setShow,
  } = useResourceContext();

  const emptyFormFields = {
    name: '',
    street_1: '',
    street_2: '',
    city: '',
    state: '',
    country: 'US',
    postalCode: '',
    description: '',
    website: '',
    phone: '',
    fax: '',
    email: '',
    business: '',
  }

  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields(emptyFormFields);

  const validateForm = () => {
    return fields.name.length > 0
      && (fields.street_1.length > 0
        || fields.city.length > 0
        || fields.state.length > 0
        || fields.country.length > 0
        || fields.postalCode.length > 0);
  }

  const handleClose = () => setShow(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsLoading(true);

    const {
      name, business, website, email, phone, fax,
      street_1, street_2, city, state, country, postalCode,
      description
    } = fields;

    try {
      await createResource({
        name,
        business,
        website,
        email,
        phone,
        fax,
        address: {street_1, street_2, city, state, country, postalCode},
        description,
      });
      await getMapMarkers();
      setIsLoading(false);
      setShow(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Modal
      className="AddResourceModal"
      show={show}
      onHide={handleClose}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Resource</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <ResourceFields
            fields={fields}
            handleFieldChange={handleFieldChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            size="sm"
            variant="secondary"
            onClick={handleClose}
            tabIndex={14}
          >
            Cancel
          </Button>
          <LoaderButton
            size="sm"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
            tabIndex={15}
          >
            Save
          </LoaderButton>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddResourceModal;
