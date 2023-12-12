import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Loading from 'assets/Skeleton/BookListSkeleton'; /// 여기  스켈레톤 적용!!!
import BookDetail from 'components/Book/BookDetail';

export default function BookDetailPage() {
  const location = useLocation();
  const { isbn } = useParams();
  const [detailInfo, setDetailInfo] = useState({});
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://double-check.onrender.com/search/?isbn=${isbn}`);

        let bookData;
        if (response.data.naverData.items.length) {
          bookData = response.data.naverData.items[0];
        } else if (response.data.aladinData.item.length) {
          bookData = response.data.aladinData.item[0];
        }

        setDetailInfo(bookData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [isbn, location.state]);

  return (
    <>
      {Object.keys(detailInfo).length === 0 ? <Loading /> : <BookDetail detailInfo={detailInfo} />}
    </>
  );
}
