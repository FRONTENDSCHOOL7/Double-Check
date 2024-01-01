import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'Styles/GlobalStyle';
import LayoutStyle from 'Styles/LayoutStyle';
import NavBar from 'components/Common/NavBar/NavBar';
import { navBar } from './Recoil/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import RouteModal from 'components/Common/ProtectedRoute/RouteModal';
const BookRoutes = lazy(() => import('Route/BookRoutes'));
const MainPage = lazy(() => import('Pages/MainPage'));
const SearchPage = lazy(() => import('Pages/SearchPage'));
const SignupPage = lazy(() => import('Pages/SignupPage'));
const LoginPage = lazy(() => import('Pages/LoginPage'));
const ProfilePage = lazy(() => import('Pages/ProfilePage'));
const PhraseList = lazy(() => import('Pages/Phrase/PhraseList'));
const PhraseUpdate = lazy(() => import('Pages/Phrase/PhraseUpdate'));
const PhraseUpload = lazy(() => import('Pages/Phrase/PhraseUpload'));
const StartLoginPage = lazy(() => import('Pages/StartLoginPage'));
const SplashPage = lazy(() => import('Pages/SplashPage'));
const ErrorPage = lazy(() => import('Pages/ErrorPage'));
const SetMyInfo = lazy(() => import('Pages/SetMyInfo'));
const PostMain = lazy(() => import('Pages/Post/PostMain'));
const PostPage = lazy(() => import('Pages/Post/PostPage'));
const PostDetailPage = lazy(() => import('Pages/Post/PostDetailPage'));
const PostEditPage = lazy(() => import('Pages/Post/PostEditPage'));
const BookshelfPage = lazy(() => import('Pages/Book/BookshelfPage'));

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
        <LayoutStyle>
          <Suspense>
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
              <Route
                path='/bookshelf'
                element={
                  <ProtectedRoute>
                    <BookshelfPage />
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
