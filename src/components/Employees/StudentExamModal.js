import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const StudentExamModal = ({ showModal, handleClose, examID, examBag, setIsAction}) => {
    const apiURL = process.env.REACT_APP_API_BASE_URL;
    const [studentExams, setStudentExams] = useState([]);
    const [filteredStudentExams, setFilteredStudentExams] = useState([]);
    const [filterStudentCode, setFilterStudentCode] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${apiURL}/api/StudentExam/get-list-by-examId?examID=${examID}&examBag=${examBag}`);
                setStudentExams(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [examID, examBag]);
    
    useEffect(() => {
        const filteredData = studentExams.filter(studentExam =>
            studentExam.studentCode.toLowerCase().includes(filterStudentCode.trim().toLowerCase())
        );
        setFilteredStudentExams(filteredData);
    }, [studentExams, filterStudentCode]);

    const handleFilterChange = event => {
        setFilterStudentCode(event.target.value);
    };

    const handleChangeSwitch = (studentExamID, isActive) => {
        const updatedStudentExams = studentExams.map(studentExam =>
            studentExam.studentExamID === studentExamID ? { ...studentExam, isActive: isActive } : studentExam
        );
        setStudentExams(updatedStudentExams);
    };

    const handleSave = async () => {
        try {
            // Gửi yêu cầu cập nhật dữ liệu đến endpoint API
            await axios.put(apiURL + '/api/StudentExam/update-multiple', studentExams);
            setIsAction(true);
            // Sau khi cập nhật thành công, hiển thị thông báo hoặc thực hiện các hành động khác nếu cần
            handleClose();
        } catch (error) {
            console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
            alert("Đã xảy ra lỗi trong quá trình cập nhật dữ liệu. Vui lòng tắt trình duyêt mở lại và thử lại sau!")
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
                                            onChange={(event) => handleChangeSwitch(studentExam.studentExamID, event.target.checked)}
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
