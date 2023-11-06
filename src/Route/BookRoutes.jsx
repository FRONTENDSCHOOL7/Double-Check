import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookListPage from 'Pages/Book/BookListPage';
import BookDetailPage from 'Pages/Book/BookDetailPage';

export default function BookRoutes() {
  return (
    <Routes>
      <Route path='/bestseller' element={<BookListPage listType='bestseller' />} />
      <Route path='/newBooks' element={<BookListPage listType='newBooks' />} />
      <Route path='/NewBookSpecial' element={<BookListPage listType='NewBookSpecial' />} />
      <Route path=':isbn' element={<BookDetailPage />} />
    </Routes>
  );
}
// 책 전체페이지 -> 베스트셀러 , 신간전체도서 , 스페셜신간도서 -> 여기서 클릭하면 상세페이지로 이동
