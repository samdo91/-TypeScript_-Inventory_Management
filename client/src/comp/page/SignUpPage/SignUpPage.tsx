import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Navbar } from "react-bootstrap";
import styled from "@emotion/styled";
import { UserSignUPDataTY } from "../../../types/userData";

function SignUpPage() {
  const [companyName, setCompanyName] = useState<string>(""); //회사명
  const [ID, setID] = useState<string>(""); // ID
  const [password, setPassword] = useState<string>(""); // 패스워드
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // 패스워드 확인
  const [name, setName] = useState<string>(""); // 이름
  const [eMail, setEMail] = useState<string>(""); // eMail
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [companyDepartment, setCompanyDepartment] = useState<string>(""); // 회사부서
  const [position, setPosition] = useState<string>(""); // 직책
  const [note, setNote] = useState<string>(""); // 비고

  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  // 로그인
  const validateFields = () => {
    if (ID === "") {
      alert("ID가 비어있습니다.");
      return false;
    }

    if (password === "") {
      alert("패스워드가 비어있습니다.");
      return false;
    }

    if (password != confirmPassword) {
      setConfirmPassword("");
      alert("확인 패스워드가 패스워드와 다릅니다.");
      return false;
    }

    if (name === "") {
      alert("이름이 비어있습니다.");
      return false;
    }

    if (eMail === "") {
      alert("E-Mail이 비어있습니다.");
      return false;
    }

    if (phoneNumber === "") {
      alert("전화번호가 비어있습니다.");
      return false;
    }

    if (companyDepartment === "") {
      alert("소속 부서가 비어있습니다.");
      return false;
    }

    if (position === "") {
      alert("직책이 비어있습니다.");
      return false;
    }

    return true;
  };

  const postSignUpData = async () => {
    if (!validateFields()) {
      return;
    }
    const SignUpData: UserSignUPDataTY = {
      companyName: companyName,
      ID: ID,
      password: password,
      name: name,
      eMail: eMail,
      phoneNumber: phoneNumber,
      companyDepartment: companyDepartment,
      position: position,
      note: note,
    };

    try {
      let response = await axios.post(`${PROXY}/signUp`, SignUpData);
      console.log(response);
      if (response) {
        window.location.href = "/";
      }
    } catch (e) {
      alert("제출이 제대로 되지 않았음 왜일까?");
    }
  };

  return (
    <SignUpPageBody>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>회원가입</Navbar.Brand>
      </Navbar>
      <SignUpSection>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>회사명</Form.Label>
          <Form.Control
            type="text"
            placeholder="회사명 입력"
            value={companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디 입력"
            value={ID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setID(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="페스워드를 입력해줘"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="페스워드를 입력해줘 한 번 더"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="사원 이름 입력"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="사용할 이메일을 적어주세요"
            value={eMail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEMail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>핸드폰</Form.Label>
          <Form.Control
            type="tel"
            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}"
            maxLength={13}
            placeholder="핸드폰 번호"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>소속 부서</Form.Label>
          <Form.Control
            as="select"
            value={companyDepartment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyDepartment(e.target.value);
            }}
          >
            <option value="">소속된 부서를 선택해주세요 </option>
            <option value="customerServiceTeam">C/S팀</option>
            <option value="salesTeam">영업팀</option>
            <option value="logisticsTeam">물류팀</option>
            <option value="ShippingTeam">출고팀</option>
            <option value="transportationTeam">운송팀</option>
          </Form.Control>
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>직책</Form.Label>
          <Form.Control
            as="select"
            value={position}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPosition(e.target.value);
            }}
          >
            <option value="">소속된 직책을 선택해주세요 </option>
            <option value="employee">사원</option>
            <option value="assistant">대리</option>
            <option value="manager">과장</option>
            <option value="teamLeader">팀장</option>
            <option value="director">부장</option>
          </Form.Control>
        </FormGroup>
        <FormGroup controlId="exampleForm.ControlInput1">
          <Form.Label>비고</Form.Label>
          <Form.Control
            type="text"
            placeholder="비고 및 특이 사항을 적어주세요"
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNote(e.target.value);
            }}
          />
        </FormGroup>
        <Button variant="primary" onClick={postSignUpData}>
          회원가입
        </Button>
      </SignUpSection>
    </SignUpPageBody>
  );
}

export default SignUpPage;

const SignUpPageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const SignUpSection = styled.section`
  dispaly: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 500px;
  margin-top: 20px;
`;

const FormGroup = styled(Form.Group)`
  margin: 15px;
`;
