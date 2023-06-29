import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export type InboundOutboundTY = {
  productCode: number;
  productName: string;
  vendorCode: string;
  vendorName: string;
  quantity: number;
  purchasePrice: number;
  totalAmount: number;
};

const data: InboundOutboundTY[] = [
  {
    productCode: 44332,
    productName: "아무",
    vendorCode: "거나",
    vendorName: "먹어",
    quantity: 232,
    purchasePrice: 44444,
    totalAmount: 44444,
  },
];

function InboundOutboundpage() {
  return (
    <InboundOutboundPageBody>
      <HeaderSection>
        <Button>달력</Button>
        <Link to="/AddVendorInformation">
          <Button>신규입출고</Button>
        </Link>
      </HeaderSection>
      <Tittle>거래처 정보</Tittle>
      <VendorSection>
        <table>
          <thead>
            <tr>
              <th>ProductCode</th>
              <th>ProductName</th>
              <th>vendorCode</th>
              <th>vendorName</th>
              <th>quantity</th>
              <th>purchasePrice</th>
              <th>totalAmount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.productCode}>
                <td>{item.productName}</td>
                <td>{item.vendorCode}</td>
                <td>{item.vendorName}</td>
                <td>{item.quantity}</td>
                <td>{item.purchasePrice}</td>
                <td>{item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </VendorSection>
      <SearchingSection></SearchingSection>
    </InboundOutboundPageBody>
  );
}

export default InboundOutboundpage;
const InboundOutboundPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
const VendorSection = styled.div``;
const SearchingSection = styled.section``;
