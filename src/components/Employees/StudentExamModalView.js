import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const StudentExamModalView = ({ showModalView, handleCloseView, examID, examBag}) => {
    const [studentExams, setStudentExams] = useState([]);
    const [filteredStudentExams, setFilteredStudentExams] = useState([]);
    const [filterStudentCode, setFilterStudentCode] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:5107/api/StudentExam/get-list-by-examId?examID=${examID}&examBag=${examBag}`);
                setStudentExams(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [examID, examBag]);
    
    useEffect(() => {
        const filteredData = studentExams.filter(studentExam =>
            studentExam.studentCode.toLowerCase().includes(filterStudentCode.toLowerCase())
        );
        setFilteredStudentExams(filteredData);
    }, [studentExams, filterStudentCode]);

    const handleFilterChange = event => {
        setFilterStudentCode(event.target.value);
    };

    return (
        <Modal show={showModalView} onHide={handleCloseView} backdrop="static">
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
                </Row>
                <br/>
                {filteredStudentExams.length > 0 && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th className="text-center">Mã Sinh viên</th>
                                <th className="text-center">Họ tên</th>
                                <th>Tham dự thi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudentExams.map((studentExam, index) => (
                                <tr key={studentExam.studentExamID}>
                                    <td>{index+1}</td>
                                    <td>{studentExam.studentCode}</td>
                                    <td>{studentExam.student.firstName} {studentExam.student.lastName}</td>
                                    <td>
                                        <Form.Check 
                                            type="switch"
                                            id={`switch-${studentExam.studentExamID}`}
                                            checked={studentExam.isActive}
                                            readOnly
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseView}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StudentExamModalView;
