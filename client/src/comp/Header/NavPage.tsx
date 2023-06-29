import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
type NavigationProps = {
  // Props 타입 정의 (필요한 경우 추가)
};

function NavPage() {
  return (
    <Navbar bg="light" expand="lg" style={{ width: "1900px" }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/ItemInformation">
            <Nav.Link href="#contact">품목 정보</Nav.Link>
          </Link>
          <Link to="/VendorInformation">
            <Nav.Link href="#contact">거래처 정보</Nav.Link>
          </Link>
          <Nav.Link href="#contact">입고</Nav.Link>
          <Nav.Link href="#contact">출고</Nav.Link>
          <Nav.Link href="#contact">손익확인</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavPage;
