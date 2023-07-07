import styled from "@emotion/styled";
import React, { useState, useEffect, useCallback } from "react";
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
  const [, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState] = useAtom(loginStateAtom); //로그인 상태

  const [outnboundList, setOutboundList] = useState<OutboundsTY[]>([]); //출고 리스트

  const handleBusinessPartnerList = useCallback(async () => {
    const response = await axios.get(`${PROXY}/OutboundList`);
    const updatedList = response.data.map((item: any) => {
      const { _id, ...rest } = item;
      return {
        outbound_id: _id,
        ...rest,
      };
    });
    setOutboundList(updatedList);
  }, [setOutboundList]);

  useEffect(() => {
    handleBusinessPartnerList();
  }, []);

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
              "outbound_id",
              "date",
              "product_id",
              "BusinessPartner_id",
              "stockOutboundQuantity",
              "totalAmount",
            ]}
            itemField="outbound_id"
          />
        </OutboundSection>
        <SearchingSection>
          <SearchingBar
            setDataList={setOutboundList}
            keyList={[
              "outbound_id",
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
