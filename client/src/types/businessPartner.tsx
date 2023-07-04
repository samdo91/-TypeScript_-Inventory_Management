export type AddBusinessPartnerTY = {
  BusinessPartnerName: String;
  owner: string;
  eMail: string;
  telephoneNumber: string;
  manager: string;
  credit: number;
  nete: string;
};

export type BusinessPartnerTY = AddBusinessPartnerTY & {
  _id: string; // 등록하며 만들어진 비지니스 파트너의 고유 idD
};
