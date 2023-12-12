import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookListPage from 'Pages/Book/BookListPage';
import BookDetailPage from 'Pages/Book/BookDetailPage';
import BookMainPage from 'Pages/Book/BookMainPage';
export default function BookRoutes() {
  return (
    <Routes>
      <Route path='/main' element={<BookMainPage />} />
      <Route
        path='bestseller'
        element={<BookListPage listType='bestseller' title='베스트 셀러' />}
      />
      <Route
        path='newbooks'
        element={<BookListPage listType='newbooks' title='신간 도서 리스트' />}
      />
      <Route
        path='special'
        element={<BookListPage listType='special' title='이번달 신간 리스트' />}
      />
      <Route path=':isbn' element={<BookDetailPage />} />
    </Routes>
  );
}
