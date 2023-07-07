import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button, Form, Table } from "react-bootstrap";
import Header from "../../../Header/HeaderPage";
import { userDataAtom } from "../../../../globalStateManagement/index";
import { useAtom } from "jotai";
import { productTY } from "../../../../types/product";
import SearchingModal from "../../../SearchingModal/SearchingModal";
import axios from "axios";
import { AddInboundTY } from "../../../../types/inbound";

function AddInboundpage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [currentNote, setCurrentNote] = useState<string>(""); // 비고
  const [currentQuantity, setCurrentQuantity] = useState<number>(0); // 입고수량

  const [productData, setProductData] = useState<productTY[]>([]);

  const [userData] = useAtom(userDataAtom);

  const [date, setDate] = useState<Date>(new Date()); //시간
  const [searchingProductModal, setSearchingProductModal] =
    useState<boolean>(false); // 프로덕트 서치 모달 켜고 끄끼
  const addInbound = async () => {
    try {
      if (currentNote === "") {
        throw new Error("Please enter a note.");
      }

      if (isNaN(currentQuantity) || currentQuantity <= 0) {
        throw new Error("Please enter a valid quantity.");
      }

      const NewInboundInformation: AddInboundTY = {
        addProductQuantity: currentQuantity, // 오더 품목 수
        date: date,
        product_id: productData[0].productCode,
        employee_id: userData._id, // 입고자
        note: currentNote,
      };

      const ReceivingEvent = {
        date: date, // 날짜
        product_id: productData[0].productCode,
        employee_id: userData._id, // 입고자
        addProductQuantity: currentQuantity, // 오더 품목 수
      };

      const response = await axios.post(
        `${PROXY}/addInbound`,
        NewInboundInformation
      );
      console.log(response.data);

      const ReceiviRsponse = await axios.post(
        `${PROXY}/addReceivingEvent`,
        ReceivingEvent
      );
      console.log(ReceiviRsponse.data);

      // Reset the input fields
      setCurrentNote("");
      setCurrentQuantity(0);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        alert(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        alert("Error: No response from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <AddItemInformationPageBody>
      <HeaderSection>
        <header>
          <Header setDate={setDate} />
        </header>
      </HeaderSection>

      <Title>입고</Title>

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
            <Table striped bordered hover>
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
              setDataList={setProductData}
              dataListSearchingKey="recentProducts"
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
      </ProcuctSection>

      <ItemSection>
        <InputFieldWrapper>
          <div>주문수량</div>
          <InputField
            type="text"
            placeholder="주문 수량"
            value={currentQuantity}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentQuantity(value === "" ? 0 : parseInt(value));
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>상품 비고</div>
          <InputField
            type="text"
            placeholder="상품 비고, 특이사항을 적어주세요"
            value={currentNote}
            onChange={(e) => {
              const value = e.target.value;
              setCurrentNote(value);
            }}
          />
        </InputFieldWrapper>
      </ItemSection>
      <InputSection>
        <Buttons>입고 삭제</Buttons>
        <Buttons onClick={addInbound}>입고</Buttons>
      </InputSection>
    </AddItemInformationPageBody>
  );
}

export default AddInboundpage;

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
