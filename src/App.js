/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
// import SplashPage from 'Pages/SplashPage';
// import ErrorPage from 'Pages/ErrorPage';
// import BottomBar from 'components/Common/BottomBar';
import MainPage from 'Pages/MainPage';
import BookRoutes from 'Route/BookRoutes';
import SearchPage from 'Pages/SearchPage';
import SignupPage from 'Pages/SignupPage';
import LoginPage from 'Pages/LoginPage';
import PhraseList from 'Pages/Phrase/PhraseList';
import PhraseWritePage from 'Pages/Phrase/PhraseWrite';

// import TestPage from 'Pages/TestPage';
import NavBar from 'components/Common/NavBar/NavBar';

import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import OthersPage from 'Pages/OthersPage';

function App() {
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
            <Route path='/phrasewrite' element={<PhraseWritePage />} />
            <Route path='/phraselist' element={<PhraseList />} />
            <Route path='/search' element={<SearchPage />} />
            {/* <Route path='/profile/:accountname' element={<OthersPage />} /> */}
          </Routes>
          <NavBar />
        </LayoutStyle>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
