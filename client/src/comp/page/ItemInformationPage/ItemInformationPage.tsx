import styled from "@emotion/styled";
import React from "react";
import Searching from "./ItemInformationSearching";
import { Link } from "react-router-dom";

export type TableItemTY = {
  productCode: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  purchasePrice: number;
};

const data: TableItemTY[] = [
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
];

function ItemInformationPage() {
  return (
    <ItemInformationPageBody>
      <HeaderSection>
        <Button>메일전송</Button>
        <Link to="/AddItemInformation">
          <Button>신규 품목</Button>
        </Link>
      </HeaderSection>
      <Tittle>품목 정보</Tittle>
      <ItemSection>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Purchase Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.productCode}>
                <td>{item.productCode}</td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.purchasePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ItemSection>
      <SearchingSection>
        <Searching></Searching>
      </SearchingSection>
    </ItemInformationPageBody>
  );
}
export default ItemInformationPage;

const ItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
const ItemSection = styled.section``;
const SearchingSection = styled.section``;
