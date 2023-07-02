import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Header from "../../Header/HeaderPage";
import BulletinBoardComponent from "../Bulletin BoardComponent/BulletinBoardComponent";
import SearchingBar from "../../SearchingBar/SearchingBar";

export type TableItemTY = {
  vendorCode: string;
  BusinessPartnerName: string;
  credit: number;
};

const data: TableItemTY[] = [
  {
    vendorCode: "001",
    BusinessPartnerName: "Item 1",
    credit: 2222,
  },
  {
    vendorCode: "002",
    BusinessPartnerName: "Item 2",
    credit: 333,
  },
  {
    vendorCode: "003",
    BusinessPartnerName: "Item 3",
    credit: 22222,
  },
];

function BusinessPartnerPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <VendorInformationPageBody>
        <HeaderSection>
          <Button>메일전송</Button>
          <Link to="/AddBusinessPartner">
            <Button>신규업체 등록</Button>
          </Link>
        </HeaderSection>
        <Tittle>거래처 정보</Tittle>
        <VendorSection>
          <BulletinBoardComponent
            dataList={}
            setDataList={}
            rowKey={["vendorCode", "BusinessPartnerName", "credit"]}
          />
        </VendorSection>
        <SearchingSection>
          <SearchingBar />
        </SearchingSection>
      </VendorInformationPageBody>
    </div>
  );
}

export default BusinessPartnerPage;

const VendorInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
const VendorSection = styled.div``;
const SearchingSection = styled.section``;
