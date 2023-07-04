import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productTY } from "../../../../types/product";

function DetailItemInformationPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  const [productData, setProductData] = useState<productTY[]>([]);

  const { productName } = useParams<{ productName: string }>();

  const productDataSearch = async () => {
    try {
      const response = await axios.post(`${PROXY}/productSearching`, {
        params: {
          currentSearchValue: "productName",
          searchCondition: productName,
        },
      });
      const product: productTY[] = response.data;
      setProductData(product);
    } catch (error) {
      console.error("Failed to fetch business partner data:", error);
    }
  };

  useEffect(() => {
    productDataSearch();
  }, []);
  return (
    <div>
      <h1>productName: {productName}</h1>
    </div>
  );
}

export default DetailItemInformationPage;
