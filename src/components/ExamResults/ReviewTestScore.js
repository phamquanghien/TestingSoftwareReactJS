import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const ReviewTestScore = () => {
    const { examId } = useParams();
    const [examResult, setExamResult] = useState({});
    const [subjectCode, setSubjectCode] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [reviewScore, setReviewScore] = useState("");

    const fetchData = async () => {
        setIsLoaded(false); // Reset isLoaded before fetching data
        try {
            const response = await axios.get(`http://localhost:5107/api/ExamResult/admin-get-by-student-code?examID=${examId}&subjectCode=${subjectCode}&studentCode=${studentCode}`);
            setExamResult(response.data[0]);
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching exam result:', error);
        }
    };

    const handleChangeSubjectCode = (event) => {
        setSubjectCode(event.target.value);
    };

    const handleChangeStudentCode = (event) => {
        setStudentCode(event.target.value);
    };
    const handleChangeReviewScore = (event) => {
        var inputStringValue = event.target.value.trim();
        if (inputStringValue.length > 0) {
            var inputIntValue = parseFloat(inputStringValue);
            if (inputIntValue < 0) {
                setReviewScore('0');
                inputIntValue = 0;
            } else if (inputIntValue > 10) {
                setReviewScore('10');
                inputIntValue = 10;
            } else {
                setReviewScore(inputIntValue.toString());
            }
            var scoreResult = "" + inputIntValue;
            const updatedExamResult = { ...examResult, averageScore: scoreResult, reviewScore: scoreResult, isReview: true };
            setExamResult(updatedExamResult);
        } else {
            setReviewScore("");
        }
    };
    
    const handleSearch = () => {
        fetchData();
    };
    const handleSaveReviewScore = async () => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn lưu điểm phúc khảo?");
        if (isConfirmed) {
            try {
                const response = await axios.put(`http://localhost:5107/api/ExamResult/${examResult.examResultID}`, examResult);
                alert(response.data)
            } catch (error) {
                console.error('Error fetching exam result:', error);
                alert('Thất bại');
            }
        }
    }
    return (
        <div>
            <div className='w3-row w3-margin-bottom'>
                <div className='w3-col l2 w3-padding'>
                    <input type='text' className='w3-input w3-border w3-border-blue w3-round' onChange={handleChangeSubjectCode} placeholder='Nhập mã môn học'/>
                </div>
                <div className='w3-col l2 w3-padding'>
                    <input type='text' className='w3-input w3-border w3-border-blue w3-round' onChange={handleChangeStudentCode} placeholder='Nhập mã Sinh viên'/>
                </div>
                <div className='w3-col l1 w3-padding'>
                    <button type="button" className="btn btn-outline-primary w3-padding" onClick={handleSearch}><FaSearch/></button>
                </div>
            </div>
            <div className='w3-row'>
                {isLoaded && examResult && (
                    <>
                        <table className='w3-table w3-table-all w3-centered'>
                            <thead>
                                <tr>
                                    <th className='w3-col l2'>Số phách</th>
                                    <th className='w3-col l2'>Điểm 1</th>
                                    <th className='w3-col l2'>Điểm 2</th>
                                    <th className='w3-col l2'>Điểm trung bình</th>
                                    <th className='w3-col l2'>Nhập điểm phúc khảo</th>
                                    <th className='w3-col l2'>Nhập điểm phúc khảo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='w3-col l2'>{examResult.registrationCodeNumber}</td>
                                    <td className='w3-col l2'>{examResult.examResult1}</td>
                                    <td className='w3-col l2'>{examResult.examResult2}</td>
                                    <td className='w3-col l2'>{examResult.averageScore}</td>
                                    <th className='w3-col l2'>
                                        <input type='text' className='w3-input w3-border w3-border-blue w3-round' value={reviewScore} onChange={handleChangeReviewScore}/>
                                    </th>
                                    <th className='w3-col l2'>
                                        <button className='w3-button w3-white w3-border w3-border-blue w3-round w3-text-blue' onClick={handleSaveReviewScore}>Edit</button>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
                {isLoaded && !examResult &&(
                    <>
                        <table className='w3-table-all w3-centered'>
                            <thead>
                                <tr>
                                    <th>Số phách</th>
                                    <th>Điểm 1</th>
                                    <th>Điểm 2</th>
                                    <th>Điểm trung bình</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={4}><h3>Không tìm thấy dữ liệu theo yêu cầu</h3></td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewTestScore;
