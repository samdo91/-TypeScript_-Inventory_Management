import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import SearchingBar from "../../SearchingBar/SearchingBar";
import Header from "../../Header/HeaderPage";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import { useAtom } from "jotai";
import { loginStateAtom, loginModals } from "../../../globalStateManagement";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { OutboundsTY } from "../../../types/outbound";
import axios from "axios";

function OutboundPage() {
  const navigate = useNavigate();
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태

  const [outnboundList, setOutboundList] = useState<OutboundsTY[]>([]); //출고 리스트

  // const handleBusinessPartnerList = async () => {
  //   const response = await axios.get(`${PROXY}/OutnboundList`);
  //   console.log(response.data);
  //   setOutboundList([...response.data]);
  // };

  // useEffect(() => {
  //   handleBusinessPartnerList();
  // }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <OutboundBody>
        <HeaderSection>
          <Buttons>달력</Buttons>
          <Buttons
            onClick={() => {
              if (loginState) {
                navigate("/AddOutboundpage"); // loginState가 true인 경우 /AddInboundpage로 라우팅(고쳐야해)
              } else {
                setLoginModal(true); // loginState가 false인 경우 setLoginModal(true) 실행(고쳐야해)
              }
            }}
          >
            신규출고
          </Buttons>
        </HeaderSection>
        <Title>출고 정보</Title>
        <OutboundSection>
          <BulletinBoardComponent
            dataList={outnboundList}
            rowKey={[
              "_id",
              "date",
              "product_id",
              "BusinessPartner_id",
              "stockOutboundQuantity",
              "totalAmount",
            ]}
          />
        </OutboundSection>
        <SearchingSection>
          <SearchingBar
            setItemList={setOutboundList}
            keyList={[
              "_id",
              "date",
              "product_id",
              "BusinessPartner_id",
              "stockOutboundQuantity",
              "totalAmount",
            ]}
            Theme="product"
          />
        </SearchingSection>
      </OutboundBody>
    </div>
  );
}

export default OutboundPage;

const OutboundBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Title = styled.title``;
const SearchingSection = styled.section``;
const OutboundSection = styled.section``;
