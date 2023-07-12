import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BusinessPartnerTY } from "../../../../types/businessPartner";
import Header from "../../../Header/HeaderPage";
import { Table } from "react-bootstrap";
import styled from "@emotion/styled";

function DetailBusinessPartnerPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  const [businessPartnerData, setBusinessPartnerData] = useState<
    BusinessPartnerTY[]
  >([]);

  const { BusinessPartnerName } = useParams<{ BusinessPartnerName: string }>();

  useEffect(() => {
    const businessPartnerDataSearch = async () => {
      try {
        const response = await axios.get(`${PROXY}/businessPartnerSearching`, {
          params: {
            currentSearchValue: BusinessPartnerName,
            searchCondition: "BusinessPartnerName",
          },
        });

        const updatedList = response.data.map((item: any) => {
          const { _id, ...rest } = item;
          return {
            _id: _id,
            ...rest,
          };
        });
        console.log(updatedList);
        setBusinessPartnerData(updatedList);
      } catch (error) {
        console.error("Failed to fetch business partner data:", error);
      }
    };

    businessPartnerDataSearch();
  }, [BusinessPartnerName, PROXY]);

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
              <th>BusinessPartner id</th>
              <th>BusinessPartner Name</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Telephone Number</th>
              <th>Manager</th>
              <th>Credit</th>
              <th>Nete</th>
            </tr>
          </thead>
          <tbody>
            {businessPartnerData.map((partner, index) => (
              <tr key={partner._id}>
                <td>{index + 1}</td>
                <td>{partner._id}</td>
                <td>{partner.BusinessPartnerName}</td>
                <td>{partner.owner}</td>
                <td>{partner.eMail}</td>
                <td>{partner.telephoneNumber}</td>
                <td>{partner.manager}</td>
                <td>{partner.credit}</td>
                <td>{partner.nete}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DetailBusinessPartnerPage;

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
