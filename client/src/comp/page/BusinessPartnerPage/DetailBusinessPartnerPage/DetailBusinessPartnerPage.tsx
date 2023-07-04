import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BusinessPartnerTY } from "../../../../types/businessPartner";

function DetailBusinessPartnerPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  const [businessPartnerData, setBusinessPartnerData] = useState<
    BusinessPartnerTY[]
  >([]);

  const { BusinessPartnerName } = useParams<{ BusinessPartnerName: string }>();

  const businessPartnerDataSearch = async () => {
    try {
      const response = await axios.post(`${PROXY}/businessPartnerSearching`, {
        params: {
          currentSearchValue: "BusinessPartnerName",
          searchCondition: BusinessPartnerName,
        },
      });
      const businessPartners: BusinessPartnerTY[] = response.data;
      setBusinessPartnerData(businessPartners);
    } catch (error) {
      console.error("Failed to fetch business partner data:", error);
    }
  };

  useEffect(() => {
    businessPartnerDataSearch();
  }, []);

  return (
    <div>
      <h1>Business Partner: {BusinessPartnerName}</h1>

      {businessPartnerData.map((partner) => (
        <div key={partner._id}>
          <h3>{partner.BusinessPartnerName}</h3>
          <p>Credit: {partner.credit}</p>
        </div>
      ))}
    </div>
  );
}

export default DetailBusinessPartnerPage;
