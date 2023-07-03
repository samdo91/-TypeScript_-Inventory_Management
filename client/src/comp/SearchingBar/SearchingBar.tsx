import styled from "@emotion/styled";
import axios from "axios";
import React, { useState } from "react";

export type SearchValueTY = string | number;

export type SearchBarPropsTY = {
  searchCondition: string;
  currentValue: SearchValueTY;
};

function SearchingBar(props: any) {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  /* Theme: 찾으려는 상품이나 거래처 혹은 주제 
     keyList 찾으려는 key들의 리스트
     setDataList 찾은 item들을 다시 지정한다.  */
  const { Theme, keyList, setItemList } = props;
  const [currentSearchValue, setCurrentSearchValue] =
    useState<SearchValueTY>("");
  const [searchCondition, setSearchCondition] = useState<string>("Code");

  const handleSearching = async () => {
    const response = await axios.get(`${PROXY}/${Theme}Searching`, {
      params: {
        currentSearchValue: currentSearchValue,
        searchCondition: searchCondition,
      },
    });
    setItemList([...response.data]);
  };

  return (
    <SearchingBody>
      <SearchBar>
        <InputSelect
          as="select"
          value={searchCondition}
          onChange={(e) => {
            setSearchCondition(e.target.value);
          }}
        >
          {keyList.map((item: any) => {
            return <option value={item}>{item}</option>;
          })}
        </InputSelect>
        <Inputtext
          type="text"
          placeholder="검색할 값을 기입해주세요."
          value={currentSearchValue}
          onChange={(e) => {
            setCurrentSearchValue(e.target.value);
          }}
        ></Inputtext>
        <Button onClick={handleSearching}>검색</Button>
      </SearchBar>
    </SearchingBody>
  );
}

export default SearchingBar;

const SearchingBody = styled.div``;
const SearchBar = styled.div``;
const InputSelect = styled.input``;
const Inputtext = styled.input``;
const Button = styled.button``;
