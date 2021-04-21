import React from 'react'
import {Button, Modal } from 'react-bootstrap';
import {useResourceContext} from "../../context/ResourceContext";
import {submitResource} from "../../libs/resourceLib";

const SubmitResourceModal = () => {
  const {
    getMapMarkers,
    showSubmitResourceModal: show,
    setShowSubmitResourceModal: setShow,
    selectedResource: resource,
  } = useResourceContext();

  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    try {
      await submitResource(resource.id);
      await getMapMarkers();
      handleClose()
    } catch (e) {
      // TODO: handle error
      console.log('error submitting resource');
    }
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Submit Resource for Approval</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Submit resource {resource.name} for approval?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SubmitResourceModal;
