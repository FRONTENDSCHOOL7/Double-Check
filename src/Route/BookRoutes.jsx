import React from "react";
import { Routes, Route } from "react-router-dom";
import BookListPage from "Pages/Book/BookListPage";
import BookDetailPage from "Pages/Book/BookDetailPage";

export default function BookRoutes() {
  return (
    <Routes>
      <Route
        path="/bestseller"
        element={<BookListPage listType="bestseller" />}
      />
      <Route path="/newBooks" element={<BookListPage listType="newBooks" />} />
      <Route
        path="/NewBookSpecial"
        element={<BookListPage listType="NewBookSpecial" />}
      />
      <Route path=":isbn" element={<BookDetailPage />} />
    </Routes>
  );
}
