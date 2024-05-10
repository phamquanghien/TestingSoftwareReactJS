import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";

const LecturersScanCode = ({ showModalScanCode, handleCloseModalScanCode, examID, examBag, setIsMatchingTestScore}) => {
    const [examResults, setExamResults] = useState([]);
    const [registrationCodeNumber, setRegistrationCodeNumber] = useState(0);
    const [examResult1, setExamResult1] = useState(0);
    const [examResult2, setExamResult2] = useState(0);
    const [averageScore, setAverageScore] = useState(0);

    const handleSave = async () => {
        try {
            const result = await axios.post('http://localhost:5107/api/ExamResult/scan-registration-code-number?examId=' + examID + '&examBag=' + examBag,examResults);
            if(result.data === "Nhập điểm thành công") {
                setIsMatchingTestScore(true);
            }
            handleCloseModalScanCode();
            alert(result.data);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
            alert("Đã xảy ra lỗi trong quá trình cập nhật dữ liệu. Vui lòng tắt trình duyêt mở lại và thử lại sau!")
        }
    };
    const handleRegistrationCodeNumberChange = (event) => {
        setRegistrationCodeNumber(parseInt(event.target.value));
    };

    const handleExamResult1Change = (event) => {
        var inputValue = parseFloat(event.target.value);
        if(inputValue < 0) inputValue = 0;
        else if(inputValue > 10) inputValue = 10;
        setExamResult1(inputValue);
        setExamResult2(inputValue);
        setAverageScore(calculateAverage(inputValue, inputValue));
    };

    const handleEditExamResult1 = (event, index) => {
        var inputValue = parseFloat(event.target.value);
        if(inputValue < 0) inputValue = 0;
        else if(inputValue > 10) inputValue = 10;
        const updatedResults = [...examResults];
        updatedResults[index].examResult1 = inputValue;
        updatedResults[index].averageScore = calculateAverage(inputValue, parseFloat(updatedResults[index].examResult2));
        setExamResults(updatedResults);
    };

    const handleExamResult2Change = (event) => {
        var inputValue = parseFloat(event.target.value);
        if(inputValue < 0) inputValue = 0;
        else if(inputValue > 10) inputValue = 10;
        setExamResult2(inputValue);
        setAverageScore(calculateAverage(examResult1, inputValue));
    };

    const handleEditExamResult2 = (event, index) => {
        var inputValue = parseFloat(event.target.value);
        if(inputValue < 0) inputValue = 0;
        else if(inputValue > 10) inputValue = 10;
        const updatedResults = [...examResults];
        updatedResults[index].examResult2 = inputValue;
        updatedResults[index].averageScore = calculateAverage(parseFloat(updatedResults[index].examResult1), inputValue);
        setExamResults(updatedResults);
    };

    const handleAddExamResult = () => {
        const isExist = examResults.find(result => result.registrationCodeNumber === registrationCodeNumber);
        if (isExist) {
            alert('Mã phách đã tồn tại trong danh sách.');
            return;
        } else {
            setAverageScore(calculateAverage(examResult1, examResult2));
            setExamResults([...examResults, { registrationCodeNumber, examResult1, examResult2, averageScore }]);
            setRegistrationCodeNumber(0);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddExamResult();
        }
    };
    const handleEditRegistrationCodeNumber = (event, index) => {
        const updatedResults = [...examResults];
        updatedResults[index].registrationCodeNumber = parseInt(event.target.value);
        setExamResults(updatedResults);
    };
    
    const calculateAverage = (examResult1, examResult2) => {
        if (isNaN(examResult1) && isNaN(examResult2)) {
            return 0;
        }
        else if (isNaN(examResult1)) {
            return examResult2;
        }
        else if (isNaN(examResult2)) {
            return examResult1;
        }
        else {
            return (examResult1 + examResult2) / 2;
        }
    };
    
    const handleDeleteExamResult = (index) => {
        const updatedResults = [...examResults];
        updatedResults.splice(index, 1);
        setExamResults(updatedResults);
    };
    

    return (
        <Modal show={showModalScanCode} onHide={handleCloseModalScanCode} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Quét phách nhập điểm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="examResult1">
                        <Form.Label>Điểm 1</Form.Label>
                        <Form.Control 
                            type="number"
                            step="0.01"
                            value={examResult1}
                            min="0.0"
                            max="10.0"
                            onChange={handleExamResult1Change} 
                            placeholder="Enter exam result 1" 
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="examResult2">
                        <Form.Label>Điểm 2</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={examResult2}
                            step="0.01"
                            min="0.0"
                            max="10.0"
                            onChange={handleExamResult2Change} 
                            placeholder="Enter exam result 2" 
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="registrationCodeNumber">
                        <Form.Label>Mã phách</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={registrationCodeNumber} 
                            onChange={handleRegistrationCodeNumberChange} 
                            placeholder="Enter registration code number" 
                            onKeyDown={handleKeyDown}
                        />
                    </Form.Group>
                </Row>

                <Button variant="primary" onClick={handleAddExamResult}>Add</Button>
            </Form>
                <br/>
                {examResults.length > 0 && (
                    <table className="table border-primary align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Mã phách</th>
                                <th className="text-center">Điểm 1</th>
                                <th className="text-center">Điểm 2</th>
                                <th className="text-center">Điểm</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {examResults.map((examResult, index) => (
                                <tr key={examResult.registrationCodeNumber}>
                                    <td className="text-center align-middle">{index+1}</td>
                                    <td className="text-center align-middle">
                                        <Form.Control
                                            type="number"
                                            value={examResult.registrationCodeNumber}
                                            onChange={(e) => handleEditRegistrationCodeNumber(e, index)}
                                        />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Control
                                            type="number"
                                            step="0.01"
                                            value={examResult.examResult1}
                                            onChange={(e) => handleEditExamResult1(e, index)}
                                        />
                                    </td>
                                    <td className="text-center align-middle">
                                        <Form.Control
                                            type="number"
                                            step="0.01"
                                            value={examResult.examResult2}
                                            onChange={(e) => handleEditExamResult2(e, index)}
                                        />
                                    </td>
                                    <td className="text-center align-middle">{examResult.averageScore} </td>
                                    <td className="text-center align-middle">
                                        <MdDeleteForever className="text-danger ud-cursor" size={25} onClick={() => handleDeleteExamResult(index)} title="Xoá bản ghi?"/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleCloseModalScanCode}>
                    Close
                </Button>
                <Button variant='primary' type='submit' onClick={handleSave} >Save</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LecturersScanCode;
