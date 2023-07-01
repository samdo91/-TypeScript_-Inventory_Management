import styled from "@emotion/styled";
import React, { useEffect, Dispatch, SetStateAction } from "react";
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
import Clock from "./Clock";

type HeaderPropsTY = {
  setDate?: Dispatch<SetStateAction<Date>>;
};

function Header({ setDate }: HeaderPropsTY) {
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
    try {
      const response = await axios.post(`${PROXY}/profile`, {});

      if (response.data === false) {
        return;
      } else {
        setUserData((prevUserData) => ({
          ...prevUserData,
          loginState: true,
          token: true,
          ...response.data,
        }));
        setLoginState(true);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${PROXY}/logout`, {});

      console.log("response", response.data);

      if (response.data) {
        setUserData(() => ({
          loginState: false,
          token: false,
          companyName: "",
          ID: "",
          password: "",
          name: "",
          eMail: "",
          phoneNumber: "",
          companyDepartment: "",
          position: "",
          note: "",
          _id: "",
        }));

        setLoginState(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!userData.token) {
      logincookie();
    }
  }, []);

  return (
    <HeaderBody>
      <HeaderSection>
        <Link to="/">
          <Logo>WareHouse!</Logo>
        </Link>
        {loginState ? (
          <CompanyName>{userData.companyName}</CompanyName>
        ) : (
          <CompanyName>회사이름</CompanyName>
        )}
        {loginState ? (
          <MyName>{userData.name}</MyName>
        ) : (
          <MyName>내이름 </MyName>
        )}

        <Clock setDate={setDate} />
        <section>
          {loginState ? (
            <Button
              variant="outline-primary"
              className="m-1"
              onClick={handleLogout}
            >
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
