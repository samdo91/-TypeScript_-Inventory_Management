import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAtom } from "jotai";
import {
  loginModals,
  userDataAtom,
  loginStateAtom,
} from "../../../globalStateManagement";
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

  const [, setLoginState] = useAtom(loginStateAtom); //로그인이 되어있는지 안되어 있는지

  const handleClose = () => setLoginModal(false); //모달 창 닫기 함수

  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const handleLoginButton = async () => {
    if (!ID) {
      alert("id를 적어주세요.");
      return;
    }
    if (!password) {
      alert("Password를 적어주세요.");
      return;
    }

    const loginData: LoginDataTY = {
      ID: ID,
      password: password,
    };

    try {
      const response = await axios.post(`${PROXY}/login`, loginData, {
        withCredentials: true,
      });
      console.log("response", response.data);

      if (response.data) {
        setUserData({ loginState: true, token: true, ...response.data });
        setLoginState(true);
      } else {
        alert("올바른 ID와 페스워드가 아닙니다");
        return;
      }
    } catch (e) {
      alert("제출이 제대로 되지 않았음 왜일까?");
    }
    console.log(userData);
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
                type="password"
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
