/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
// import SplashPage from 'Pages/SplashPage';
// import ErrorPage from 'Pages/ErrorPage';
import SetMyInfo from 'Pages/SetMyInfo';
import PostPage from 'Pages/Post/PostPage';
import PostDetailPage from 'Pages/Post/PostDetailPage';
import PostEditPage from 'Pages/Post/PostEditPage';
import MainPage from 'Pages/MainPage';
import BookRoutes from 'Route/BookRoutes';
import SearchPage from 'Pages/SearchPage';
import SignupPage from 'Pages/SignupPage';
import LoginPage from 'Pages/LoginPage';
import PhraseList from 'Pages/Phrase/PhraseList';
import PostMain from 'Pages/Post/PostMain';

// import TestPage from 'Pages/TestPage';
import NavBar from 'components/Common/NavBar/NavBar';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import PhraseUpdate from 'Pages/Phrase/PhraseUpdate';
import PhraseUpload from 'Pages/Phrase/PhraseUpload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { navBar } from './Recoil/Navbar';

// import StartLoginPage from 'Pages/StartLoginPage';
import UserPost from 'components/Post/UserPost';
import SplashPage from 'Pages/SplashPage';
import ErrorPage from 'Pages/ErrorPage';
import StartLoginPage from 'Pages/StartLoginPage';
import loginToken from 'Recoil/LoginToken';
import Modal from 'components/Common/Modal/Modal';
import PostDetail from 'components/Post/PostDetail';
import PhraseEdit from 'Pages/Phrase/PhraseUpload';
import RouteModal from 'components/Common/\bProtectedRoute/RouteModal';

function App() {
  const token = localStorage.getItem('token');
  console.log(`token : ${token}`);
  const showNavBar = useRecoilValue(navBar);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    },
  });
  const ProtectedRoute = ({ children }) => {
    return <RouteModal token={token}>{children}</RouteModal>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <GlobalStyles />
        {/*  라우터에 영향을 받지않는 컴포넌트들*/}
        <Routes>
          <Route path='/splash' element={<SplashPage />} />
          <Route path='/error' element={<ErrorPage />} />
        </Routes>
        <LayoutStyle>
          <Routes>
            <Route path='/*' element={<StartLoginPage />} />
            <Route path='/' element={<MainPage />} />
            <Route path='/book/*' element={<BookRoutes />} />
            <Route path='/loginpage' element={<LoginPage />} />
            <Route path='/signupPage' element={<SignupPage />} />
            <Route
              path='/search'
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/phraseupdate/:id'
              element={
                <ProtectedRoute>
                  <PhraseUpdate />
                </ProtectedRoute>
              }
            />
            <Route
              path='/phraseupload/'
              element={
                <ProtectedRoute>
                  <PhraseEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path='/phraselist'
              element={
                <ProtectedRoute>
                  <PhraseList />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/upload/'
              element={
                <ProtectedRoute>
                  <PostPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/:post_id'
              element={
                <ProtectedRoute>
                  <PostDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post/:post_id/edit'
              element={
                <ProtectedRoute>
                  <PostEditPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/post'
              element={
                <ProtectedRoute>
                  <PostMain />
                </ProtectedRoute>
              }
            />
            <Route
              path='/setmyinfo'
              element={
                <ProtectedRoute>
                  <SetMyInfo />
                </ProtectedRoute>
              }
            />
            {/* <Route path='/profile/:accountname' element={<OthersPage />} /> */}
          </Routes>
          {showNavBar && <NavBar />}
        </LayoutStyle>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
