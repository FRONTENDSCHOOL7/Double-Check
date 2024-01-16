/* eslint-disable no-unused-vars */
import { getBookDetails, getUserReadingList } from '../firebase/firebaseService';
import { useEffect, useState } from 'react';

const useReadingList = (userId) => {
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const readingListData = await getUserReadingList(userId);
        const detailReadingList = await Promise.all(
          readingListData.map(async (book) => {
            const bookDetails = await getBookDetails(book.bookId);
            return {
              ...book,
              ...bookDetails,
            };
          }),
        );

        setReadingList(detailReadingList);
        setLoading(false);
        console.log('책장에 담은 책 목록: ', detailReadingList);
      } catch (error) {
        console.error('책장 목록 가져오는 중 오류: ', error);
      }
    };

    fetchReadingList();
  }, [userId]);

  return { readingList, loading, setLoading, setReadingList };
};

export default useReadingList;
