/* eslint-disable no-unused-vars */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
import SetMyInfo from 'Pages/SetMyInfo';
import PostPage from 'Pages/Post/PostPage';
import PostDetailPage from 'Pages/Post/PostDetailPage';
import PostEditPage from 'Pages/Post/PostEditPage';
// import MainPage from 'Pages/MainPage';
// import BookRoutes from 'Route/BookRoutes';
// import SearchPage from 'Pages/SearchPage';
import SignupPage from 'Pages/SignupPage';
import LoginPage from 'Pages/LoginPage';
// import PhraseList from 'Pages/Phrase/PhraseList';
// import PostMain from 'Pages/Post/PostMain';
import ProfilePage from 'Pages/ProfilePage';
import NavBar from 'components/Common/NavBar/NavBar';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import PhraseUpdate from 'Pages/Phrase/PhraseUpdate';
import PhraseUpload from 'Pages/Phrase/PhraseUpload';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { navBar } from './Recoil/Navbar';
import StartLoginPage from 'Pages/StartLoginPage';
import SplashPage from 'Pages/SplashPage';
import ErrorPage from 'Pages/ErrorPage';
import RouteModal from 'components/Common/ProtectedRoute/RouteModal';

// lazy 적용
const BookRoutes = lazy(() => import('Route/BookRoutes'));
const MainPage = lazy(() => import('Pages/MainPage'));
const SearchPage = lazy(() => import('Pages/SearchPage'));
const PostMain = lazy(() => import('Pages/Post/PostMain'));
const PhraseList = lazy(() => import('Pages/Phrase/PhraseList'));

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
        {/*  라우터에 영향을 받지않는 컴포넌트들*/}
        <GlobalStyles />
        <LayoutStyle>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path='/*' element={<ErrorPage />} />
              <Route path='/' element={<SplashPage />} />
              <Route path='/startloginpage' element={<StartLoginPage />} />
              <Route path='/main' element={<MainPage />} />
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
                path='/phraselist'
                element={
                  <ProtectedRoute>
                    <PhraseList />
                  </ProtectedRoute>
                }
              />
              <Route
                path='/phrase/upload'
                element={
                  <ProtectedRoute>
                    <PhraseUpload />
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
              <Route
                path='/profile/:accountname'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </LayoutStyle>
        {showNavBar && <NavBar />}
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
