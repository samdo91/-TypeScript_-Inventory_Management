import React, { useState } from "react";
import styled from "@emotion/styled";

import { TableItemTY } from "../vendorInformationPage";

interface VendorTableTY extends TableItemTY {
  eMail: string;
  businessName: string;
  remarks: string;
}

function AddVendorInformationPage() {
  const [currentCode, setCurrentCode] = useState<string>(""); // 제품번호
  const [currentName, setCurrentName] = useState<string>(""); // 제품 이름
  const [currentTransactionAmount, setCurrentTransactionAmount] =
    useState<number>(0); //줄 돈
  const [currentBusinessName, setCurrentBusinessName] = useState<string>(""); // 사업주
  const [currentRemarks, setCurrentRemarks] = useState<string>(""); //비고
  const [currentEMail, setCurrentEMail] = useState<string>(""); //이메일
  const addVendor = () => {
    const NewItemInformation: VendorTableTY = {
      vendorCode: currentCode,
      vendorName: currentName,
      transactionAmount: currentTransactionAmount,
      eMail: currentEMail,
      remarks: currentRemarks,
      businessName: currentBusinessName,
    };

    console.log(NewItemInformation);
  };
  return (
    <AddItemInformationPageBody>
      <HeaderSection>
        <Button>품목삭제</Button>
        <Button onClick={addVendor}>거래처추가</Button>
        <Tittle>신규 품목 정보</Tittle>
      </HeaderSection>
      <ItemSection>
        <div>
          <div>code</div>
          <Input
            type="text"
            placeholder=" 거래처 id 입력"
            value={currentCode}
            onChange={(e) => {
              setCurrentCode(e.target.value);
            }}
          />
        </div>
        <div>
          <div>name</div>
          <Input
            type="text"
            placeholder=" 거래처 이름 입력"
            value={currentName}
            onChange={(e) => {
              setCurrentName(e.target.value);
            }}
          />
        </div>
        <div>
          <div>businessName</div>
          <Input
            type="text"
            placeholder=" 사업주"
            value={currentBusinessName}
            onChange={(e) => {
              setCurrentBusinessName(e.target.value);
            }}
          />
        </div>
        <div>
          <div>이메일</div>
          <Input
            type="text"
            placeholder="이메일"
            value={currentEMail}
            onChange={(e) => {
              setCurrentEMail(e.target.value);
            }}
          />
        </div>
        <div>
          <div>remarks</div>
          <Input
            type="text"
            placeholder=" 기타/비고"
            value={currentRemarks}
            onChange={(e) => {
              setCurrentRemarks(e.target.value);
            }}
          />
        </div>
        <div>
          <div>transaction Amount</div>
          <Input
            type="text"
            placeholder="transaction Amount"
            value={currentTransactionAmount}
            onChange={(e) => {
              setCurrentTransactionAmount(parseInt(e.target.value));
            }}
          />
        </div>
      </ItemSection>
    </AddItemInformationPageBody>
  );
}

export default AddVendorInformationPage;
const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.title``;
const ItemSection = styled.section``;
const Input = styled.input``;
