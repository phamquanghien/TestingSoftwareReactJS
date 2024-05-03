import React, { useState } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  FormControl,
  FormText,
} from "react-bootstrap";
import styled from "styled-components";

const StyledInput = styled(FormControl)`
  margin-bottom: 15px;
`;

const EnterExamResult = ({ show, handleClose, examID }) => {
  const [examResults, setExamResults] = useState([]);
  const [rowData, setRowData] = useState({
    registrationCode: "",
    point1: "",
    point2: "",
    average: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRowData({
      ...rowData,
      [name]: value,
    });
  };

  const handleAddResult = () => {
    if (
      examResults.some(
        (result) => result.registrationCode === rowData.registrationCode
      )
    ) {
      alert("Số phách đã tồn tại. Vui lòng nhập lại số phách khác.");
      return;
    }

    if (rowData.registrationCode && rowData.point1 && rowData.point2) {
      const average =
        (parseFloat(rowData.point1) + parseFloat(rowData.point2)) / 2; // Calculate average
      setExamResults([...examResults, { ...rowData, average }]); // Add average to rowData before pushing
      setRowData({
        registrationCode: "",
        point1: "",
        point2: "",
        average: "",
      });
    }
  };

  const handleSaveResults = () => {
    console.log(examResults); // Log the array of exam results
    handleClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nhập kết quả thi:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <Form.Label for="registrationCode">Số phách</Form.Label>
            <StyledInput
              id="registrationCode"
              type="text"
              name="registrationCode"
              value={rowData.registrationCode}
              onChange={handleInputChange}
              placeholder="Số phách"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label for="point1">Điểm 1</Form.Label>
            <StyledInput
              id="point1"
              type="text"
              name="point1"
              value={rowData.point1}
              onChange={handleInputChange}
              placeholder="Điểm 1"
            />
          </FormGroup>
          <FormGroup>
            <Form.Label for="point2">Điểm 2</Form.Label>
            <StyledInput
              id="point2"
              type="text"
              name="point2"
              value={rowData.point2}
              onChange={handleInputChange}
              placeholder="Điểm 2"
            />
          </FormGroup>
          <Button variant="primary" onClick={handleAddResult}>
            Thêm
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Số phách</th>
              <th>Điểm 1</th>
              <th>Điểm 2</th>
              <th>Điểm trung bình</th>
            </tr>
          </thead>
          <tbody>
            {examResults.map((result, index) => (
              <tr key={index}>
                <td>{result.registrationCode}</td>
                <td>{result.point1}</td>
                <td>{result.point2}</td>
                <td>{result.average}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveResults}>
          Lưu điểm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnterExamResult;
