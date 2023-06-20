import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import MainPage from "./comp/page/mainPage/mainPage";
import { RouterProvider } from "react-router-dom";
import { router } from "./store/router/router";
import "./App.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
