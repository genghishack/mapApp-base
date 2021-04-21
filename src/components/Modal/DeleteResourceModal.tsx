import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {deleteResource} from "../../libs/resourceLib";
import {useResourceContext} from "../../context/ResourceContext";

const DeleteResourceModal = () => {
  const {
    getMapMarkers,
    showDeleteResourceModal: show,
    setShowDeleteResourceModal: setShow,
    selectedResource: resource,
  } = useResourceContext();

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      await deleteResource(resource.id);
      await getMapMarkers();
      handleClose();
    } catch (e) {
      // TODO: handle error
      console.log('error deleting resource')
    }
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Resource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the resource {resource.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteResourceModal;
