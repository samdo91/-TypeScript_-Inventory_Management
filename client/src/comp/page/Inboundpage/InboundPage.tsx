import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import { InboundTY } from "../../../types/inbound";
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
  const [inboundList, setInboundList] = useState<InboundTY[]>([]);

  const handleProductDataList = async () => {
    try {
      const response = await axios.get(`${PROXY}/InboundList`);
      const updatedList = response.data.map((item: any) => {
        const { _id, ...rest } = item;
        return {
          inbound_id: _id,
          ...rest,
        };
      });
      setInboundList(updatedList);
      console.log("inboundList", inboundList);
    } catch (error) {

      console.error("Error fetching inbound data:", error);
    }
  };

  useEffect(() => {
    handleProductDataList().then(() => {
      console.log("inboundList", inboundList);
    });
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
              navigate("/AddInboundpage"); // loginState가 true인 경우 /AddInboundpage로 라우팅
            } else {
              setLoginModal(true); // loginState가 false인 경우 setLoginModal(true) 실행
            }
          }}
        >
          신규입고
        </Buttons>
      </HeaderSection>
      <Title>입고정보</Title>
      <InboundSection>
        <BulletinBoardComponent
          dataList={inboundList}
          rowKey={[
            "inbound_id",
            "date",
            "product_id",
            "employee_id",
            "addProductQuantity",
          ]}
          itemField="inbound_id"
        />
      </InboundSection>
      <SearchingSection>
        <SearchingBar
          setDataList={setInboundList}
          keyList={[
            "inbound_id",
            "date",
            "product_id",
            "employee_id",
            "addProductQuantity",
          ]}
          Theme="inbound"
        />
      </SearchingSection>
    </InboundPageBody>
  );
}

export default InboundPage;
const InboundPageBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Title = styled.title``;
const InboundSection = styled.div``;
const SearchingSection = styled.section``;
