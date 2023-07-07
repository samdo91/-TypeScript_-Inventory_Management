import React, { useState } from "react";
import styled from "@emotion/styled";
import { useAtom } from "jotai";
import { userDataAtom } from "../../../../globalStateManagement";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../../Header/HeaderPage";

function AddBusinessPartnerPage() {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";
  const [userData] = useAtom(userDataAtom);

  const [currentTelephoneNumber, setCurrentTelephoneNumber] =
    useState<string>(""); // 거래처번호
  const [currentBusinessPartnerName, setCurrentBusinessPartnerName] =
    useState<string>(""); // 거래처 이름
  const [currentOwner, setCurrentOwner] = useState<string>(""); // 사업주
  const [currentNote, setCurrentNote] = useState<string>(""); //비고
  const [currentEMail, setCurrentEMail] = useState<string>(""); //이메일

  const sendFieldWarnings = () => {
    if (!currentBusinessPartnerName) {
      window.alert("거래처 이름이 비어 있습니다.");
      throw new Error("FieldValidationError");
    }
    if (!currentEMail) {
      window.alert("이메일이 비어 있습니다.");
      throw new Error("FieldValidationError");
    }
    if (!currentNote) {
      window.alert("비고가 비어 있습니다.");
      throw new Error("FieldValidationError");
    }
    if (!currentOwner) {
      window.alert("소유자가 비어 있습니다.");
      throw new Error("FieldValidationError");
    }
    if (!currentTelephoneNumber) {
      window.alert("거래처 번호가 비어 있습니다.");
      throw new Error("FieldValidationError");
    }
  };

  const addBusinessPartner = async () => {
    try {
      sendFieldWarnings();
    } catch (error: any) {
      if (error.message === "FieldValidationError") {
        return; // 필드 경고가 발생한 경우 함수 종료
      } else {
        throw error; // 다른 예외가 발생한 경우 에러 전파
      }
    }

    const NewItemInformation = {
      BusinessPartnerName: currentBusinessPartnerName,
      credit: 0,
      eMail: currentEMail,
      nete: currentNote,
      owner: currentOwner,
      telephoneNumber: currentTelephoneNumber,
      manager: userData._id,
    };

    try {
      const response = await axios.post(
        `${PROXY}/addbusinessPartner`,
        NewItemInformation
      );

      console.log(response.data); // 서버 응답 데이터 출력

      setCurrentBusinessPartnerName("");
      setCurrentEMail("");
      setCurrentNote("");
      setCurrentOwner("");
      setCurrentTelephoneNumber("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AddItemInformationPageBody>
      <div>
        <Header />
      </div>
      <HeaderSection>
        <Buttons>품목삭제</Buttons>
        <Buttons onClick={addBusinessPartner}>거래처추가</Buttons>
        <Tittle>신규 품목 정보</Tittle>
      </HeaderSection>
      <ItemSection>
        <InputFieldWrapper>
          <div>거래처 이름</div>
          <InputField
            type="text"
            placeholder="거래처 이름 입력"
            value={currentBusinessPartnerName}
            onChange={(e) => {
              setCurrentBusinessPartnerName(e.target.value);
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>Owner</div>
          <InputField
            type="text"
            placeholder="사업주"
            value={currentOwner}
            onChange={(e) => {
              setCurrentOwner(e.target.value);
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>이메일</div>
          <InputField
            type="text"
            placeholder="이메일"
            value={currentEMail}
            onChange={(e) => {
              setCurrentEMail(e.target.value);
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>거래처 번호</div>
          <InputField
            type="text"
            placeholder="거래처 번호 입력"
            value={currentTelephoneNumber}
            onChange={(e) => {
              setCurrentTelephoneNumber(e.target.value);
            }}
          />
        </InputFieldWrapper>
        <InputFieldWrapper>
          <div>note</div>
          <InputField
            type="text"
            placeholder="기타/비고"
            value={currentNote}
            onChange={(e) => {
              setCurrentNote(e.target.value);
            }}
          />
        </InputFieldWrapper>
      </ItemSection>
    </AddItemInformationPageBody>
  );
}

export default AddBusinessPartnerPage;
const AddItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Buttons = styled(Button)``;
const Tittle = styled.title``;
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
