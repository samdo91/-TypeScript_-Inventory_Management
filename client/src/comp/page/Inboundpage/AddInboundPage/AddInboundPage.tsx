import React, { useState } from "react";
import styled from "@emotion/styled";
import { InboundTY } from "../../../../types/inbound";
import { Button, Form } from "react-bootstrap";
import Header from "../../../Header/HeaderPage";
import {
  loginStateAtom,
  loginModals,
  searchingModalAtom,
} from "../../../../globalStateManagement/index";
import { useAtom } from "jotai";
import InboundBoard from "../InboundBoard/InboundBoard";
import { productTY } from "../../../../types/product";
import SearchingModal from "../../../SearchingModal/SearchingModal";

function AddInboundpage() {
  const [selectedOption, setSelectedOption] = useState<string>(""); // 라디오
  const [currentCode, setCurrentCode] = useState<number>(0); // 제품번호
  const [currentName, setCurrentName] = useState<string>(""); // 제품 이름
  const [currentQuantity, setCurrentQuantity] = useState<number>(0); //제품 수량
  const [currentUnitPrice, setCurrentUnitPrice] = useState<number>(0); // 제품 입고가
  const [currentPurchasePrice, setCurrentPurchasePrice] = useState<number>(0); // 제품 출고가

  const [productData, setProductData] = useState<productTY[]>([]);
  const [loginModal, setLoginModal] = useAtom(loginModals); // 로그인 모달 불러오기
  const [loginState, setLoginState] = useAtom(loginStateAtom); //로그인 상태
  const [searchingModal, setSearchingModal] = useAtom(searchingModalAtom);

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
        <header>
          <Header />
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
              setSearchingModal(true);
            }}
          >
            찾기
          </Buttons>
          {searchingModal ? <SearchingModal /> : ""}
        </div>

        <InboundBoard />
      </ProcuctSection>

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
      <InputSection>
        <Buttons>입출고 삭제</Buttons>
        <Buttons onClick={addItem}>저장</Buttons>
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
const Input = styled.input``;
const ProcuctSection = styled.section``;
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
