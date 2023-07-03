export type InboundTY = {
  productCode: number;
  productName: string;
  vendorCode: string;
  vendorName: string;
  quantity: number;
  purchasePrice: number;
  totalAmount: number;
};
export type InboundsTY = {
  addProductQuantity: number; // 오더 품목 수
  date: Date;
  product_id: string;
  employee_id: string; // 입고자
  note: string;
};

// export type InboundsTY = {
//   quantity: number;
//   note: string;
//   totalAmount: number;
//   date: Date;
//   product_id: string;
//   BusinessPartner_id: string;
//   retailPrice: number;
// };
