import styled from "@emotion/styled";
import React, { useState, useEffect, useCallback } from "react";
import SearchingBar from "../../SearchingBar/SearchingBar";

import Header from "../../Header/HeaderPage";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import { productTY } from "../../../types/product";
import { useAtom } from "jotai";
import { loginStateAtom, loginModals } from "../../../globalStateManagement";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

function ItemInformationPage() {
  const navigate = useNavigate();
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState] = useAtom(loginStateAtom); //로그인 상태
  const [productList, setProductList] = useState<productTY[]>([]);

  const handleProductDataList = useCallback(async () => {
    const response = await axios.get(`${PROXY}/productList`);
    console.log(response.data);
    setProductList([...response.data]);
  }, [setProductList]);

  useEffect(() => {
    handleProductDataList();
  }, [handleProductDataList]);

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
        </ItemSection>
        <SearchingSection>
          <SearchingBar
            setDataList={setProductList}
            keyList={[
              "_id",
              "productName",
              "stock",
              "wholesalePrice",
              "retailPrice",
            ]}
            Theme="product"
          />
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
