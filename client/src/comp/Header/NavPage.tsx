import React from "react";
import { Navbar, Nav } from "react-bootstrap";

type NavigationProps = {
  // Props 타입 정의 (필요한 경우 추가)
};

function NavPage() {
  return (
    <Navbar bg="light" expand="lg" style={{ width: "1900px" }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/ItemInformation">품목 정보</Nav.Link>
          <Nav.Link href="/BusinessPartner">거래처 정보</Nav.Link>
          <Nav.Link href="/Inboundpage">입고</Nav.Link>
          <Nav.Link href="/OutboundPage">출고</Nav.Link>
          <Nav.Link href="#contact">손익확인</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavPage;
