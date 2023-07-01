export type UserSignUPDataTY = {
  ID: string;
  name: String;
  eMail: String;
  password: String;
  phoneNumber: string;
  companyDepartment: String;
  position: String;
  companyName: String;
  note: string;
};
export type UserDataTY = UserSignUPDataTY & {
  // 유저 데이터 타입 정의
  loginState: boolean;
  token: boolean;
  _id: string;
};
