// BookshelfPage.jsx
import React, { useState, useEffect } from 'react';
import userInfoState from 'Recoil/UserInfo';
import { useRecoilValue } from 'recoil';
import { getBookDetails, getUserReadingList } from '../../firebase/firebaseService';
import BookList from 'components/Book/BookList';
import { SBookList, SSection } from './BookListPage';
import Topbar from 'components/Common/Topbar/Topbar';
import BookListSkeleton from 'assets/Skeleton/BookListSkeleton';

const BookshelfPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo ? userInfo.id : null;
  const [readingList, setReadingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadingList = async () => {
      try {
        const readingListData = await getUserReadingList(userId);
        const detailedReadingList = await Promise.all(
          readingListData.map(async (book) => {
            const bookDetails = await getBookDetails(book.bookId);
            return {
              ...book,
              ...bookDetails,
            };
          }),
        );
        setReadingList(detailedReadingList);
        setLoading(false);
        console.log('책장에 담은 책 목록: ', detailedReadingList);
      } catch (error) {
        console.error('책장 목록 가져오는 중 오류: ', error);
      }
    };

    fetchReadingList();
  }, [userId]);

  return (
    <>
      <Topbar title='나의 책장' longtitle />
      <SSection>
        {loading ? (
          <BookListSkeleton />
        ) : (
          <SBookList>
            {readingList.map((book, index) => (
              <BookList key={index} product={book} />
            ))}
          </SBookList>
        )}
      </SSection>
    </>
  );
};

export default BookshelfPage;
