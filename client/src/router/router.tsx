import { createBrowserRouter } from "react-router-dom";
import MainPage from "../comp/page/MainPage/MainPage";
import ItemInformationPage from "../comp/page/ItemInformationPage/ItemInformationPage";
import AddItemInformationPage from "../comp/page/ItemInformationPage/AddItemInformationPage/AddItemInformationPage";
import VendorInformationPage from "../comp/page/vendorInformationPage/VendorInformationPage";
import AddVendorInformationPage from "../comp/page/vendorInformationPage/AddVendorInformationPage/AddVendorInformationPage";
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
