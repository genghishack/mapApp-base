import React, {useCallback, useEffect, useState} from 'react';
import {useResourceContext} from "../../context/ResourceContext";
import {Button, Form, Modal} from "react-bootstrap";
import {createResource} from "../../libs/resourceLib";
import {onError} from "../../libs/errorLib";
import ResourceFields from "../Form/ResourceFields";
import LoaderButton from "../LoaderButton/LoaderButton";
import {useFormFields} from "../../libs/hooksLib";

const EditResourceModal = () => {
  const {
    getMapMarkers,
    showEditResourceModal: show,
    setShowEditResourceModal: setShow,
    selectedResource: resource,
  } = useResourceContext();

  const emptyFormFields = {
    name: '',
    street_1: '',
    street_2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    description: '',
    website: '',
    phone: '',
    fax: '',
    email: '',
    business: '',
  }

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fields, handleFieldChange] = useFormFields(emptyFormFields);


  useEffect(() => {
    if (show && resource.id) {
      fields.name = resource.name;
      fields.street_1 = resource.address_json.street_1;
      fields.street_2 = resource.address_json.street_2;
      fields.city = resource.address_json.city;
      fields.state = resource.address_json.state;
      fields.country = resource.address_json.country;
      fields.postalCode = resource.address_json.postalCode;
      fields.description = resource.description;
      fields.website = resource.website;
      fields.phone = resource.phone;
      fields.fax = resource.fax;
      fields.email = resource.email;
      fields.business = resource.business;
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [resource, fields, show, setShow])

  const validateForm = () => {
    // return fields.name.length > 0
    //   && (fields.street_1.length > 0
    //     || fields.city.length > 0
    //     || fields.state.length > 0
    //     || fields.country.length > 0
    //     || fields.postalCode.length > 0);
    return 0;
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
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <Modal show={showModal} onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Resource</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <ResourceFields
            fields={fields}
            handleFieldChange={handleFieldChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <LoaderButton
            block
            size="sm"
            type="submit"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Add Resource
          </LoaderButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditResourceModal;
