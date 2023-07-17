import React, { useState, useEffect, useCallback } from "react";
import Header from "../../Header/HeaderPage";
import styled from "@emotion/styled";
import MainPageBoard from "./MainPageLInkButton/MainPageLInkButton";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import { Container, Row, Col } from "react-bootstrap";
import { productTY } from "../../../types/product";
import { BusinessPartnerTY } from "../../../types/businessPartner";
import axios from "axios";
import { AddInboundTY } from "../../../types/inbound";

function MainPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [productList, setProductList] = useState<productTY[]>([]);
  const [businessPartnerList, setBusinessPartnerList] = useState<
    BusinessPartnerTY[]
  >([]);
  const [inboundList, setInboundList] = useState<AddInboundTY[]>([]);

  const recentProducts = useCallback(async () => {
    const response = await axios(`${PROXY}/recentProducts`);
    setProductList([...response.data]);
  }, [PROXY, setProductList]);

  const recentBusinessPartner = useCallback(async () => {
    const response = await axios(`${PROXY}/recentBusinessPartner`);
    setBusinessPartnerList([...response.data]);
  }, [PROXY, setBusinessPartnerList]);

  const recentInbound = useCallback(async () => {
    const response = await axios(`${PROXY}/recentInbound`);
    console.log(response);
    const updatedList = response.data.map((item: any) => {
      const { _id, ...rest } = item;
      return {
        inbound_id: _id,
        ...rest,
      };
    });
    setInboundList(updatedList);
  }, [PROXY, setInboundList]);

  useEffect(() => {
    recentProducts();
    recentBusinessPartner();
    recentInbound();
  }, [recentProducts, recentBusinessPartner, recentInbound]);

  return (
    <MainContainer>
      <header>
        <Header />
      </header>
      <Container>
        <Row>
          {/* 우측 영역 (최근 등록 품목, 최근 등록 회사, 최근 입고) */}
          <Col md={8}>
            <MainContent>
              <BulletinBoardComponent
                title="최근 등록 품목"
                dataList={productList}
                rowKey={[
                  "_id",
                  "productName",
                  "stock",
                  "wholesalePrice",
                  "retailPrice",
                ]}
                itemField="productName"
              />
              <BulletinBoardComponent
                title="최근 등록 회사"
                dataList={businessPartnerList}
                rowKey={["_id", "BusinessPartnerName", "credit"]}
                itemField={"BusinessPartnerName"}
              />
              <BulletinBoardComponent
                title="최근 입고"
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
            </MainContent>
          </Col>
          {/* 좌측 영역 (메인 페이지 버튼 등) */}
          <Col md={4}>
            <MainPageBody>
              <MainPageBoard />
            </MainPageBody>
          </Col>
        </Row>
      </Container>
    </MainContainer>
  );
}

export default MainPage;

const MainContainer = styled.div`
  padding-top: 20px;
`;

const MainContent = styled.div`
  height: 100vh;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const MainPageBody = styled.body``;
