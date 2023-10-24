import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyles from "styles/GlobalStyles";
// import SplashPage from 'Pages/SplashPage';
// import ErrorPage from 'Pages/ErrorPage';
import TopBar from "components/Common/TopBar";
import BottomBar from "components/Common/BottomBar";
import MainPage from "Pages/MainPage";
import BookRoutes from "Route/BookRoutes";
import SearchPage from "Pages/SearchPage";
import SignupPage from "Pages/SignupPage";
import LoginPage from "Pages/LoginPage";
import Test from "Pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      {/*  라우터에 영향을 받지않는 컴포넌트들*/}
      <TopBar />
      <Routes>
        {/* <Route path='/*' element={<ErrorPage />} /> */}
        {/* <Route path='/' element={<SplashPage />} /> */}
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/bookpage/*" element={<BookRoutes />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/searchPage" element={<SearchPage />} />
      </Routes>
      <Test />
      <BottomBar />
    </BrowserRouter>
  );
}
export default App;
