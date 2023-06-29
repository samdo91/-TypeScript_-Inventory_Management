import React, { useState } from "react";
import { TableItemTY } from "../ItemInformationPage";
import styled from "@emotion/styled";
import { Form } from "react-bootstrap";

function AddItemInformationPage() {
  const [currentCode, setCurrentCode] = useState<number>(0); // 제품번호
  const [currentName, setCurrentName] = useState<string>(""); // 제품 이름
  const [currentQuantity, setCurrentQuantity] = useState<number>(0); //제품 수량
  const [currentUnitPrice, setCurrentUnitPrice] = useState<number>(0); // 제품 입고가
  const [currentPurchasePrice, setCurrentPurchasePrice] = useState<number>(0); // 제품 출고가

  const addItem = () => {
    const NewItemInformation: TableItemTY = {
      productCode: currentCode,
      productName: currentName,
      quantity: currentQuantity,
      unitPrice: currentUnitPrice,
      purchasePrice: currentPurchasePrice,
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
