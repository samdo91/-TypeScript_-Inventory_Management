import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { OutboundTY } from "../../../../types/outbound";
function DetailOutboundPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [outboundData, setOutboundData] = useState<OutboundTY[]>([]);

  const { outbound_id } = useParams<{ outbound_id: string }>();

  const outboundDataSearch = async () => {
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
  };

  useEffect(() => {
    outboundDataSearch();
  }, []);

  return (
    <div>
      <h1>_id: {outboundData[0]?.outbound_id}</h1>
    </div>
  );
}
export default DetailOutboundPage;
