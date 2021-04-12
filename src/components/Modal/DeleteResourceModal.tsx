import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {API} from "aws-amplify";

interface IDeleteResourceModal {
  show: boolean;
  setShow: Function;
  resource: any;
}

const DeleteResourceModal = (props: IDeleteResourceModal) => {
  const { show, setShow, resource } = props;

  const handleClose = () => setShow(false);

  const handleDelete = async () => {
    try {
      await API.del('mapapp', `/resource/${resource.id}`, {});
      handleClose();
      // todo: reload list
    } catch (e) {
      // todo: handle error
      console.log('error deleting')
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
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
