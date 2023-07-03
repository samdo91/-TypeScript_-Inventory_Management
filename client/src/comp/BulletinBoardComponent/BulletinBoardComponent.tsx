import React, { useState } from "react";
import { Container, Table, Pagination, Row, Col } from "react-bootstrap";
import styled from "@emotion/styled";

function BulletinBoardComponent(props: any) {
  /*     title : 말 그대로 컴포넌트나 표의 이름
         rowKey: 표의 key를 말한다.
         dataList: 말그대로 데이터 리스트 이걸로 페이지네이션을 만든다.
         setDataList : 최종적으로 가져올 아이템을 넣을 곳
         selectMode : BulletinBoardComponent 컴포넌트를 셀렉트모드로 만든다. 
         selectItem,: 선택한 아이템 값이 들어있다. 없어도 된다. 
         setSelectItem : 선택된 아이템의 값을 변경
         */
  const { dataList, rowKey, title, selectItem, setSelectItem, selectMode } =
    props;

  const [currentPage, setCurrentPage] = useState<number>(1); //페이지네이션을 위한 유즈스테이트

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemClick = (item: any) => {
    console.log(item);
    setSelectItem(item);
  };

  return (
    <div>
      <Title>{title}</Title>
      <Container>
        {selectMode ? (
          <Table>
            <thead>
              <tr>
                {rowKey.map((item: string[]) => {
                  return <th>{item} </th>;
                })}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item: any, index: number) => (
                <tr key={index}>
                  {rowKey.map((value: string) => {
                    return (
                      <td key={value} onClick={() => handleItemClick(item)}>
                        {item[value]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Table>
            <thead>
              <tr>
                {rowKey.map((item: string[]) => {
                  return <th>{item} </th>;
                })}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item: any, index: number) => (
                <tr key={index}>
                  {rowKey.map((value: string) => {
                    return <td key={value}>{item[value]}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {dataList.length >= 10 && (
          <PaginationWrapper>
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />

              {currentPage > 3 && (
                <>
                  <Pagination.Item onClick={() => handlePageChange(1)}>
                    {1}
                  </Pagination.Item>
                  {currentPage > 4 && <Pagination.Ellipsis />}
                </>
              )}

              {currentPage > 2 && (
                <Pagination.Item
                  onClick={() => handlePageChange(currentPage - 2)}
                >
                  {currentPage - 2}
                </Pagination.Item>
              )}

              {currentPage > 1 && (
                <Pagination.Item
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  {currentPage - 1}
                </Pagination.Item>
              )}

              <Pagination.Item active>{currentPage}</Pagination.Item>

              {currentPage < totalPages && (
                <Pagination.Item
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  {currentPage + 1}
                </Pagination.Item>
              )}

              {currentPage < totalPages - 1 && (
                <Pagination.Item
                  onClick={() => handlePageChange(currentPage + 2)}
                >
                  {currentPage + 2}
                </Pagination.Item>
              )}

              {currentPage < totalPages - 3 && <Pagination.Ellipsis />}

              {currentPage < totalPages - 2 && (
                <Pagination.Item onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </Pagination.Item>
              )}

              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
          </PaginationWrapper>
        )}
        {selectMode ? (
          <SelectItemSection>
            <Row>
              <Col>
                <div>선택된 아이템</div>
                {selectItem && <div>{selectItem.productName}</div>}
              </Col>
            </Row>
          </SelectItemSection>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default BulletinBoardComponent;

const Title = styled.div`
  font-size: 30px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SelectItemSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
