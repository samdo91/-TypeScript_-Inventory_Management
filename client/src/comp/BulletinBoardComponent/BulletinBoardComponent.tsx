import React, { useState } from "react";
import { Container, Table, Pagination, Row, Col } from "react-bootstrap";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function BulletinBoardComponent(props: any) {
  const {
    dataList,
    rowKey,
    title,
    selectItem,
    setSelectItem,
    selectMode,
    itemField,
  } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);
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
                {rowKey.map((item: string) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item: any, index: number) => (
                <tr key={index}>
                  {rowKey.map((value: string) => (
                    <td key={value}>
                      <Link to={`/${itemField}/${item[itemField]}`}>
                        {item[value]}
                      </Link>
                    </td>
                  ))}
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
                {selectItem && <div>{selectItem[itemField]}</div>}
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
