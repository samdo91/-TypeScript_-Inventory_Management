import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  loginStateAtom,
  loginModals,
  searchingModalAtom,
} from "../../globalStateManagement/index";
import { useAtom } from "jotai";

function SearchingModal() {
  const [searchingModal, setSearchingModal] = useAtom(searchingModalAtom);

  const handleModalClose = () => {
    setSearchingModal(false);
  };

  return (
    <>
      <Modal show={searchingModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>My Modal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>This is the content of the modal.</p>
          <p>You can add any JSX elements here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchingModal;
