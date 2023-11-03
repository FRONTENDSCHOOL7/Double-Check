import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Loading from 'components/Common/Loading';
import BookDetail from 'components/Book/BookDetail';

export default function BookDetailPage() {
  const location = useLocation();
  const { isbn } = useParams();
  const [detailInfo, setDetailInfo] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/search/?isbn=${isbn}`);
        let bookData = response.data.items || [];

        if (bookData.length === 0 && location.state && location.state.product) {
          bookData = [location.state.product];
        }

        setDetailInfo(bookData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [isbn, location.state]);

  return <>{detailInfo.length === 0 ? <Loading /> : <BookDetail book={detailInfo[0]} />}</>;
}
