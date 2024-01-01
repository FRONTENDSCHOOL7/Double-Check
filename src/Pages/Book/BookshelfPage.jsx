import React, { useState, useEffect } from 'react';
import userInfoState from 'Recoil/UserInfo';
import { useRecoilValue } from 'recoil';
import { getBookDetails, getUserReadingList } from '../../firebase/firebaseService';

const BookshelfPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo ? userInfo.id : null;
  const [readingList, setReadingList] = useState([]);

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
        console.log('책장에 담은 책 목록: ', detailedReadingList);
      } catch (error) {
        console.error('책장 목록 가져오는 중 오류: ', error);
      }
    };

    fetchReadingList();
  }, [userId]); // useEffect의 두 번째 매개변수로 [userId]를 전달하여 userId가 변경될 때만 실행되도록 함

  return (
    <>
      <h1>책장 목록</h1>
      <ul>
        {readingList.map((book) => (
          <li key={book.Id}>{book.title}</li>
        ))}
      </ul>
    </>
  );
};

export default BookshelfPage;
