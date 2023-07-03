import React, { useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import BulletinBoardComponent from "../Bulletin BoardComponent/BulletinBoardComponent";
import { InboundTY } from "../../../types/inbound";
import { useAtom } from "jotai";
import { loginModals, loginStateAtom } from "../../../globalStateManagement";
import Header from "../../Header/HeaderPage";

const data: InboundTY[] = [
  {
    productCode: 44332,
    productName: "아무",
    vendorCode: "거나",
    vendorName: "먹어",
    quantity: 232,
    purchasePrice: 44444,
    totalAmount: 44444,
  },
];

function Inboundpage() {
  const navigate = useNavigate();
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태
  const [inboundList, SetInboundList] = useState([]);
  return (
    <InboundPageBody>
      <header>
        <Header />
      </header>
      <HeaderSection>
        <Buttons>달력</Buttons>
        <Buttons
          onClick={() => {
            if (loginState) {
              navigate("/AddInboundpage"); // loginState가 true인 경우 /AddBusinessPartner로 라우팅
            } else {
              setLoginModal(true); // loginState가 false인 경우 setLoginModal(true) 실행
            }
          }}
        >
          신규입출고
        </Buttons>
      </HeaderSection>
      <Tittle>거래처 정보</Tittle>
      <VendorSection>
        <BulletinBoardComponent
          dataList={inboundList}
          rowKey={[
            "_id",
            "productName",
            "stock",
            "wholesalePrice",
            "retailPrice",
          ]}
        />
      </VendorSection>
      <SearchingSection></SearchingSection>
    </InboundPageBody>
  );
}

export default Inboundpage;
const InboundPageBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Tittle = styled.title``;
const VendorSection = styled.div``;
const SearchingSection = styled.section``;
