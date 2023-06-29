import React from "react";
import Header from "../../Header/HeaderPage";
import styled from "@emotion/styled";
import MainPageBoard from "./MainPageLInkButton/MainPageLInkButton";
function MainPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <MainPageBody>
        <MainPageBoard />
      </MainPageBody>
      MainPage
    </div>
  );
}

export default MainPage;

const MainPageBody = styled.body``;
