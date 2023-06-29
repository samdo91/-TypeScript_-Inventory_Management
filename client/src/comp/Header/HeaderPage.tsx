import styled from "@emotion/styled";
import React, { useEffect } from "react";
import NavPage from "./NavPage";
import LoginPage from "../page/LoginPage/LoginPage";
import { useAtom } from "jotai";
import {
  loginModals,
  userDataAtom,
  loginStateAtom,
} from "../../globalStateManagement";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header() {
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [userData, setUserData] = useAtom(userDataAtom);
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태
  const handleLoginModal = () => {
    setLoginModal(!loginModal);
  };
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  //쿠키가 있나 없나 검증하며 있다면 쿠키를 불러온다.
  const logincookie = async () => {
    let response;
    try {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옵니다.

      console.log(token);
      response = await axios.post(`${PROXY}/profile`, {});
      console.log("response", response);
      if (response.data === false) {
        return;
      } else {
        setUserData({ loginState: true, token: token, ...response.data }); // token을 추가로 설정합니다.
        setLoginState(true);
      }
    } catch (e) {}

    return response?.data;
  };

  useEffect(() => {
    if (userData.token === false) {
      // userData.loginState가 false가 아닌 경우에 실행되도록 수정합니다.
      logincookie(); // 반환된 response는 사용하지 않으므로 변수 할당을 제거합니다.
    }
  }, []);
  return (
    <HeaderBody>
      <HeaderSection>
        <Logo>WareHouse!</Logo>
        <CompanyName>회사이름</CompanyName>
        <section>
          {loginState ? (
            <Button variant="outline-primary" className="m-1">
              로그아웃
            </Button>
          ) : (
            <Button
              variant="outline-primary"
              onClick={handleLoginModal}
              className="m-1"
            >
              로그인
            </Button>
          )}

          <Link to="/SignUp">
            <Button variant="outline-primary" className="m-1">
              회원가입
            </Button>
          </Link>
        </section>
        <MyName>내이름 + 최종 로그인 시간 </MyName>
      </HeaderSection>

      {loginModal ? <LoginPage /> : ""}
      <NavPage />
    </HeaderBody>
  );
}

export default Header;

const HeaderBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 10px;
  width: 1900px;
`;
const Logo = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const CompanyName = styled.div`
  width: 200px;
`;

const MyName = styled.div``;
