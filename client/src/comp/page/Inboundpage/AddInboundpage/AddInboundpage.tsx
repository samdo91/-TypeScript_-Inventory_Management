import React, { useState } from "react";
import styled from "@emotion/styled";
import { InboundTY } from "../../../../types/inbound";
import { Button } from "react-bootstrap";
function AddInboundpage() {
  const [selectedOption, setSelectedOption] = useState<string>(""); // 라디오
  const [currentCode, setCurrentCode] = useState<number>(0); // 제품번호
  const [currentName, setCurrentName] = useState<string>(""); // 제품 이름
  const [currentQuantity, setCurrentQuantity] = useState<number>(0); //제품 수량
  const [currentUnitPrice, setCurrentUnitPrice] = useState<number>(0); // 제품 입고가
  const [currentPurchasePrice, setCurrentPurchasePrice] = useState<number>(0); // 제품 출고가

  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(event.target.value);
  };

  const addItem = () => {
    const NewItemInformation = {
      //          :selectedOption,
      //   productCode: currentCode,
      //   productName: currentName,
      //   quantity: currentQuantity,
      //   unitPrice: currentUnitPrice,
      //   purchasePrice: currentPurchasePrice,
    };
    console.log(NewItemInformation);
  };
  return (
    <AddItemInformationPageBody>
      <HeaderSection>
        <Buttons>입출고 삭제</Buttons>
        <Buttons onClick={addItem}>저장</Buttons>
        <div>
          <label>
            <input
              type="radio"
              value="Inbound"
              checked={selectedOption === "Inbound"}
              onChange={handleOptionChange}
            />
            Option 1
          </label>

          <label>
            <input
              type="radio"
              value="Outbound"
              checked={selectedOption === "Outbound"}
              onChange={handleOptionChange}
            />
            Option 2
          </label>
        </div>
        <Tittle>입출고</Tittle>
      </HeaderSection>
      <ItemSection>
        <div>
          <div>code</div>
          <Input
            type="text"
            placeholder=" 제품 번호 입력"
            value={currentCode}
            onChange={(e) => {
              setCurrentCode(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <div>name</div>
          <Input
            type="text"
            placeholder=" 제품 이름 입력"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
        </div>
        <div>
          <div>quantity</div>
          <Input
            type="text"
            placeholder=" 재고 수량 입력"
            value={currentQuantity}
            onChange={(e) => {
              setCurrentQuantity(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <div>unitPrice</div>
          <Input
            type="text"
            placeholder="입고가 입력"
            value={currentUnitPrice}
            onChange={(e) => {
              setCurrentUnitPrice(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <div>purchasePrice</div>
          <Input
            type="text"
            placeholder="출고가 입력"
            value={currentPurchasePrice}
            onChange={(e) => {
              setCurrentPurchasePrice(parseInt(e.target.value));
            }}
          />
        </div>
      </ItemSection>
    </AddItemInformationPageBody>
  );
}

export default AddInboundpage;
const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Tittle = styled.title``;
const ItemSection = styled.section``;
const Input = styled.input``;
