import React, { useState } from "react";
import {
  SearchValueTY,
  SearchBarPropsTY,
} from "../itemInformationPage/ItemInformationSearching";
import styled from "@emotion/styled";

function VendorInformationSearching() {
  const [currentSearchValue, setCurrentSearchValue] =
    useState<SearchValueTY>("");
  const [searchCondition, setSearchCondition] = useState<string>("Code");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchItem: SearchBarPropsTY = {
      searchCondition: searchCondition,
      currentValue: currentSearchValue,
    };
    setCurrentSearchValue("");
    console.log(searchItem);
  };
  return (
    <SearchingBody>
      <SearchBar onSubmit={handleSubmit}>
        <InputSelect
          as="select"
          value={searchCondition}
          onChange={(e) => {
            setSearchCondition(e.target.value);
          }}
        >
          <option value="Code">Code</option>
          <option value="Name">Name</option>
          <option value="transactionAmount">transactionAmount</option>
        </InputSelect>
        <Inputtext
          type="text"
          placeholder="검색할 품목이나 가격을 기입해주세요."
          value={currentSearchValue}
          onChange={(e) => {
            setCurrentSearchValue(e.target.value);
          }}
        ></Inputtext>
        <Button>검색</Button>
      </SearchBar>
    </SearchingBody>
  );
}

export default VendorInformationSearching;
const SearchingBody = styled.div``;
const SearchBar = styled.form``;
const InputSelect = styled.input``;
const Inputtext = styled.input``;
const Button = styled.button``;
