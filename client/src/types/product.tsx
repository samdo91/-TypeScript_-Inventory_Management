export type TableItemTY = {
  productCode: number; // 품목 id
  productName: string; // 품목이름
  stock: number; // 재고
  wholesalePrice: number; //도매가격
  retailPrice: number; //소매가격
};
export type ReceivingEventTY = {
  date: string; // 날짜
  employee_id: string; // 입고자
  addProductQuantity: number; // 오더 품목 수
};
export type ShippingEventTY = {
  date: string; // 날짜
  businessPartner_id: string; // 주문 거래처
  employee_id: string; // 출고자
  orderedProductQuantity: Number; // 오더 품목 수
  totalAmount: number; // 총 비용
};

export type AddProductTY = {
  productName: string; // 프로덕트 네임
  wholesalePrice: number; //도매가격
  retailPrice: number; //소매가격
  firstStock: number; // 첫 입고
  date: string; // 날짜 기록 날짜 / 분까지만
  warehouseManager: string; // 입고자 - 유저 정보에서 가져와야함
  receivingEventList: ReceivingEventTY[]; //입고 이밴트
  shippingEventList: ShippingEventTY[]; //출고 이밴트;
  totalAmountReceived: number; // 총입고량
  totalAmountShipped: number; // 총출고량
  stock: number; // 재고 총입고량 - 총 출고량
};

export type productTY = AddProductTY & {
  productCode: number; // 품목 id
};
