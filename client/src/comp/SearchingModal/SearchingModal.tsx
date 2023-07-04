import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { searchingModalAtom } from "../../globalStateManagement/index";
import { useAtom } from "jotai";
import BulletinBoardComponent from "../BulletinBoardComponent/BulletinBoardComponent";
import axios from "axios";
import SearchingBar from "../SearchingBar/SearchingBar";

function SearchingModal(props: any) {
  const PROXY =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:4000"
      : "/proxy";

  /*     title : 말 그대로 컴포넌트나 표의 이름
         rowKey: 표의 key를 말한다.
         dataListSearchingKey DB에서 가져올 엔드 포인트
         setDataList : 최종적으로 가져올 아이템을 넣을 곳
         Theme: 서치용 


        selectMode : BulletinBoardComponent 컴포넌트를 셀렉트모드로 만든다. 
        searchingModal= 모달 커고 끄기 
        setSearchingModal=모달 켜고 끄기
        itemfield: 선택된 아이템 보여줄 요소
         */
  const {
    title,
    rowKey,
    dataListSearchingKey,
    setDataList,
    searchingModal,
    setSearchingModal,
    Theme,
    itemField,
  } = props;

  const [itemList, setItemList] = useState<any>(""); // 초기에 useEffect로 가져오는 아이템리스트
  const [selectItem, setSelectItem] = useState<any>(null); //BulletinBoardComponent에서 selectMode로 선택한 아이템이 저장됨

  const handleDataList = async () => {
    const response = await axios(`${PROXY}/${dataListSearchingKey}`);
    console.log(response.data);

    setItemList([...response.data]);
  };

  useEffect(() => {
    handleDataList();
  }, []);

  const handleSave = () => {
    setDataList([{ productCode: selectItem._id, ...selectItem }]);
    setSearchingModal(false);
  };

  const handleModalClose = () => {
    setSearchingModal(false);
  };

  return (
    <>
      <Modal show={searchingModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {itemList ? (
            <BulletinBoardComponent
              selectMode={true}
              title={title}
              dataList={itemList}
              rowKey={rowKey}
              selectItem={selectItem}
              setSelectItem={setSelectItem}
              itemField={itemField}
            />
          ) : (
            ""
          )}

          <SearchingBar
            setDataList={setItemList}
            keyList={rowKey}
            Theme={Theme}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchingModal;
