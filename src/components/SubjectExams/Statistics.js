import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";

const Statistics = () => {
    const { examId } = useParams();
    const [subjectExams, setSubjectExams] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [isEnterCandidatesAbsent, setIsEnterCandidatesAbsent] = useState(true);
    const [isMatchingTestScore, setIsMatchingTestScore] = useState(true);
    const fetchData = async () => {
        setIsNotFound(false);
        setIsLoaded(false);
        setIsError(false);
        try {
            const result = await axios.get(`http://localhost:5107/api/SubjectExam/admin-get-by-subject-code-by-examId?examID=${examId}`);
            
            const filteredData = result.data.filter(subjectExam => subjectExam.isEnterCandidatesAbsent === isEnterCandidatesAbsent && subjectExam.isMatchingTestScore === isMatchingTestScore);
            setSubjectExams(filteredData);
            if (result.data.length === 0) {
                setIsNotFound(true);
            }
            setIsLoaded(true);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } 
    }
    const handleSearch = () => {
        fetchData();
    }
    const handleDownload = async () => {
        const response = await axios.get(`http://localhost:5107/api/SubjectExam/download-excel-file?examID=${examId}&isEnterCandidatesAbsent=${isEnterCandidatesAbsent}&isMatchingTestScore=${isMatchingTestScore}`, {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'SubjectExamStatusList' + '.xlsx'); // Đặt tên file mặc định
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      }
    return (
        <div>
            <div className='row m-3'>
                <div className="form-check col-lg-2 mt-1">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isEnterCandidatesAbsent}
                    onChange={() => setIsEnterCandidatesAbsent(!isEnterCandidatesAbsent)}
                    />
                    <label className="form-check-label">Đã nhập danh sách vắng thi</label>
                </div>
                <div className="form-check col-lg-1 mt-1">
                    <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isMatchingTestScore}
                    onChange={() => setIsMatchingTestScore(!isMatchingTestScore)}
                    />
                    <label className="form-check-label">Đã nhập điểm</label>
                </div>
                <div className="col-lg-1">
                    <button type="button" className="btn btn-outline-primary" onClick={handleSearch}><FaSearch/></button>
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleDownload}><MdFileDownload size={20}/></button>
                </div>
            </div>
            <hr/>
            <div className='row m-3'>
                {isLoaded && (
                    <table className='table table-hover table-bordered border border-primary'>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Mã môn</th>
                                <th className="text-center">Tên môn</th>
                                <th className="text-center">Túi bài thi</th>
                                <th className="text-center">Nhập vắng thi</th>
                                <th className="text-center">Nhập điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjectExams && subjectExams.map((subjectExam, index) => (
                                <tr key={subjectExam.subjectExamID}>
                                    <td className="text-center align-middle">{index+1}</td>
                                    <td className="text-center">{subjectExam.subjectCode}</td>
                                    <td className="text-center">{subjectExam.subject && subjectExam.subject.subjectName}</td>
                                    <td className="text-center">{subjectExam.examBag}</td>
                                    <td className="text-center">
                                        {subjectExam.isEnterCandidatesAbsent === true ?
                                        <IoMdCheckmarkCircleOutline className='text-primary' size={30} title="Double click để mở chức năng nhập vắng thi"/> : 
                                        <MdOutlineRadioButtonUnchecked className='text-danger' size={30} title="Double click để khoá chức năng nhập vắng thi"/>}
                                    </td>
                                    <td className="text-center">
                                        {subjectExam.isMatchingTestScore === true ?
                                        <IoMdCheckmarkCircleOutline className='text-primary' size={30} title="Double click để mở chức năng nhập điểm"/> : 
                                        <MdOutlineRadioButtonUnchecked className='text-danger' size={30} title="Double click để khoá chức năng nhập điểm"/>}
                                    </td>
                                </tr>
                            ))}
                            {isNotFound && (
                                <tr>
                                    <td className="text-center text-primary" colSpan={5}><h2>Không tìm thấy dữ liệu theo yêu cầu!</h2></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
                {isError && (
                    <table className='table table-hover table-bordered border border-primary'>
                        <thead>
                            <tr>
                                <th className="text-center">Mã môn</th>
                                <th className="text-center">Tên môn</th>
                                <th className="text-center">Túi bài thi</th>
                                <th className="text-center">Nhập vắng thi</th>
                                <th className="text-center">Nhập điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="text-center text-primary" colSpan={5}><h2>Mất kết nối tới máy chủ, vui lòng tắt trình duyệt và thử lại sau!</h2></td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Statistics;