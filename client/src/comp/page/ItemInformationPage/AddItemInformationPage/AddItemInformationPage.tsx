import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {
  AddProductTY,
  ReceivingEventTY,
  ShippingEventTY,
} from "../../../../types/product";
import Header from "../../../Header/HeaderPage";
import { useAtom } from "jotai";
import { userDataAtom } from "../../../../globalStateManagement";
import axios from "axios";
function AddItemInformationPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [userData] = useAtom(userDataAtom);

  const [currentProductName, setCurrentProductName] = useState<string>(""); //제품 이름
  const [currentWholesalePrice, setCurrentWholesalePrice] = useState<number>(0); // 제품 입고가
  const [currentRetailPrice, setCurrentRetailPrice] = useState<number>(0); // 제품 출고가
  const [currentFirstStock, setCurrentFirstStock] = useState<number>(0); // 첫 입고 수량
  const [currentNote, setCurrentNote] = useState<string>(""); // 제품 비고
  // --------------------------------------------------------------------
  //여기부터는 직접 입력되는 값이 아닌 입력된 데이터를 조합해서 만듬

  const [date, setDate] = useState<Date>(new Date()); //시간
  const [currentWarehouseManager, setCurrentWarehouseManager] =
    useState<string>(""); // 입고자 id

  const [currentReceivingEventList, setCurrentReceivingEventList] = useState<
    ReceivingEventTY[]
  >([]); // 입고 이밴트
  const [currentShippingEventList, setCurrentShippingEventList] = useState<
    ShippingEventTY[]
  >([]); // 출고 이밴트
  const [currentTotalAmountReceived, setCurrentTotalAmountReceived] =
    useState<number>(0); // 총입고량
  const [currentTotalAmountShipped, setCurrentTotalAmountShipped] =
    useState<number>(0); // 총출고량
  const [currentStock, setCurrentStock] = useState<number>(0); //제품 수량

  useEffect(() => {
    setCurrentWarehouseManager(userData._id);
  }, []);

  const handleException = (): void => {
    if (!currentProductName) {
      alert("Product가 비어있어요");
      throw new Error("Product가 비어있습니다.");
    }
    if (currentWholesalePrice === 0) {
      alert("입고가를 적어주세요.");
      throw new Error("입고가를 적어주세요.");
    }
    if (currentRetailPrice === 0) {
      alert("출고가를 적어주세요.");
      throw new Error("출고가를 적어주세요.");
    }
    if (currentFirstStock === 0) {
      alert("재고를 입력해주세요.");
      throw new Error("재고를 입력해주세요.");
    }
    if (!currentNote) {
      alert("비고를 입력해주세요.");
      throw new Error("비고를 입력해주세요.");
    }
  };

  const addItem = async (): Promise<void> => {
    try {
      handleException();

      const receivingEventList: ReceivingEventTY[] = [
        {
          date: date,
          employee_id: currentWarehouseManager,
          addProductQuantity: currentFirstStock,
        },
      ];

      const totalAmountReceived: number = currentFirstStock;
      const stock: number = totalAmountReceived - currentTotalAmountShipped;

      const newItemInformation: AddProductTY = {
        productName: currentProductName,
        wholesalePrice: currentWholesalePrice,
        retailPrice: currentRetailPrice,
        firstStock: currentFirstStock,
        date: date,
        warehouseManager: currentWarehouseManager,
        receivingEventList: receivingEventList,
        shippingEventList: currentShippingEventList,
        totalAmountReceived: totalAmountReceived,
        totalAmountShipped: currentTotalAmountShipped,
        stock: stock,
        note: currentNote,
      };

      const response = await axios.post(
        `${PROXY}/addProduct`,
        newItemInformation
      );

      setCurrentProductName("");
      setCurrentWholesalePrice(0);
      setCurrentRetailPrice(0);
      setCurrentFirstStock(0);
      setCurrentNote("");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <div>
      <header>
        <Header setDate={setDate} />
      </header>
      <AddItemInformationPageBody>
        <HeaderSection>
          <Buttons>품목삭제</Buttons>
          <Buttons onClick={addItem}>품목추가</Buttons>

          <Tittle>신규 품목 정보</Tittle>
        </HeaderSection>
        <ItemSection>
          <InputFieldWrapper>
            <div>name</div>
            <InputField
              type="text"
              placeholder=" 제품 이름 입력"
              value={currentProductName}
              onChange={(e) => {
                setCurrentProductName(e.target.value);
              }}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <div>unitPrice</div>
            <InputField
              type="text"
              placeholder="입고가 입력"
              value={currentWholesalePrice}
              onChange={(e) => {
                const value = e.target.value;
                setCurrentWholesalePrice(value === "" ? 0 : parseInt(value));
              }}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <div>purchasePrice</div>
            <InputField
              type="text"
              placeholder="출고가 입력"
              value={currentRetailPrice}
              onChange={(e) => {
                const value = e.target.value;
                setCurrentRetailPrice(value === "" ? 0 : parseInt(value));
              }}
            />
          </InputFieldWrapper>
          <InputFieldWrapper>
            <div>첫 입고 재고</div>
            <InputField
              type="text"
              placeholder="출고가 입력"
              value={currentFirstStock}
              onChange={(e) => {
                const value = e.target.value;
                setCurrentFirstStock(value === "" ? 0 : parseInt(value));
              }}
            />
          </InputFieldWrapper>

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
      </AddItemInformationPageBody>
    </div>
  );
}

export default AddItemInformationPage;

const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Tittle = styled.div``;
const ItemSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
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
