export type OutboundsTY = {
  note: string;
  totalAmount: number;
  date: Date;
  product_id: string;
  BusinessPartner_id: string;
  stockOutboundQuantity: number;
};

export type OutboundTY = OutboundsTY & {
  outbound_id: string;
};
