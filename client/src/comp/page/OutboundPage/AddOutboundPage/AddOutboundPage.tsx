import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Button, Form, Table, Container, Row, Col } from "react-bootstrap";
import Header from "../../../Header/HeaderPage";
import { userDataAtom } from "../../../../globalStateManagement/index";
import { useAtom } from "jotai";
import SearchingModal from "../../../SearchingModal/SearchingModal";
import { productTY, ShippingEventTY } from "../../../../types/product";
import { BusinessPartnerTY } from "../../../../types/businessPartner";
import { OutboundsTY } from "../../../../types/outbound";

function AddOutboundPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [date, setDate] = useState<Date>(new Date()); //시간
  const [currentNote, setCurrentNote] = useState<string>(""); // 비고
  const [userData] = useAtom(userDataAtom); // 로그인 되어 있는 데이터
  const [currentStockOutboundQuantity, setCurrentStockOutboundQuantity] =
    useState<number>(0); // 출고 수량
  const [currentTotalAmount, setCurrentTotalAmount] = useState<number>(0); // 계산 되어 나온 총액

  const [searchingProductModal, setSearchingProductModal] =
    useState<boolean>(false); // 프로덕트 서치 모달 켜고 끄끼
  const [productData, setProductData] = useState<productTY[]>([]); // 모달로 찾아온 프로덕트를 저장

  const [searchingBusinessPartnerModal, setSearchingBusinessPartnerModal] =
    useState<boolean>(false); // 비지니스파트너 서치 모달 켜고 끄끼
  const [businessPartnerData, setBusinessPartnerData] = useState<
    BusinessPartnerTY[]
  >([]); // 모달로 찾아온 비지니스 파트너를 저장

  useEffect(() => {
    if (productData.length > 0) {
      setCurrentTotalAmount(
        productData[0].retailPrice * currentStockOutboundQuantity
      );
    }
  }, [currentStockOutboundQuantity, productData]);

  const addOutbound = async () => {
    try {
      if (!currentNote || currentNote === "") {
        throw new Error("note는 필수 입력 사항입니다.");
      }

      if (currentStockOutboundQuantity === 0) {
        throw new Error("stockOutboundQuantity는 필수 입력 사항입니다.");
      }

      const outboundItem: OutboundsTY = {
        note: currentNote,
        totalAmount: currentTotalAmount,
        date: date,
        product_id: productData[0].productCode,
        BusinessPartner_id: businessPartnerData[0]._id,
        stockOutboundQuantity: currentStockOutboundQuantity,
      };

      const shippingEvent: ShippingEventTY = {
        date: date,
        businessPartner_id: businessPartnerData[0]._id,
        product_id: productData[0].productCode,
        employee_id: userData._id,
        stockOutboundQuantity: currentStockOutboundQuantity,
        totalAmount: currentTotalAmount,
      };

      const response = await axios.post(`${PROXY}/addOutbound`, outboundItem);

      if (response.data) {
        const ShippingRsponse = await axios.post(
          `${PROXY}/addShippingEvent`,
          shippingEvent
        );
        console.log(ShippingRsponse);
      }

      // 처리된 후에 원하는 작업 수행
      console.log(response.data);

      // 초기화 수행
      setCurrentNote("");
      setCurrentStockOutboundQuantity(0);
      setBusinessPartnerData([]);
      setProductData([]);
      // 다른 필요한 초기화 작업 추가...
    } catch (error: any) {
      // 오류 발생 시 예외 처리
      console.error("오류 발생:", error);
      alert(error.message);
      return; // 함수 실행 중지
    }
  };

  return (
    <AddItemInformationPageBody>
      <HeaderSection>
        <header>
          <Header setDate={setDate} />
        </header>
      </HeaderSection>

      <Title>신규 출고</Title>

      <ProcuctSection>
        <div>
          <InputFieldWrapper>
            <div>product 찾기</div>
            <InputField
              type="text"
              placeholder="프로덕트 찾기 버튼을 눌러주세요."
              value={productData.length > 0 ? productData[0].productName : ""}
            />
          </InputFieldWrapper>
          <Buttons
            onClick={() => {
              setSearchingProductModal(true);
            }}
          >
            찾기
          </Buttons>

          {productData.length > 0 ? (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Wholesale Price</th>
                  <th>Retail Price</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{productData[0].productCode}</td>
                  <td>{productData[0].productName}</td>
                  <td>{productData[0].wholesalePrice}</td>
                  <td>{productData[0].retailPrice}</td>
                  <td>
                    {productData[0].date ? productData[0].date.toString() : ""}
                  </td>
                  <td>{productData[0].note}</td>
                  <td>{productData[0].stock}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            ""
          )}

          {searchingProductModal ? (
            <SearchingModal
              Theme="product"
              setDataList={setProductData}
              dataListSearchingKey="productList"
              title="product Searching"
              rowKey={[
                "_id",
                "productName",
                "stock",
                "wholesalePrice",
                "retailPrice",
              ]}
              searchingModal={searchingProductModal}
              setSearchingModal={setSearchingProductModal}
              itemField="productName"
            />
          ) : (
            ""
          )}
        </div>

        <div>
          <InputFieldWrapper>
            <div>Business Partner 찾기</div>
            <InputField
              type="text"
              placeholder="BusinessPartnerPage 찾기 버튼을 눌러주세요."
              value={
                businessPartnerData.length > 0
                  ? businessPartnerData[0].BusinessPartnerName.toString()
                  : ""
              }
            />
          </InputFieldWrapper>
          <Buttons
            onClick={() => {
              setSearchingBusinessPartnerModal(true);
            }}
          >
            찾기
          </Buttons>

          {businessPartnerData.length > 0 ? (
            <Table striped bordered hover className="table-sm">
              <thead>
                <tr>
                  <th>_id</th>
                  <th>Business Partner Name</th>
                  <th>Owner</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{businessPartnerData[0]._id}</td>
                  <td>{businessPartnerData[0].BusinessPartnerName}</td>
                  <td>{businessPartnerData[0].owner}</td>
                  <td>{businessPartnerData[0].credit}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            ""
          )}

          {searchingBusinessPartnerModal ? (
            <SearchingModal
              Theme="businessPartner"
              setDataList={setBusinessPartnerData}
              dataListSearchingKey="businessPartnerList"
              title="BusinessParter Searching"
              rowKey={["_id", "BusinessPartnerName", "owner", "credit"]}
              searchingModal={searchingBusinessPartnerModal}
              setSearchingModal={setSearchingBusinessPartnerModal}
              itemField="BusinessPartnerName"
            />
          ) : (
            ""
          )}
        </div>
      </ProcuctSection>

      <ItemSection>
        <InputFieldWrapper>
          <div>출하수량</div>
          <InputField
            type="text"
            placeholder="출하 수량"
            value={currentStockOutboundQuantity}
            onChange={(e) => {
              const value = e.target.value;
              const parsedValue = value === "" ? 0 : parseInt(value);

              if (parsedValue > productData[0].stock) {
                alert("재고보다 출고 수량이 많습니다.");
              } else {
                setCurrentStockOutboundQuantity(parsedValue);
                setCurrentTotalAmount(parsedValue);
              }
            }}
          />
        </InputFieldWrapper>
        <Container>
          <Row>
            <Col>
              <div>총액</div>
              <div>{currentTotalAmount.toLocaleString()}</div>
            </Col>
          </Row>
        </Container>

        <InputFieldWrapper>
          <div>상품 비고</div>
          <InputField
            type="text"
            placeholder="상품 비고"
            value={currentNote}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentNote(value);
            }}
          />
        </InputFieldWrapper>
      </ItemSection>
      <InputSection>
        <Buttons>출고 삭제</Buttons>
        <Buttons onClick={addOutbound}>출고</Buttons>
      </InputSection>
    </AddItemInformationPageBody>
  );
}

export default AddOutboundPage;

const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const InputSection = styled.section`
  margin: 10px;
`;
const Buttons = styled(Button)``;
const Title = styled.div`
  font-size: 30px;
`;
const ItemSection = styled.section``;
const InputField = styled(Form.Control)`
  width: 300px;
  margin: 0 auto;
`;
const InputFieldWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px;
`;
const ProcuctSection = styled.section``;
