import React, { useState, useEffect } from 'react';
import { Table, Modal, Button} from 'react-bootstrap';
import axios from 'axios';

const LecturersExamModalView = ({ showModalView, handleCloseView, examID, examBag, isMatchingTestScore}) => {
    const [examResults, setExamResults] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`http://localhost:5107/api/ExamResult/get-by-examID-examBag-all?examID=${examID}&examBag=${examBag}`);
                setExamResults(result.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [examID, examBag, isMatchingTestScore]);
    
    return (
        <Modal show={showModalView} onHide={handleCloseView} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Danh sách nhập điểm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="text-center">Số phách</th>
                            <th className="text-center">Điểm 1</th>
                            <th className="text-center">Điểm 2</th>
                            <th className="text-center">Điểm Trung bình</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examResults.map((examResult, index) => (
                            <tr key={examResult.examResultID}>
                                <td>{index+1}</td>
                                <td>{examResult.registrationCodeNumber}</td>
                                <td>{examResult.examResult1}</td>
                                <td>{examResult.examResult2}</td>
                                <td>{examResult.averageScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseView}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LecturersExamModalView;
