import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../comp/page/mainPage/mainPage";
import ItemInformationPage from "../../comp/page/itemInformationPage/itemInformationPage";
import AddItemInformationPage from "../../comp/page/itemInformationPage/addItemInformationPage/addItemInformationPage";
import VendorInformationPage from "../../comp/page/vendorInformationPage/vendorInformationPage";
import AddVendorInformationPage from "../../comp/page/vendorInformationPage/addVendorInformationPage/addVendorInformationPage";
import SignUpPage from "../../comp/page/signUpPage/signUpPage";
import SignUpSuccessPage from "../../comp/page/signUpPage/signUpSuccessPage";
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
    path: "/VendorInformation",
    element: <VendorInformationPage />,
  },
  {
    path: "/AddVendorInformation",
    element: <AddVendorInformationPage />,
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
