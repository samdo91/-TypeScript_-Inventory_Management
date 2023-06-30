import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Form } from "react-bootstrap";
import {
  AddProductTY,
  ReceivingEventTY,
  ShippingEventTY,
} from "../../../../types/product";
import Header from "../../../Header/HeaderPage";
import { useAtom } from "jotai";
import { userDataAtom } from "../../../../globalStateManagement";
function AddItemInformationPage() {
  const [userData] = useAtom(userDataAtom);

  const [currentProductName, setCurrentProductName] = useState<string>(""); //제품 이름
  const [currentWholesalePrice, setCurrentWholesalePrice] = useState<number>(0); // 제품 입고가
  const [currentRetailPrice, setCurrentRetailPrice] = useState<number>(0); // 제품 출고가
  const [currentFirstStock, setCurrentFirstStock] = useState<number>(0); // 첫 입고 수량
  const [currentDate, setCurrentDate] = useState<string>(""); // 첫입고 날짜

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

  // --------------------------------------------------------------------
  //여기부터는 직접 입력되는 값이 아닌 입력된 데이터를 조합해서 만듬

  const [date, setDate] = useState(new Date()); //시간
  const [currentWarehouseManager, setCurrentWarehouseManager] =
    useState<string>(""); // 입고자 id

  useEffect(() => {
    setCurrentWarehouseManager(userData.ID);
  }, []);

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
    <div>
      <header>
        <Header setDate={setDate} />
      </header>
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
                setCurrentWholesalePrice(parseInt(e.target.value));
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
                setCurrentRetailPrice(parseInt(e.target.value));
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
                setCurrentFirstStock(parseInt(e.target.value));
              }}
            />
          </InputFieldWrapper>
        </ItemSection>
        <button
          onClick={() => {
            const year = date.getFullYear().toString().padStart(4, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const hour = date.getHours().toString().padStart(2, "0");
            const minute = date.getMinutes().toString().padStart(2, "0");

            const formattedTime = `${year}/${month}/${day}/${hour}/${minute}`;
            console.log(formattedTime);
          }}
        />
      </AddItemInformationPageBody>
    </div>
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
