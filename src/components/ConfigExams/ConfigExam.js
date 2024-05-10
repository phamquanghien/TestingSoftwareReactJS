import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ExamMenu from './ExamMenu';
import UploadStudent from './UploadStudent';
import ConfirmGenRegCode from './ConfirmGenRegCode';
import UpdateStatus from '../SubjectExams/UpdateStatus';
import DownloadRegistrationCode from '../RegistrationCodes/DownloadRegistrationCode';
import Statistics from '../SubjectExams/Statistics';
import ReviewTestScore from '../ExamResults/ReviewTestScore';
import ExportTranscript from '../ExamResults/ExportTranscript';
const ConfigExam = () => {
    const { examId } = useParams();
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showConfirmationUpload, setShowConfirmationUpload] = useState(false);
    const [exam, setExam] = useState(null);
    const [countStudentExam, setCountStudentExam] = useState(0);
    const [countRegistrationCode, setCountRegistrationCode] = useState(0);
    const [isOverwrite, setIsOverWrite] = useState(false);
    const [showConfirmGenRegCode, setShowConfirmGenRegCode] = useState(false);
    const [messageGenRegCode, setMessageGenRegCode] = useState("");
    const [isShowButtonOverWrite, setIsShowButtonOverWrite] = useState(false);
    const [showProcess, setShowProcess] = useState(0);
    useEffect(() => {
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
        fetchData();
      }, [examId]);
    
    const handleConfirmUploadClick = () => {
        if(countStudentExam > 0) {
            setShowConfirmationUpload(true);
        } else {
            setShowConfirmationUpload(false);
            setShowUploadModal(true);
        }
    };
    const handleConfirmation = (confirmed) => {
        if  (confirmed) {
            setIsOverWrite(true);
        } else {
            setIsOverWrite(false);
        }
        setShowConfirmationUpload(false);
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
    const handleConfirmGenRegCodeClick = () => {
        setShowConfirmGenRegCode(true);
        if(countRegistrationCode>0) {
            setMessageGenRegCode("Phách của kỳ thi đã được sinh, có muốn xoá phách và sinh lại không?");
            setIsShowButtonOverWrite(true);
        } else {
            setMessageGenRegCode("Bạn có muốn sinh phách cho kỳ thi?");
        }
    }
    const handleCloseGenRegCode = () => {
        setShowConfirmGenRegCode(false);
    }
    const handleDownloadRegistrationCodeFile = () => {
        
    }
    const handleProcess = (value) => {
        setShowProcess(value);
    }
    
    if (!exam) {
        return <div>Loading...</div>;
    }
    return(
        <div>
            <UploadStudent show={showUploadModal} handleClose={handleCloseUploadModal} examID={examId} checkOverwrite={isOverwrite} updateInformation={updateInformation} countRegistrationCode = {countRegistrationCode}/>
            <ConfirmGenRegCode show={showConfirmGenRegCode} handleClose={handleCloseGenRegCode} examID={examId} message={messageGenRegCode} updateInformation={updateInformation} isShowButtonOverWrite={isShowButtonOverWrite}/>
            <ExamMenu onConfirmUploadClick = {handleConfirmUploadClick} onGenRegistrationCode = {handleConfirmGenRegCodeClick} OnProcess={handleProcess}/>
            <h2 className='m-3'>{exam.examName}: {countStudentExam} (thí sinh) - {countRegistrationCode} (phách)</h2>
            <hr/>
            {(showProcess === 0) && <UpdateStatus OnDownloadFile = {handleDownloadRegistrationCodeFile} examID={examId}/>}
            {(showProcess === 1) && <DownloadRegistrationCode  examID={examId}/>}
            {(showProcess === 2) && <Statistics examID={examId}/>}
            {(showProcess === 3) && <ReviewTestScore examID={examId}/>}
            {(showProcess === 4) && <ExportTranscript examID={examId}/>}
            <Modal show={showConfirmationUpload} onHide={() => setShowConfirmationUpload(false)}>
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