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
  const { title, rowKey, dataListSearchingKey } = props;
  const [searchingModal, setSearchingModal] = useAtom(searchingModalAtom);
  const [dataList, setDataList] = useState<any>("");

  const handleDataList = async () => {
    const response = await axios(`${PROXY}/${dataListSearchingKey}`);

    setDataList([...response.data]);
  };

  useEffect(() => {
    handleDataList();
  }, []);

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
          {dataList ? (
            <BulletinBoardComponent
              title={title}
              dataList={dataList}
              rowKey={rowKey}
            />
          ) : (
            ""
          )}

          <SearchingBar
            setDataList={setDataList}
            keyList={[
              "_id",
              "productName",
              "stock",
              "wholesalePrice",
              "retailPrice",
            ]}
            Theme="product"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SearchingModal;
