import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
const BookListPage = lazy(() => import('Pages/Book/BookListPage'));
const BookDetailPage = lazy(() => import('Pages/Book/BookDetailPage'));
const BookMainPage = lazy(() => import('Pages/Book/BookMainPage'));
export default function BookRoutes() {
  return (
    <Suspense>
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
    </Suspense>
  );
}
