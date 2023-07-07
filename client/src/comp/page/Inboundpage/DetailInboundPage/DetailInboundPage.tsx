import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { InboundTY } from "../../../../types/inbound";
import Header from "../../../Header/HeaderPage";
import { Table } from "react-bootstrap";
import styled from "@emotion/styled";
import { formatTime } from "../../../../store/functionIndex";

function DetailInboundPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  const [inboundData, setInboundData] = useState<InboundTY[]>([]);

  const { inbound_id } = useParams<{ inbound_id: string }>();

  const inboundDataSearch = useCallback(async () => {
    try {
      const response = await axios.get(`${PROXY}/inboundSearching`, {
        params: {
          currentSearchValue: inbound_id,
          searchCondition: "_id",
        },
      });
      console.log("response", response);
      const inbound: InboundTY[] = response.data;
      const updatedList = inbound.map((item: any) => {
        const { _id, ...rest } = item;
        return {
          inbound_id: _id,
          ...rest,
        };
      });

      setInboundData(updatedList);
      console.log(inboundData);
    } catch (error) {
      console.error("Failed to fetch inbound data:", error);
    }
  }, [inbound_id, setInboundData, PROXY, inboundData]);

  useEffect(() => {
    inboundDataSearch();
  }, [inboundDataSearch]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <div>
        <PageTitle>입고 페이지</PageTitle>
      </div>
      <TableContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Inbound ID</th>
              <th>Add Product Quantity</th>
              <th>Date</th>
              <th>Product ID</th>
              <th>Employee ID</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {inboundData.map((item, index) => (
              <tr key={item.inbound_id}>
                <td>{index + 1}</td>
                <td>{item.inbound_id}</td>
                <td>{item.addProductQuantity.toLocaleString()}</td>
                <td>{formatTime(new Date(item.date))}</td>
                <td>{item.product_id}</td>
                <td>{item.employee_id}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DetailInboundPage;

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
