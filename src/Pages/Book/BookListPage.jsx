import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from 'components/Book/BookList';
import Topbar from 'components/Common/Topbar/Topbar';
import styled from 'styled-components';
import BookListSkeleton from 'assets/Skeleton/BookListSkeleton';
const LIST_INFO_MAP = {
  bestseller: { endpoint: 'bestseller', title: '베스트 셀러' },
  newBooks: { endpoint: 'newBooks', title: '신작 전체 리스트' },
  NewBookSpecial: {
    endpoint: 'NewBookSpecial',
    title: '주목할 만한 신간 리스트',
  },
};
const getListInfo = (listType) => {
  return LIST_INFO_MAP[listType] || { title: '', endpoint: '' };
};

// eslint-disable-next-line react/prop-types
const BookListPage = ({ listType }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const { title, endpoint } = getListInfo(listType);

  useEffect(() => {
    if (endpoint) {
      axios
        .get(`https://port-0-node-express-1igmo82clonz4u17.sel5.cloudtype.app/${endpoint}`)
        .then((response) => {
          const item = response.data.item;
          setProductList(item);
          setLoading(false); // 데이터 로딩 완료 시 로딩 상태 변경
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [listType, endpoint]);

  return (
    <>
      <Topbar title={title} />
      <SSection>
        <h1>{title}</h1>
        {loading ? ( // 로딩 중일 때 Loading 컴포넌트 표시
          <BookListSkeleton />
        ) : (
          <SBookList>
            {productList.map((product) => (
              <BookList key={product.isbn13} product={product} />
            ))}
          </SBookList>
        )}
      </SSection>
    </>
  );
};

const SSection = styled.section`
  h1 {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;
const SBookList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 12px 18px;
`;
export default BookListPage;
