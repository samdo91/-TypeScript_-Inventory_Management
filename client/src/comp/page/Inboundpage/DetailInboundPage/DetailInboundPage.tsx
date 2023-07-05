import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { InboundTY } from "../../../../types/inbound";

function DetailInboundPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  const [inboundData, setInboundData] = useState<InboundTY[]>([]);

  const { inbound_id } = useParams<{ inbound_id: string }>();

  const inboundDataSearch = async () => {
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
  };

  useEffect(() => {
    inboundDataSearch();
  }, []);

  return (
    <div>
      <h1>_id: {inboundData[0]?.inbound_id}</h1>
    </div>
  );
}

export default DetailInboundPage;
