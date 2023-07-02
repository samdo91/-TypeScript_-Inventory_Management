import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Header from "../../Header/HeaderPage";
import BulletinBoardComponent from "../Bulletin BoardComponent/BulletinBoardComponent";
import SearchingBar from "../../SearchingBar/SearchingBar";
import { BusinessPartnerTY } from "../../../types/BusinessPartner";
import axios from "axios";
export type TableItemTY = {
  vendorCode: string;
  BusinessPartnerName: string;
  credit: number;
};

function BusinessPartnerPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [businessPartnerList, setBusinessPartnerList] = useState<
    BusinessPartnerTY[]
  >([]);

  const handleBusinessPartnerList = async () => {
    const response = await axios.get(`${PROXY}/businessPartnerList`);
    console.log(response.data);
    setBusinessPartnerList([...response.data]);
  };

  useEffect(() => {
    handleBusinessPartnerList();
  }, []);
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
            dataList={businessPartnerList}
            rowKey={["_id", "BusinessPartnerName", "credit"]}
          />
        </VendorSection>
        <SearchingSection>
          <SearchingBar
            setDataList={setBusinessPartnerList}
            keyList={["_id", "BusinessPartnerName", "credit"]}
            Theme="BusinessPartner"
          />
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
