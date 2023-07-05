import styled from "@emotion/styled";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function MainPageLInkButton() {
  return (
    <ButtonBody>
      <Link to="/ItemInformation">
        <Button
          variant="primary"
          style={{ height: "150px", width: "450px", margin: "10px" }}
        >
          <div>
            <h3>품목정보</h3>
            <p>product를 확인하고 신규 product를 등록합니다.</p>
          </div>
        </Button>
      </Link>
      <Link to="/BusinessPartner">
        <Button
          variant="primary"
          style={{ height: "150px", width: "450px", margin: "10px" }}
        >
          <div>
            <h3>거래처 정보</h3>
            <p>거래처 정보를 확인하고 신규 거래처를 등록합니다.</p>
          </div>
        </Button>
      </Link>
      <Link to="/Inboundpage">
        <Button
          variant="primary"
          style={{ height: "150px", width: "450px", margin: "10px" }}
        >
          <div>
            <h3>입고</h3>
            <p>이미 저장된 프로덕트에 새 재고를 입고 시킵니다</p>
          </div>
        </Button>
      </Link>
      <Link to="/OutboundPage">
        <Button
          variant="primary"
          style={{ height: "150px", width: "450px", margin: "10px" }}
        >
          <div>
            <h3>출고</h3>
            <p>비지니스 파트너에서 들어온 오더로 프로덕트를 출고 시킵니다.</p>
          </div>
        </Button>
      </Link>
      <Link to="/">
        <Button
          variant="primary"
          style={{ height: "150px", width: "450px", margin: "10px" }}
        >
          <div>
            <h3>손익확인</h3>
            <p>Button Description</p>
          </div>
        </Button>
      </Link>
    </ButtonBody>
  );
}

export default MainPageLInkButton;

const ButtonBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`;
