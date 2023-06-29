import React from "react";
import Header from "../../Header/HeaderPage";
import styled from "@emotion/styled";
import MainPageBoard from "./MainPageLInkButton/MainPageLInkButton";
import BulletinBoard from "./BulletinBoard/BulletinBoard";
import { Container, Row, Col } from "react-bootstrap";
function MainPage() {
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
              <BulletinBoard
                tittle="최근 등록 품목"
                rowKey={[
                  "id", // product_id
                  "productName", // product Name
                  "wholesalePrice", // 입고가
                  "retailPrice", // 출고가
                  "stock", // 재고
                ]}
              />
              <BulletinBoard
                tittle="최근 등록 회사"
                rowKey={[
                  "id",
                  "BusinessPartnerName",
                  "telephoneNumber",
                  "credit",
                ]}
              />
              <BulletinBoard
                tittle="최근 입고 품목"
                rowKey={[
                  "id", // 이벤트_id
                  "productName", // 입고 상품 이름
                  "BusinessPartnerName",
                  "date", // 날짜
                  "receivingStock", // 총액
                ]}
              />
            </div>
          </Col>
        </Row>
      </Container>
      MainPage
    </div>
  );
}

export default MainPage;

const MainPageBody = styled.body``;
