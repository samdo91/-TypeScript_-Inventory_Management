import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productTY } from "../../../../types/product";
import Header from "../../../Header/HeaderPage";
import { Table } from "react-bootstrap";
import styled from "@emotion/styled";
import { formatTime } from "../../../../store/functionIndex";

function DetailItemInformationPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  const [productData, setProductData] = useState<productTY[]>([]);

  const { productName } = useParams<{ productName: string }>();

  const productDataSearch = useCallback(async () => {
    try {
      const response = await axios.get(`${PROXY}/productSearching`, {
        params: {
          currentSearchValue: productName,
          searchCondition: "productName",
        },
      });
      const updatedList = response.data.map((item: any) => {
        const { _id, ...rest } = item;
        return {
          productCode: _id,
          ...rest,
        };
      });
      setProductData(updatedList);
    } catch (error) {
      console.error("Failed to fetch business partner data:", error);
    }
  }, [productName, setProductData]);

  useEffect(() => {
    productDataSearch();
  }, [productDataSearch]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <PageTitle>품목 페이지</PageTitle>
      </div>
      <TableContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Code</th>
              <th>Wholesale Price</th>
              <th>Retail Price</th>
              <th>First Stock</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr key={product.productCode}>
                <td>{index + 1}</td>
                <td>{product.productName}</td>
                <td>{product.productCode}</td>
                <td>{product.wholesalePrice.toLocaleString()}</td>
                <td>{product.retailPrice.toLocaleString()}</td>
                <td>{product.firstStock.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th>Date</th>
              <th>Warehouse Manager</th>
              <th>Total Amount Received</th>
              <th>Total Amount Shipped</th>
              <th>Stock</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((product, index) => (
              <tr key={product.productCode}>
                <td>{formatTime(new Date(product.date))}</td>
                <td>{product.warehouseManager}</td>
                <td>{product.totalAmountReceived.toLocaleString()}</td>
                <td>{product.totalAmountShipped.toLocaleString()}</td>
                <td>{product.stock.toLocaleString()}</td>
                <td>{product.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DetailItemInformationPage;

const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  height: 200px;
  width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 0 auto; /* 가운데 정렬을 위한 추가 스타일 */
`;

const PageTitle = styled.div`
  font-size: 40px;
`;
