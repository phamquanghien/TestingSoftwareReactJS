import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
const UploadStudent = ({show, handleClose, examID, checkOverwrite, updateInformation}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleUploadStudent = async () => {
        if (!selectedFile) {
            alert("Please choose excel file to upload!")
            return;
        }
        const allowedExtensions = /(\.xls|\.xlsx)$/i;
        if (!allowedExtensions.exec(selectedFile.name)) {
            alert("Must choose excels file to upload, please!")
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            handleClose();
            setLoading(true);
            const response = await axios.post('http://localhost:5107/api/StudentExam/Upload?examId=' + examID + '&isOverWrite=' + checkOverwrite, formData, { headers: { 'Content-Type': 'multipart/form-data'}});
            setLoading(false);
            alert(response.data);
            updateInformation();
        } catch (error){
            alert("FError uploading file: " + error);
        }
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload danh sách Sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUploadStudent}>
                        <Form.Group className='mb-3'>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                    <hr></hr>
                    <Button variant='primary' type='submit' onClick={handleUploadStudent}>Upload</Button>
                </Modal.Body>
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
};
export default UploadStudent;