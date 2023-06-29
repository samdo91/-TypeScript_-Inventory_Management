import styled from "@emotion/styled";
import React, { useState } from "react";
import Searching from "./ItemInformationSearching";
import { Link } from "react-router-dom";
import Header from "../../Header/HeaderPage";
import { Container, Table, Pagination } from "react-bootstrap";

export type TableItemTY = {
  productCode: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  purchasePrice: number;
};

const data: TableItemTY[] = [
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
  {
    productCode: 1,
    productName: "Item 1",
    quantity: 10,
    unitPrice: 5.99,
    purchasePrice: 4.99,
  },
  {
    productCode: 2,
    productName: "Item 2",
    quantity: 5,
    unitPrice: 8.99,
    purchasePrice: 7.49,
  },
  {
    productCode: 3,
    productName: "Item 3",
    quantity: 3,
    unitPrice: 12.99,
    purchasePrice: 11.99,
  },
];

function ItemInformationPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <header>
        <Header />
      </header>
      <ItemInformationPageBody>
        <HeaderSection>
          <Button>메일전송</Button>
          <Link to="/AddItemInformation">
            <Button>신규 품목</Button>
          </Link>
        </HeaderSection>
        <Tittle>품목 정보</Tittle>
        <ItemSection>
          <Container>
            <Table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Purchase Price</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.productCode}>
                    <td>{item.productCode}</td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice}</td>
                    <td>{item.purchasePrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
          </Container>
        </ItemSection>
        <SearchingSection>
          <Searching />
        </SearchingSection>
      </ItemInformationPageBody>
    </div>
  );
}

export default ItemInformationPage;

const ItemInformationPageBody = styled.div``;
const HeaderSection = styled.section``;
const Button = styled.button``;
const Tittle = styled.h1``;
const ItemSection = styled.section``;
const SearchingSection = styled.section``;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
