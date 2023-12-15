import appFirestore from '../../firebase/config';
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';

export default function AddBook() {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');

  const addBookToReadingList = async () => {
    try {
      await setDoc(
        doc(collection(appFirestore, 'users', 'USER_ID', 'readingActivity'), 'BOOK_ID'),
        {
          title: bookTitle,
          author: bookAuthor,
          status: 'saved',
          timestamp: new Date(),
        },
      );

      console.log('책이 저장된 책 목록에 추가되었습니다.');
      setBookTitle('');
      setBookAuthor('');
    } catch (error) {
      console.error('책 추가 중 오류:', error);
    }
  };

  const fetchBooks = async () => {
    const booksSnapshot = await getDocs(collection(appFirestore, 'books'));
    booksSnapshot.docs.forEach((doc) => {
      console.log(doc.data());
    });
  };

  fetchBooks();

  return (
    <>
      <h2>책 추가</h2>
      <label>
        제목:
        <input
          type='text'
          value={bookTitle}
          onChange={(event) => setBookTitle(event.target.value)}
        />
      </label>
      <label>
        저자:
        <input
          type='text'
          value={bookAuthor}
          onChange={(event) => setBookAuthor(event.target.value)}
        />
      </label>
      <button onClick={addBookToReadingList}>읽을 책으로 추가</button>
    </>
  );
}
