import { createBrowserRouter } from "react-router-dom";
import MainPage from "../comp/page/MainPage/MainPage";
import ItemInformationPage from "../comp/page/ItemInformationPage/ItemInformationPage";
import AddItemInformationPage from "../comp/page/ItemInformationPage/AddItemInformationPage/AddItemInformationPage";
import BusinessPartnerPage from "../comp/page/BusinessPartnerPage/BusinessPartnerPage";
import AddBusinessPartnerPage from "../comp/page/BusinessPartnerPage/AddBusinessPartnerPage/AddBusinessPartnerPage";
import SignUpPage from "../comp/page/SignUpPage/SignUpPage";
import SignUpSuccessPage from "../comp/page/SignUpPage/SignUpSuccessPage";
import Inboundpage from "../comp/page/Inboundpage/Inboundage";
import AddInboundpage from "../comp/page/Inboundpage/AddInboundpage/AddInboundpage";

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
  {
    path: "/Inboundpage",
    element: <Inboundpage />,
  },
  {
    path: "/AddInboundpage",
    element: <AddInboundpage />,
  },
]);
