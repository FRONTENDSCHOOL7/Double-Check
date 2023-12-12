import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from 'components/Book/BookList';
import Topbar from 'components/Common/Topbar/Topbar';
import styled from 'styled-components';
import BookListSkeleton from 'assets/Skeleton/BookListSkeleton';

const BookListPage = ({ listType, title }) => {
  console.log(listType);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (listType) {
      axios
        .get(`https://double-check.onrender.com/${listType}`)
        .then((response) => {
          const item = response.data.item;
          setProductList(item);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [listType]);

  return (
    <>
      <Topbar title={title} longtitle />
      <SSection>
        <h1>{title}</h1>
        {loading ? (
          <BookListSkeleton />
        ) : (
          <SBookList>
            {productList.map((product, index) => (
              <BookList key={index} product={product} />
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
