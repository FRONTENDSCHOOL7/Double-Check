/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import userInfoState from 'Recoil/UserInfo';
import Topbar from 'components/Common/Topbar/Topbar';
import { getBooksRead } from '../../firebase/firebaseService';
import { useRecoilValue } from 'recoil';
import BookList from 'components/Book/BookList';
import { SBookList, SSection } from './BookListPage';
import BookListSkeleton from 'assets/Skeleton/BookListSkeleton';

const BookReadPage = (bookId) => {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo ? userInfo.id : null;
  const [loading, setLoading] = useState(true);
  const [booksRead, setBooksRead] = useState([]);

  useEffect(() => {
    const fetchBooksRead = async () => {
      try {
        const booksReadData = await getBooksRead(userId);
        setBooksRead(booksReadData);
        setLoading(false);
      } catch (error) {
        console.error('읽은 책 목록 가져오는 중 오류: ', error);
      }
    };

    if (userId) {
      fetchBooksRead();
    }
  }, [userId]);

  console.log(booksRead);

  return (
    <>
      <Topbar title='읽은 책' longtitle />
      <SSection>
        {loading ? (
          <BookListSkeleton />
        ) : (
          <SBookList>
            {booksRead.map((book, index) => (
              <div key={index}>
                <BookList product={book} />
              </div>
            ))}
          </SBookList>
        )}
      </SSection>
    </>
  );
};

export default BookReadPage;
