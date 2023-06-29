import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
function MainPageLInkButton() {
  return (
    <div>
      <Link to="/ItemInformation">
        <Button variant="primary" style={{ height: "150px", width: "500px" }}>
          <div>
            <h3>품목정보</h3>
            <p>product를 확인하고 신규 product를 등록합니다.</p>
          </div>
        </Button>
      </Link>
      <Link to="/VendorInformation">
        <Button variant="primary" style={{ height: "150px", width: "500px" }}>
          <div>
            <h3>거래처 정보</h3>
            <p>거래처 정보를 확인하고 신규 거래처를 등록합니다.</p>
          </div>
        </Button>
      </Link>
      <Link to="/">
        <Button variant="primary" style={{ height: "150px", width: "500px" }}>
          <div>
            <h3>입고</h3>
            <p>Button Description</p>
          </div>
        </Button>
      </Link>
      <Link to="/">
        <Button variant="primary" style={{ height: "150px", width: "500px" }}>
          <div>
            <h3>출고</h3>
            <p>Button Description</p>
          </div>
        </Button>
      </Link>
      <Link to="/">
        <Button variant="primary" style={{ height: "150px", width: "500px" }}>
          <div>
            <h3>손익확인</h3>
            <p>Button Description</p>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default MainPageLInkButton;
