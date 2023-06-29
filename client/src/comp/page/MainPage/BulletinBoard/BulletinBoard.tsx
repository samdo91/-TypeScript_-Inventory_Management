import styled from "@emotion/styled";
import React from "react";
import { Container, Table } from "react-bootstrap";

type BulletinBoardPropsTY = {
  tittle: string;
  rowKey: string[];
};

function BulletinBoard(props: BulletinBoardPropsTY) {
  const { tittle, rowKey } = props;

  return (
    <div>
      <Tittle>{tittle}</Tittle>
      <Container>
        <Table striped bordered>
          <thead>
            <tr>
              {rowKey.map((item) => {
                return <th>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>First Post</td>
              <td>John Doe</td>
              <td>2023-06-29</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Second Post</td>
              <td>Jane Smith</td>
              <td>2023-06-30</td>
            </tr>
            {/* 추가적인 게시물들을 위해 여러 개의 <tr> 요소를 작성할 수 있습니다 */}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default BulletinBoard;

const Tittle = styled.div`
  font-size: 30px;
`;
