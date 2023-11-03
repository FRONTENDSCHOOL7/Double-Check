/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
// import SplashPage from 'Pages/SplashPage';
// import ErrorPage from 'Pages/ErrorPage';

import PostPage from 'Pages/post/PostPage';
import PostDetailPage from 'Pages/post/PostDetailPage';
import PostEditPage from 'Pages/post/PostEditPage';
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
import { useRecoilValue } from 'recoil';
import { navBar } from './Recoil/Navbar';
import OthersPage from 'Pages/OthersPage';
import UserPost from 'components/Post/UserPost';

function App() {
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

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
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
            <Route path='/phraseupdate/:id' element={<PhraseUpdate />} />
            <Route path='/phraseupload/' element={<PhraseUpload />} />
            <Route path='/phraselist' element={<PhraseList />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/post' element={<PostMain />} />
            <Route path='/profile/:accountname/' element={<UserPost />} />
            <Route path='/post/:post_id' element={<PostDetailPage />} />
            <Route path='/post/:post_id/edit' element={<PostEditPage />} />
            {/* <Route path='/profile/:accountname' element={<OthersPage />} /> */}
          </Routes>
          {showNavBar && <NavBar />}
        </LayoutStyle>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
