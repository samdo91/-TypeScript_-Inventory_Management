export type AddBusinessPartnerTY = {
  BusinessPartnerName: "string";
  owner: "string";
  email: "string";
  telephoneNumber: "string";
  manager: "string";
  credit: 0;
  nete: string;
};

export type BusinessPartnerTY = AddBusinessPartnerTY & {
  businessPartner_id: string; // 등록하며 만들어진 비지니스 파트너의 고유 idD
};
