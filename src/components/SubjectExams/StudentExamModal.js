import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const StudentExamModal = ({ showModal, studentExamByExamBag, handleClose }) => {
    const [filterStudentCode, setFilterStudentCode] = useState('');
    const [filteredStudentExams, setFilteredStudentExams] = useState([]);
    const [editedStudentExams, setEditedStudentExams] = useState([]);
    const [switchStates, setSwitchStates] = useState({});

    useEffect(() => {
        // Initialize switchStates based on studentExamByExamBag
        const initialSwitchStates = {};
        studentExamByExamBag.forEach(studentExam => {
            initialSwitchStates[studentExam.studentExamID] = studentExam.isActive;
        });
        setSwitchStates(initialSwitchStates);
    }, [studentExamByExamBag]);

    useEffect(() => {
        // Filter student exams based on filterStudentCode
        const filteredExams = studentExamByExamBag.filter(studentExam =>
            studentExam.studentCode.includes(filterStudentCode)
        );
        setFilteredStudentExams(filteredExams);
    }, [studentExamByExamBag, filterStudentCode]);

    const handleFilterChange = event => {
        setFilterStudentCode(event.target.value);
    };

    const handleSwitchChange = (studentExamID, newIsActive) => {
        // Update the switch state
        setSwitchStates(prevState => ({
            ...prevState,
            [studentExamID]: newIsActive,
        }));
        // Add the edited studentExam to editedStudentExams state
        if (!editedStudentExams.includes(studentExamID)) {
            setEditedStudentExams([...editedStudentExams, studentExamID]);
        }
    };

    const handleSave = async () => {
        // Hiển thị hộp thoại xác nhận trước khi lưu
        const confirmSave = window.confirm("Nếu lưu thay đổi, túi bài thi sẽ bị khoá và bạn không thể nhập lại danh sách vắng thi. \n\nBạn có muốn lưu thay đổi?");
    
        if (confirmSave) {
            try {
                // Iterate through editedStudentExams and send PUT requests to update each student exam
                await Promise.all(
                    editedStudentExams.map(async studentExamID => {
                        const editedStudentExam = studentExamByExamBag.find(se => se.studentExamID === studentExamID);
                        editedStudentExam.isActive = switchStates[studentExamID];
                        await axios.put(`http://localhost:5107/api/StudentExam/${studentExamID}`, editedStudentExam);
                        handleClose();
                        alert("Cập nhật danh sách vắng thi thành công");
                    })
                );
                console.log('Student exams updated successfully.');
            } catch (error) {
                console.error('Error updating student exams:', error);
            }
        }
    };
    

    return (
        <Modal show={showModal} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Nhập danh sách vắng thi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="align-items-center">
                    <Col xs={8}>
                        <Form.Group controlId="studentCodeFilter">
                            <Form.Control
                                type="text"
                                placeholder="Nhập mã sinh viên để lọc"
                                value={filterStudentCode}
                                onChange={handleFilterChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                    </Col>
                </Row>
                
                
                <br/>
                {filteredStudentExams.length > 0 && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th className="text-center">Mã Sinh viên</th>
                                <th className="text-center">Họ tên</th>
                                <th>Tham dự thi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudentExams.map((studentExam) => (
                                <tr key={studentExam.studentExamID}>
                                    <td>{studentExam.studentCode}</td>
                                    <td>{studentExam.student.firstName} {studentExam.student.lastName}</td>
                                    <td>
                                        <Form.Check 
                                            type="switch"
                                            id={`switch-${studentExam.studentExamID}`}
                                            checked={switchStates[studentExam.studentExamID]}
                                            onChange={(event) => handleSwitchChange(studentExam.studentExamID, event.target.checked)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentExamModal;