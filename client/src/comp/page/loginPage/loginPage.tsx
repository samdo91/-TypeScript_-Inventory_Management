import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAtom } from "jotai";
import {
  loginModals,
  userDataAtom,
  loginStateAtom,
} from "../../../store/globalStateManagement";
import axios from "axios";
import { Link } from "react-router-dom";

export type LoginDataTY = {
  ID: string;
  password: string;
};

function LoginPage() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const [ID, setID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginState, setLoginState] = useAtom(loginStateAtom);
  const handleClose = () => setLoginModal(false); //모달 창 닫기 함수

  const handleLoginButton = async () => {
    const loginData: LoginDataTY = {
      ID: ID,
      password: password,
    };
    console.log(loginData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/login",
        loginData,
        { withCredentials: true }
      );
      console.log("response", response);
      if (response) {
        setUserData({ loginState: true, token: true, ...response.data });
        setLoginState(true);
      }
    } catch (e) {
      alert("제출이 제대로 되지 않았음 왜일까?");
    }
    handleClose();
  };

  return (
    <div>
      <Modal show={loginModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디를 입력해줘"
                value={ID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setID(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="text"
                placeholder="페스워드를 입력해줘"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/SignUp">
            <Button variant="secondary" onClick={handleClose}>
              회원가입
            </Button>
          </Link>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLoginButton}>
            Login Now!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginPage;
