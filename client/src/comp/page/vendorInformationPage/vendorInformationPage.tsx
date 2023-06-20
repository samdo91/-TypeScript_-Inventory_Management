import styled from "@emotion/styled";
import React from "react";
import VendorInformationSearching from "./vendorInformationSearching";
import { Link } from "react-router-dom";

export type TableItemTY = {
  vendorCode: string;
  vendorName: string;
  transactionAmount: number;
};

const data: TableItemTY[] = [
  {
    vendorCode: "001",
    vendorName: "Item 1",
    transactionAmount: 2222,
  },
  {
    vendorCode: "002",
    vendorName: "Item 2",
    transactionAmount: 333,
  },
  {
    vendorCode: "003",
    vendorName: "Item 3",
    transactionAmount: 22222,
  },
];

function VendorInformationPage() {
  return (
    <VendorInformationPageBody>
      <HeaderSection>
        <Button>메일전송</Button>
        <Link to="/AddVendorInformation">
          <Button>신규업체 등록</Button>
        </Link>
      </HeaderSection>
      <Tittle>거래처 정보</Tittle>
      <VendorSection>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>transaction Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.vendorCode}>
                <td>{item.vendorCode}</td>
                <td>{item.vendorName}</td>
                <td>{item.transactionAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </VendorSection>
      <SearchingSection>
        <VendorInformationSearching />
      </SearchingSection>
    </VendorInformationPageBody>
  );
}

export default VendorInformationPage;

const VendorInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
const VendorSection = styled.div``;
const SearchingSection = styled.section``;
