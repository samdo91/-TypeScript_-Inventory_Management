import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { OutboundTY } from "../../../../types/outbound";
import Header from "../../../Header/HeaderPage";
import { Table } from "react-bootstrap";
import styled from "@emotion/styled";
import { formatTime } from "../../../../store/functionIndex";

function DetailOutboundPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [outboundData, setOutboundData] = useState<OutboundTY[]>([]);

  const { outbound_id } = useParams<{ outbound_id: string }>();

  const outboundDataSearch = useCallback(async () => {
    try {
      const response = await axios.get(`${PROXY}/OutboundSearching`, {
        params: {
          currentSearchValue: outbound_id,
          searchCondition: "_id",
        },
      });
      console.log("response", response);
      const outbound: OutboundTY[] = response.data;
      const updatedList = outbound.map((item: any) => {
        const { _id, ...rest } = item;
        return {
          outbound_id: _id,
          ...rest,
        };
      });
      console.log("updatedList", updatedList);
      setOutboundData(updatedList);
    } catch (error) {
      console.error("Failed to fetch inbound data:", error);
    }
  }, []);

  useEffect(() => {
    outboundDataSearch();
  }, [outboundDataSearch]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <PageTitle>출고 페이지</PageTitle>
      <TableContainer>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Outbound ID</th>
              <th>Date</th>
              <th>Product ID</th>
              <th>Business Partner ID</th>
              <th>Stock Outbound Quantity</th>
              <th>Total Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {outboundData.map((item, index) => (
              <tr key={item.outbound_id}>
                <td>{index + 1}</td>
                <td>{item.outbound_id}</td>
                <td>{formatTime(new Date(item.date))}</td>
                <td>{item.product_id}</td>
                <td>{item.BusinessPartner_id}</td>
                <td>{item.stockOutboundQuantity.toLocaleString()}</td>
                <td>{item.totalAmount.toLocaleString()}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default DetailOutboundPage;
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
  margin: 0 auto;
`;

const PageTitle = styled.div`
  font-size: 40px;
`;
