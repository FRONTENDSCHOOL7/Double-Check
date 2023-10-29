/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
// import SplashPage from 'Pages/SplashPage';
// import ErrorPage from 'Pages/ErrorPage';
import MainPage from 'Pages/MainPage';
import BookRoutes from 'Route/BookRoutes';
import SearchPage from 'Pages/SearchPage';
import SignupPage from 'Pages/SignupPage';
import LoginPage from 'Pages/LoginPage';
import TestPage from 'Pages/TestPage';
import NavBar from 'components/Common/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/*  라우터에 영향을 받지않는 컴포넌트들*/}
      <LayoutStyle>
        <Routes>
          {/* <Route path='/*' element={<ErrorPage />} /> */}
          {/* <Route path='/' element={<SplashPage />} /> */}
          <Route path='/' element={<MainPage />} />
          <Route path='/book/*' element={<BookRoutes />} />
          <Route path='/loginpage' element={<LoginPage />} />
          <Route path='/signupPage' element={<SignupPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
        <NavBar />
      </LayoutStyle>
    </BrowserRouter>
  );
}
export default App;
