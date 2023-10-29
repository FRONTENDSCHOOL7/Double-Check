/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
// import SplashPage from 'Pages/SplashPage';
// import ErrorPage from 'Pages/ErrorPage';
// import BottomBar from 'components/Common/BottomBar';
// import MainPage from 'Pages/MainPage';
import BookRoutes from 'Route/BookRoutes';
import SearchPage from 'Pages/SearchPage';
import SignupPage from 'Pages/SignupPage';
import LoginPage from 'Pages/LoginPage';
import PhraseWrite from 'Pages/PhrasePage/PhraseWrite';
import PhraseList from 'Pages/PhrasePage/PhraseList';

// import TestPage from 'Pages/TestPage';
import NavBar from 'components/Common/NavBar/NavBar';

import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';

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
            {/* <Route path='/' element={<MainPage />} /> */}
            <Route path='/book/*' element={<BookRoutes />} />
            <Route path='/loginpage' element={<LoginPage />} />
            <Route path='/signupPage' element={<SignupPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/phrasewrite' element={<PhraseWrite />} />
            <Route path='/phraselist' element={<PhraseList />} />
          </Routes>
          <NavBar />
        </LayoutStyle>
      </BrowserRouter>
    </QueryClientProvider>

  );
}
export default App;
