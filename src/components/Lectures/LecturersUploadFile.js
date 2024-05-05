import React, { useState } from 'react';
import { Modal, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';

const LecturersUploadFile = ({ showModalUpload, handleCloseModalUpload, examID, examBag, setIsMatchingTestScore}) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
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
            handleCloseModalUpload();
            setLoading(true);
            //call api
            const response = await axios.post('http://localhost:5107/api/ExamResult/upload-file-result?examId=' + examID + '&examBag=' + examBag, formData, { headers: { 'Content-Type': 'multipart/form-data'}});
            setLoading(false);
            if(response.data === "Nhập điểm thành công"){
                setIsMatchingTestScore(true);
            }
            alert(response.data);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
        }
    };

    return (
        <div>
            <Modal show={showModalUpload} onHide={handleCloseModalUpload} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Nhập điểm từ file excel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={handleCloseModalUpload}>Cancel</Button>
                    <Button variant='primary' type='submit' onClick={handleUpload} >Upload</Button>
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

export default LecturersUploadFile;
