import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "Components/Book/BookList";
import Loading from "Components/Common/Loading";

const LIST_INFO_MAP = {
  bestseller: { endpoint: "bestseller", title: "베스트 셀러" },
  newBooks: { endpoint: "newBooks", title: "신작 전체 리스트" },
  NewBookSpecial: {
    endpoint: "NewBookSpecial",
    title: "주목할 만한 신간 리스트",
  },
};

const getListInfo = (listType) => {
  return LIST_INFO_MAP[listType] || { title: "", endpoint: "" };
};

// eslint-disable-next-line react/prop-types
const BookListPage = ({ listType }) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const { title, endpoint } = getListInfo(listType);

  useEffect(() => {
    if (endpoint) {
      axios
        .get(`http://localhost:8080/${endpoint}`)
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
    <div>
      <h1>{title}</h1>
      {loading ? ( // 로딩 중일 때 Loading 컴포넌트 표시
        <Loading />
      ) : (
        <ul>
          {productList.map((product) => (
            <BookList key={product.isbn13} product={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookListPage;
