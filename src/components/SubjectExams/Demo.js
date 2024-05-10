import axios from 'axios';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
const Demo = () => {
    const { examId } = useParams();
    const [subjectExams, setSubjectExams] = useState([]);
    const [keySearch, setKeySearch] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const fetchData = async () => {
        setIsNotFound(false);
        setIsLoaded(false);
        setIsError(false);
        try {
            const result = await axios.get(`http://localhost:5107/api/SubjectExam/admin-get-by-subject-code?examID=${examId}&subjectCode=${keySearch}`);
            setSubjectExams(result.data);
            if (result.data.length === 0) {
                setIsNotFound(true);
            }
            setIsLoaded(true);
        } catch (error) {
            console.error(error);
            setIsError(true);
        } 
    }

    const handleChange = (event) => {
        setKeySearch(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && keySearch !== "") {
          handleSearch();
        }
    };
    const handleSearch = () => {
        if(keySearch!== "")
        {
            fetchData();
        }
    }
    const handleUpdateCandidatesAbsent = async (subjectExam) => {
        try {
            const result = await axios.put(`http://localhost:5107/api/SubjectExam/admin-update?subjectExamID=${subjectExam.subjectExamID}&checkData=${true}&dataUpdate=${!subjectExam.isEnterCandidatesAbsent}`);
            if (result.data === "Done") {
                fetchData();
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        }
    }
    const handleUpdateMatchingTestScore = async (subjectExam) => {
        try {
            const result = await axios.put(`http://localhost:5107/api/SubjectExam/admin-update?subjectExamID=${subjectExam.subjectExamID}&checkData=${false}&dataUpdate=${!subjectExam.isMatchingTestScore}`);
            if (result.data === "Done") {
                fetchData();
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        } 
    }
    return (
        <div>
            <div className='m-3'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control col-xl-3 col-xxl-2" placeholder="Nhập mã môn để tìm kiếm"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button type="button" className="btn btn-outline-primary" onClick={handleSearch}><FaSearch/></button>
                </div>
            </div>
            <hr/>
            <div className='row m-3'>
                {isLoaded && (
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
                            {subjectExams && subjectExams.map((subjectExam) => (
                                <tr key={subjectExam.subjectExamID}>
                                    <td className="text-center">{subjectExam.subjectCode}</td>
                                    <td className="text-center">{subjectExam.subject && subjectExam.subject.subjectName}</td>
                                    <td className="text-center">{subjectExam.examBag}</td>
                                    <td className="text-center">
                                        {subjectExam.isEnterCandidatesAbsent === true ?
                                        <IoMdCheckmarkCircleOutline className='text-primary ud-cursor' onDoubleClick={() => handleUpdateCandidatesAbsent(subjectExam)} size={30} title="Double click để mở chức năng nhập vắng thi"/> : 
                                        <MdOutlineRadioButtonUnchecked className='text-danger ud-cursor' onDoubleClick={() => handleUpdateCandidatesAbsent(subjectExam)} size={30} title="Double click để khoá chức năng nhập vắng thi"/>}
                                    </td>
                                    <td className="text-center">
                                        {subjectExam.isMatchingTestScore === true ?
                                        <IoMdCheckmarkCircleOutline className='text-primary ud-cursor' onDoubleClick={() => handleUpdateMatchingTestScore(subjectExam)} size={30} title="Double click để mở chức năng nhập điểm"/> : 
                                        <MdOutlineRadioButtonUnchecked className='text-danger ud-cursor' onDoubleClick={() => handleUpdateMatchingTestScore(subjectExam)} size={30} title="Double click để khoá chức năng nhập điểm"/>}
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

export default Demo;