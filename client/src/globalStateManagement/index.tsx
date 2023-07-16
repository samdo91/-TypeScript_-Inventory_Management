import { atom } from "jotai";
import { UserDataTY } from "../types/userData";

// 로그인창을 모달로 띄우기로 되어있다. 트루가 되면 모달이 뜬다.
export const loginModals = atom<boolean>(false);

// 로그인이 되어 있는 지 안되고 있는지
export const loginStateAtom = atom<boolean>(false);

//서치용 모달이 켜지나 안켜지나
export const searchingModalAtom = atom<boolean>(false);

// 유저데이터가 저장된다.
export const userDataAtom = atom<UserDataTY>({
  loginState: false,
  token: false,
  companyName: "",
  ID: "",
  password: "",
  name: "",
  eMail: "",
  phoneNumber: "",
  companyDepartment: "",
  position: "",
  note: "",
  _id: "",
});
