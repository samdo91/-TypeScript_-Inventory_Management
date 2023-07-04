import React, { useState, useEffect } from "react";
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
  const recentProducts = async () => {
    const response = await axios(`${PROXY}/recentProducts`);
    setProductList([...response.data]);
  };

  const recentBusinessPartner = async () => {
    const response = await axios(`${PROXY}/recentBusinessPartner`);
    setBusinessPartnerList([...response.data]);
  };

  const recentInbound = async () => {
    const response = await axios(`${PROXY}/recentInbound`);
    console.log(response);
    setInboundList([...response.data]);
  };

  useEffect(() => {
    recentProducts();
    recentBusinessPartner();
    recentInbound();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            {/* 좌측 영역 */}
            <div style={{ height: "100vh" }}>
              <MainPageBody>
                <MainPageBoard />
              </MainPageBody>
            </div>
          </Col>
          <Col xs={12} md={8}>
            {/* 우측 영역 */}
            <div style={{ height: "100vh" }}>
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
                  "_id",
                  "date",
                  "product_id",
                  "employee_id",
                  "addProductQuantity",
                ]}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;

const MainPageBody = styled.body``;
