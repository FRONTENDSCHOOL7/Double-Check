import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import Loading from 'assets/Skeleton/BookListSkeleton';
import BookDetail from 'components/Book/BookDetail';

export default function BookDetailPage() {
  const location = useLocation();
  const { isbn } = useParams();
  const [detailInfo, setDetailInfo] = useState([]);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `https://port-0-node-express-1igmo82clonz4u17.sel5.cloudtype.app/search/?isbn=${isbn}`
        );
        let bookData = [];
        if (response.data.naverData && response.data.naverData.items) {
          bookData = response.data.naverData.items;
        } else if (response.data.aladinData && response.data.aladinData.item) {
          bookData = [response.data.aladinData.item[0]];
        }

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
