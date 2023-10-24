import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from 'components/Common/Loading'; // 로딩 상태 처리 컴포넌트
import BookDetail from 'components/Book/BookDetail';
export default function BookDetailPage() {
  const [detailInfo, setDetailInfo] = useState([]);
  const { isbn } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/search/book?isbn=${isbn}`);
        setDetailInfo(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookDetails();
  }, [isbn]);

  return <div>{detailInfo.length === 0 ? <Loading /> : <BookDetail book={detailInfo[0]} />}</div>;
}
