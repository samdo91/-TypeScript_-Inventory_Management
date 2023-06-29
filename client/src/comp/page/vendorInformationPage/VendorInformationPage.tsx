import styled from "@emotion/styled";
import React from "react";
import VendorInformationSearching from "./VendorInformationSearching";
import { Link } from "react-router-dom";
import Header from "../../Header/HeaderPage";
import BulletinBoardComponent from "../Bulletin BoardComponent/BulletinBoardComponent";

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

function VendorInformationPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <VendorInformationPageBody>
        <HeaderSection>
          <Button>메일전송</Button>
          <Link to="/AddVendorInformation">
            <Button>신규업체 등록</Button>
          </Link>
        </HeaderSection>
        <Tittle>거래처 정보</Tittle>
        <VendorSection>
          <BulletinBoardComponent
            data={data}
            rowKey={["vendorCode", "BusinessPartnerName", "credit"]}
          />
        </VendorSection>
        <SearchingSection>
          <VendorInformationSearching />
        </SearchingSection>
      </VendorInformationPageBody>
    </div>
  );
}

export default VendorInformationPage;

const VendorInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
const VendorSection = styled.div``;
const SearchingSection = styled.section``;
