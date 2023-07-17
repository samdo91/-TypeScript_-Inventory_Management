import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Header from "../../Header/HeaderPage";
import MainPageLinkButton from "./MainPageLinkButton/MainPageLinkButton";
import BulletinBoardComponent from "../../BulletinBoardComponent/BulletinBoardComponent";
import { productTY } from "../../../types/product";
import { BusinessPartnerTY } from "../../../types/businessPartner";
import axios from "axios";
import { AddInboundTY } from "../../../types/inbound";

const MainPage = () => {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [productList, setProductList] = useState<productTY[]>([]);
  const [businessPartnerList, setBusinessPartnerList] = useState<
    BusinessPartnerTY[]
  >([]);
  const [inboundList, setInboundList] = useState<AddInboundTY[]>([]);

  const recentProducts = useCallback(async () => {
    const response = await axios(`${PROXY}/recentProducts`);
    setProductList([...response.data]);
  }, [PROXY, setProductList]);

  const recentBusinessPartner = useCallback(async () => {
    const response = await axios(`${PROXY}/recentBusinessPartner`);
    setBusinessPartnerList([...response.data]);
  }, [PROXY, setBusinessPartnerList]);

  const recentInbound = useCallback(async () => {
    const response = await axios(`${PROXY}/recentInbound`);
    const updatedList = response.data.map((item: any) => {
      const { _id, ...rest } = item;
      return {
        inbound_id: _id,
        ...rest,
      };
    });
    setInboundList(updatedList);
  }, [PROXY, setInboundList]);

  useEffect(() => {
    recentProducts();
    recentBusinessPartner();
    recentInbound();
  }, [recentProducts, recentBusinessPartner, recentInbound]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          <ScrollView>
            {/* 좌측 영역 */}
            <MainPageLinkButton />
          </ScrollView>
        </View>
        <View style={styles.rightContainer}>
          <ScrollView>
            {/* 우측 영역 */}
            <BulletinBoardComponent
              title="최근 등록 품목"
              dataList={productList}
              rowKey={[
                "_id",
                "productName",
                "stock",
                "wholesalePrice",
                "retailPrice",
              ]}
              itemField="productName"
            />
            <BulletinBoardComponent
              title="최근 등록 회사"
              dataList={businessPartnerList}
              rowKey={["_id", "BusinessPartnerName", "credit"]}
              itemField={"BusinessPartnerName"}
            />
            <BulletinBoardComponent
              title="최근 입고"
              dataList={inboundList}
              rowKey={[
                "inbound_id",
                "date",
                "product_id",
                "employee_id",
                "addProductQuantity",
              ]}
              itemField="inbound_id"
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainContainer: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    height: "100%",
    padding: 10,
  },
  rightContainer: {
    flex: 2,
    height: "100%",
    padding: 10,
  },
});

export default MainPage;
