import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Loading from 'assets/Skeleton/BookListSkeleton';
import BookDetail from 'components/Book/BookDetail';

export default function BookDetailPage() {
  const location = useLocation();
  const { isbn } = useParams();
  const [detailInfo, setDetailInfo] = useState({});

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://port-0-node-express-1igmo82clonz4u17.sel5.cloudtype.app/search/?isbn=${isbn}`,
        );
        console.log(response.data.naverData.items.length);
        console.log(response.data.aladinData.item.length);
        let bookData;
        if (response.data.naverData.items.length) {
          bookData = response.data.naverData.items[0];
        } else if (response.data.aladinData.item.length) {
          bookData = response.data.aladinData.item[0];
        }
        //console.log(bookData); // 객체 형태 {}
        setDetailInfo(bookData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [isbn, location.state]);

  useEffect(() => {
    // console.log(detailInfo); // 업데이트된 값 확인
  }, [detailInfo]);

  return (
    <>
      {Object.keys(detailInfo).length === 0 ? <Loading /> : <BookDetail detailInfo={detailInfo} />}
    </>
  );
}
