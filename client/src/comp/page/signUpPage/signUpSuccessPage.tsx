import styled from "@emotion/styled";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { loginModals } from "../../../store/globalStateManagement";
import LoginPage from "../loginPage/loginPage";
function SignUpSuccessPage() {
  const [loginModal, setLoginModal] = useAtom(loginModals);
  const handleLoginModal = () => {
    setLoginModal(!loginModal);
  };
  return (
    <SignUpSuccessBody>
      <div>
        로그인을 축하드립니다. 아래의 버튼을 눌러 메인페이지로 돌아가시거나
        로그인해주세요.
      </div>
      <Link to="/">
        <Button variant="primary">메인페이지로</Button>
      </Link>

      <Button variant="primary" onClick={handleLoginModal}>
        Login Now!
      </Button>
      {loginModal ? <LoginPage /> : ""}
    </SignUpSuccessBody>
  );
}

export default SignUpSuccessPage;

const SignUpSuccessBody = styled.div``;
