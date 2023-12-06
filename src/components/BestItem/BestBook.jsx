import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BestBookItem from './BestBookItem';

const BestBook = () => {
  return (
    <SBestBookList>
      <SHeader>
        <div>
          <h2>
            <div>이번 달 도서 TOP 5</div>
          </h2>
        </div>
        <div>
          <SLink>
            <p>전체보기</p>
          </SLink>
        </div>
      </SHeader>
      <BestBookItem />
    </SBestBookList>
  );
};

export default BestBook;

const SBestBookList = styled.section`
  margin-top: 10px;
`;

const SHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0px 15px;
  margin-bottom: 15px;

  h2 {
    font-size: var(--font-sm-size);
    font-weight: 800;
    color: #2a2d31;
  }

  p {
    color: var(--gray-500);
    line-height: 1;
    font-size: var(--font-xxs-size);
  }
`;

const SLink = styled(Link)``;
