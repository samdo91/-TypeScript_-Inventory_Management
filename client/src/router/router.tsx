import { createBrowserRouter } from "react-router-dom";
import MainPage from "../comp/page/MainPage/MainPage";
import ItemInformationPage from "../comp/page/ItemInformationPage/ItemInformationPage";
import AddItemInformationPage from "../comp/page/ItemInformationPage/AddItemInformationPage/AddItemInformationPage";
import BusinessPartnerPage from "../comp/page/vendorInformationPage/BusinessPartnerPage";
import AddBusinessPartnerPage from "../comp/page/vendorInformationPage/AddBusinessPartnerPage/AddBusinessPartnerPage";
import SignUpPage from "../comp/page/SignUpPage/SignUpPage";
import SignUpSuccessPage from "../comp/page/SignUpPage/SignUpSuccessPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/ItemInformation",
    element: <ItemInformationPage />,
  },
  {
    path: "/AddItemInformation",
    element: <AddItemInformationPage />,
  },
  {
    path: "/BusinessPartner",
    element: <BusinessPartnerPage />,
  },
  {
    path: "/AddBusinessPartner",
    element: <AddBusinessPartnerPage />,
  },
  {
    path: "/SignUp",
    element: <SignUpPage />,
  },
  {
    path: "/SignUpSuccess",
    element: <SignUpSuccessPage />,
  },
]);
