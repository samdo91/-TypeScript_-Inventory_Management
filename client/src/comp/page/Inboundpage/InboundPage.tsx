import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import { AddInboundTY } from "../../../types/inbound";
import { useAtom } from "jotai";
import { loginModals, loginStateAtom } from "../../../globalStateManagement";
import Header from "../../Header/HeaderPage";
import axios from "axios";
import SearchingBar from "../../SearchingBar/SearchingBar";

function InboundPage() {
  const navigate = useNavigate();
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태
  const [inboundList, setInboundList] = useState<AddInboundTY[]>([]);

  const handleProductDataList = async () => {
    const response = await axios.get(`${PROXY}/InboundList`);
    console.log(response.data);
    setInboundList([...response.data]);
  };

  useEffect(() => {
    handleProductDataList();
  }, []);

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
      <InboundSection>
        <BulletinBoardComponent
          dataList={inboundList}
          rowKey={[
            "_id",
            "date",
            "product_id",
            "employee_id",
            "addProductQuantity",
          ]}
        />
      </InboundSection>
      <SearchingSection>
        <SearchingBar
          setItemList={setInboundList}
          keyList={[
            "_id",
            "date",
            "product_id",
            "employee_id",
            "addProductQuantity",
          ]}
          Theme="product"
        />
      </SearchingSection>
    </InboundPageBody>
  );
}

export default InboundPage;
const InboundPageBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Tittle = styled.title``;
const InboundSection = styled.div``;
const SearchingSection = styled.section``;
