/* eslint-disable no-unused-vars */
import React from 'react';
import userInfoState from 'Recoil/UserInfo';
import { useRecoilValue } from 'recoil';
import { removeBook, toggleBookStatus, updateBookStatus } from '../../firebase/firebaseService';
import BookList from 'components/Book/BookList';
import { SBookList, SSection } from './BookListPage';
import Topbar from 'components/Common/Topbar/Topbar';
import BookListSkeleton from 'assets/Skeleton/BookListSkeleton';
import useReadingList from '../../Hooks/useReadingList';
import styled from 'styled-components';

const BookshelfPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const userId = userInfo ? userInfo.id : null;
  const { readingList, loading, setReadingList, setLoading } = useReadingList(userId);

  const handleToggleReadStatus = async (bookId) => {
    try {
      await toggleBookStatus(userId, bookId);

      setReadingList((prevReadingList) =>
        prevReadingList.map((book) =>
          book.bookId === bookId
            ? {
                ...book,
                status: book.status === 'Read' ? 'UnRead' : 'Read',
              }
            : book,
        ),
      );
    } catch (error) {
      console.error('도서 읽기 상태 토글 중 오류: ', error);
    }
  };

  const handleRemoveBook = async (bookId) => {
    try {
      await removeBook(userId, bookId);
      setReadingList((prevReadingList) => prevReadingList.filter((book) => book.bookId !== bookId));
      setLoading(true);
    } catch (error) {
      console.error('책 삭제 중 오류: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Topbar title='나의 책장' longtitle />
      <SSection>
        {loading ? (
          <BookListSkeleton />
        ) : (
          <SBookList rowGap>
            {readingList.map((book, index) => (
              <div key={index}>
                <BookList product={book} />
                <SButtons>
                  <SReadButton
                    onClick={() => handleToggleReadStatus(book.bookId)}
                    isCompleted={book.status === 'Read'}
                  >
                    {book.status === 'Read' ? '독서 완료' : '미독'}
                  </SReadButton>
                  <SettingButton onClick={() => handleRemoveBook(book.bookId)}>
                    담기 취소
                  </SettingButton>
                </SButtons>
              </div>
            ))}
          </SBookList>
        )}
      </SSection>
    </>
  );
};

export default BookshelfPage;

const SButtons = styled.div`
  text-align: center;
`;

const SettingButton = styled.button`
  border-radius: 6px;
  padding: 4px 7px;
  font-size: var(--font-xxs-size);
  color: var(--gray-400);
`;

const SReadButton = styled(SettingButton)`
  background-color: ${(props) =>
    props.isCompleted ? 'var(--dark-purple)' : 'var(--light-purple)'};
  color: ${(props) => (props.isCompleted ? 'var(--light-purple)' : 'var(--dark-purple)')};
`;
