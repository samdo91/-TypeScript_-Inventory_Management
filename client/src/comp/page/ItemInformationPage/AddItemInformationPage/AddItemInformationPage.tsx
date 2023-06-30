import React, { useState } from "react";
import styled from "@emotion/styled";
import { Form } from "react-bootstrap";
import {
  AddProductTY,
  ReceivingEventTY,
  ShippingEventTY,
} from "../../../../types/product";

function AddItemInformationPage() {
  const [currentProductName, setCurrentProductName] = useState<string>(""); //제품 이름
  const [currentWholesalePrice, setCurrentWholesalePrice] = useState<number>(0); // 제품 입고가
  const [currentRetailPrice, setCurrentRetailPrice] = useState<number>(0); // 제품 출고가
  const [currentFirstStock, setCurrentFirstStock] = useState<number>(0); // 첫 입고 수량
  const [currentDate, setCurrentDate] = useState<string>(""); // 첫입고 날짜
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

  const addItem = () => {
    const NewItemInformation: AddProductTY = {
      productName: currentProductName,
      wholesalePrice: currentWholesalePrice,
      retailPrice: currentRetailPrice,
      firstStock: currentFirstStock,
      date: currentDate,
      warehouseManager: currentWarehouseManager,
      receivingEventList: currentReceivingEventList,
      shippingEventList: currentShippingEventList,
      totalAmountReceived: currentTotalAmountReceived,
      totalAmountShipped: currentTotalAmountShipped,
      stock: currentStock,
    };
    console.log(NewItemInformation);
  };
  return (
    <AddItemInformationPageBody>
      <HeaderSection>
        <Button>품목삭제</Button>
        <Button onClick={addItem}>품목추가</Button>
        <Tittle>신규 품목 정보</Tittle>
      </HeaderSection>
      <ItemSection>
        <InputFieldWrapper>
          <div>name</div>
          <InputField
            type="text"
            placeholder=" 제품 이름 입력"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>quantity</div>
          <InputField
            type="text"
            placeholder=" 재고 수량 입력"
            value={currentQuantity}
            onChange={(e) => {
              setCurrentQuantity(parseInt(e.target.value));
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>unitPrice</div>
          <InputField
            type="text"
            placeholder="입고가 입력"
            value={currentUnitPrice}
            onChange={(e) => {
              setCurrentUnitPrice(parseInt(e.target.value));
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>purchasePrice</div>
          <InputField
            type="text"
            placeholder="출고가 입력"
            value={currentPurchasePrice}
            onChange={(e) => {
              setCurrentPurchasePrice(parseInt(e.target.value));
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>code</div>
          <InputField
            type="text"
            placeholder=" 제품 번호 입력"
            value={currentCode}
            onChange={(e) => {
              setCurrentCode(parseInt(e.target.value));
            }}
          />
        </InputFieldWrapper>
      </ItemSection>
    </AddItemInformationPageBody>
  );
}

export default AddItemInformationPage;

const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
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
