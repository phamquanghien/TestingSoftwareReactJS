import React, { useState } from 'react';
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

const ConfirmGenRegCode = ({ show, handleClose, isShowButtonOverWrite, message, examID, updateInformation}) => {
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(false);
  const handleGenRegCode = async (isOverWrite) => {
    try {
      handleClose();
      setLoading(true);
      const response = await axios.put(apiURL + '/api/RegistrationCode/code-generation/?examId=' + examID + '&isOverGenRegCode=' + isOverWrite);
      setLoading(false);
      alert(response.data);
      updateInformation();
    } catch (error) {
      console.error(error);
    }
  };
  return(
    
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Sinh phách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{message}</Form.Label>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => handleClose()}>Cancel</Button>
          {isShowButtonOverWrite && <Button variant="outline-danger" onClick={() => handleGenRegCode(true)}>Xoá phách và sinh lại</Button>}
          <Button variant="outline-primary" onClick={() => handleGenRegCode(false)}>Sinh phách bổ sung</Button>
          </Modal.Footer>
      </Modal>
      {loading &&(
          <div>
              <div className="overlay-backdrop"></div>
              <div className="overlay-spinner">
                  <p>Loading...</p>
                  <Spinner style={{ width: "5rem", height: "5rem" }} animation="border" variant="success"/>
              </div>
          </div>
      )}
    </div>
  );
}
export default ConfirmGenRegCode;