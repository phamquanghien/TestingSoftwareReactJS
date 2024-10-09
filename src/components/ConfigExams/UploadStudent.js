import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
const UploadStudent = ({show, handleClose, examID, checkOverwrite, updateInformation, countRegistrationCode}) => {
    const apiURL = process.env.REACT_APP_API_BASE_URL;
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCheckData, setIsCheckData] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleCheckboxChange = () => {
        setIsCheckData(!isCheckData);
      };
    const handleUploadStudent = async () => {
        if(countRegistrationCode > 0 && checkOverwrite === true)
        {
            alert("Kỳ thi đã sinh phách, không thể xoá dữ liệu thí sinh dự thi để ghi đè chỉ có thể ghi bổ sung.");
            return;
        }
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
            const response = await axios.post(apiURL + '/api/StudentExam/Upload?examId=' + examID + '&isOverWrite=' + checkOverwrite + '&isCheckData=' + isCheckData, formData, { headers: { 'Content-Type': 'multipart/form-data'}});
            setLoading(false);
            alert(response.data);
            updateInformation();
        } catch (error){
            alert("FError uploading file: " + error);
        }
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Upload danh sách Sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUploadStudent}>
                        <Form.Group className='mb-3'>
                            <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label as={Col} sm={8}>Kiểm tra dữ liệu trước khi lưu?</Form.Label>
                            <Col sm={3}>
                            <Form.Check type="switch" name="isCheckData" checked={isCheckData} onChange={handleCheckboxChange} />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleClose}>Cancel</Button>
                    <Button variant='primary' type='submit' onClick={handleUploadStudent}>Upload</Button>
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
};
export default UploadStudent;