import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Header/HeaderPage";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import SearchingBar from "../../SearchingBar/SearchingBar";
import { BusinessPartnerTY } from "../../../types/businessPartner";
import {
  loginStateAtom,
  loginModals,
} from "../../../globalStateManagement/index";
import { useAtom } from "jotai";
import axios from "axios";
export type TableItemTY = {
  vendorCode: string;
  BusinessPartnerName: string;
  credit: number;
};

function BusinessPartnerPage() {
  const navigate = useNavigate();
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태

  const [businessPartnerList, setBusinessPartnerList] = useState<
    BusinessPartnerTY[]
  >([]);

  const handleBusinessPartnerList = async () => {
    const response = await axios.get(`${PROXY}/businessPartnerList`);
    console.log(response.data);
    setBusinessPartnerList([...response.data]);
  };

  useEffect(() => {
    handleBusinessPartnerList();
  }, []);
  return (
    <div>
      <header>
        <Header />
      </header>
      <BusinessPartnerBody>
        <HeaderSection>
          <Buttons>메일전송</Buttons>
          <Buttons
            onClick={() => {
              if (loginState) {
                navigate("/AddBusinessPartner"); // loginState가 true인 경우 /AddBusinessPartner로 라우팅
              } else {
                setLoginModal(true); // loginState가 false인 경우 setLoginModal(true) 실행
              }
            }}
          >
            신규업체 등록
          </Buttons>
        </HeaderSection>
        <Tittle>거래처 정보</Tittle>
        <BusinessPartnerSection>
          <BulletinBoardComponent
            dataList={businessPartnerList}
            rowKey={["_id", "BusinessPartnerName", "credit"]}
            itemField={"BusinessPartnerName"}
          />
        </BusinessPartnerSection>
        <SearchingSection>
          <SearchingBar
            setItemList={setBusinessPartnerList}
            keyList={["_id", "BusinessPartnerName", "credit"]}
            Theme="businessPartner"
          />
        </SearchingSection>
      </BusinessPartnerBody>
    </div>
  );
}

export default BusinessPartnerPage;

const BusinessPartnerBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Tittle = styled.title``;
const BusinessPartnerSection = styled.div``;
const SearchingSection = styled.section``;
