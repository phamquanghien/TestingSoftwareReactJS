import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ExamMenu from './ExamMenu';
import UploadStudent from './UploadStudent';
const ConfigExam = () => {
    const { examId } = useParams();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [exam, setExam] = useState(null);
    const [countStudentExam, setCountStudentExam] = useState(0);
    const [countRegistrationCode, setCountRegistrationCode] = useState(0);
    const [isOverwrite, setIsOverWrite] = useState(false);
    useEffect(() => {
        fetchData();
      }, [examId]);
    const fetchData = async () => {
        try {
          const examData = await axios.get(`http://localhost:5107/api/Exam/${examId}`);
          setExam(examData.data);
          const countStudentEx = await axios.get(`http://localhost:5107/api/StudentExam/count/${examId}`);
          setCountStudentExam(countStudentEx.data);
          const countRegisCode = await axios.get(`http://localhost:5107/api/RegistrationCode/count/${examId}`);
          setCountRegistrationCode(countRegisCode.data);
        } catch (error) {
          console.error('Error fetching exam data:', error);
        }
    };
    const handleConfirmClick = () => {
        if(countStudentExam > 0) {
            setShowConfirmation(true);
        } else {
            setShowConfirmation(false);
        }
        setShowUploadModal(true);
    };
    const handleConfirmation = (confirmed) => {
        if  (confirmed) {
            setIsOverWrite(true);
        } else {
            setIsOverWrite(false);
        }
        setShowConfirmation(false);
        setShowUploadModal(true);
    };
    const handleCloseUploadModal = () => {
        setShowUploadModal(false);
    }
    const updateInformation = async () => {
        try {
            const countStudentEx = await axios.get(`http://localhost:5107/api/StudentExam/count/${examId}`);
            setCountStudentExam(countStudentEx.data);
            const countRegisCode = await axios.get(`http://localhost:5107/api/RegistrationCode/count/${examId}`);
            setCountRegistrationCode(countRegisCode.data);
        } catch (error) {
            console.error('Error fetching student count:', error);
        }
    };
    
    if (!exam) {
        return <div>Loading...</div>;
    }
    return(
        <div>
            <UploadStudent show={showUploadModal} handleClose={handleCloseUploadModal} examID={examId} checkOverwrite={isOverwrite} updateInformation={updateInformation}/>
            <ExamMenu onConfirmClick = {handleConfirmClick}/>
            <h2 className='m-3'>{exam.examName}: {countStudentExam} (thí sinh) - {countRegistrationCode} (phách)</h2>
            <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Hiện kỳ thi đã có dữ liệu, bạn có muốn xoá thông tin sinh viên để nhập lại không?</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => handleConfirmation(false)}>
                    Không
                </Button>
                <Button variant="danger" onClick={() => handleConfirmation(true)}>
                    Xoá dữ liệu nhập lại
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ConfigExam;