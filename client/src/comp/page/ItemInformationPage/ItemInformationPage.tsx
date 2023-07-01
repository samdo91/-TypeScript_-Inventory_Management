import styled from "@emotion/styled";
import React, { useState } from "react";
import Searching from "./ItemInformationSearching";
import { Link } from "react-router-dom";
import Header from "../../Header/HeaderPage";
import { Container, Table, Pagination } from "react-bootstrap";
import BulletinBoardComponent from "../Bulletin BoardComponent/BulletinBoardComponent";
import { TableItemTY } from "../../../types/product";
import { useAtom } from "jotai";
import { loginStateAtom, loginModals } from "../../../globalStateManagement";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const data: TableItemTY[] = [
  {
    productCode: 1,
    productName: "Item 1",
    stock: 10,
    wholesalePrice: 5.99,
    retailPrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    stock: 5,
    wholesalePrice: 8.99,
    retailPrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    stock: 3,
    wholesalePrice: 12.99,
    retailPrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    stock: 10,
    wholesalePrice: 5.99,
    retailPrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    stock: 5,
    wholesalePrice: 8.99,
    retailPrice: 7.49,
  },
];

function ItemInformationPage() {
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <Header />
      </header>
      <ItemInformationPageBody>
        <HeaderSection>
          <Button>메일전송</Button>

          <Button
            onClick={() => {
              if (loginState) {
                navigate("/AddItemInformation"); // loginState가 true인 경우 /AddItemInformation로 라우팅
              } else {
                setLoginModal(true); // loginState가 false인 경우 setLoginModal(true) 실행
              }
            }}
          >
            신규 품목
          </Button>
        </HeaderSection>
        <Tittle>품목 정보</Tittle>
        <ItemSection>
          <BulletinBoardComponent
            data={data}
            rowKey={[
              "productCode",
              "productName",
              "quantity",
              "unitPrice",
              "purchasePrice",
            ]}
          />
        </ItemSection>
        <SearchingSection>
          <Searching />
        </SearchingSection>
      </ItemInformationPageBody>
    </div>
  );
}

export default ItemInformationPage;

const ItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Tittle = styled.h1``;
const ItemSection = styled.section``;
const SearchingSection = styled.section``;
