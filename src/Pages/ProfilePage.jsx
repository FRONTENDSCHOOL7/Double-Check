/* eslint-disable no-unused-vars */
import MyProfile from 'components/Profile/Profile';
import UserPost from 'components/Post/UserPost';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import accountnameState from 'Recoil/Accountname';
import { profileAPI, followAPI, unfollowAPI, accountProfileAPI } from 'API/Profile';
import { useParams } from 'react-router-dom';
import Topbar from 'components/Common/Topbar/Topbar';
import FollowerList from 'components/Profile/FollowerList';
import FollowingList from 'components/Profile/FollowingList';
import styled from 'styled-components';
import { showToast } from 'Hooks/useCustomToast';
import ViewToggleButton from 'components/Common/Button/ViewToggleButton';
import { viewState } from 'Recoil/FeedView';
import { navBar } from '../Recoil/Navbar';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import ModalButton from 'components/Common/Modal/ModalButton';
import { loginCheck } from 'Recoil/LoginCheck';
import Modal from 'components/Common/Modal/Modal';
import { Loading } from '../components/Profile/FollowListStyle';
import MyPhraseList from 'components/MyPhrase/MyPhraseList';
import { useGetMyPhrase } from 'Hooks/usePhrase';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [listToShow, setListToShow] = useState('posts');
  const [activeButton, setActiveButton] = useState(null);
  const [myAccountname, setMyAccountname] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const accountname = useRecoilValue(accountnameState);
  const { accountname: urlAccountname } = useParams();
  const [view, setView] = useRecoilState(viewState);
  const [showNavBar, setShowNavBar] = useRecoilState(navBar);
  const [, setLoginCheck] = useRecoilState(loginCheck);

  // 로그아웃 모달 버튼 상태
  const [showModalBtn, setshowModalBtn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMyProfile = async () => {
    setIsLoading(true);
    try {
      const response = await profileAPI();
      setMyAccountname(response.user.accountname);
      setIsLoading(false);
    } catch (error) {
      console.error('내 프로필 데이터 응답 오류: ', error);
      setIsLoading(false);
    }
  };

  const getAccountProfile = async () => {
    setIsLoading(true);
    try {
      if (urlAccountname) {
        const response = await accountProfileAPI(urlAccountname);
        setIsFollowing(response.profile.isfollow);
      }
    } catch (error) {
      console.error('다른 사용자 프로필 데이터 응답 오류: ', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyProfile();
    getAccountProfile();
  }, [urlAccountname]);
  useEffect(() => {
    setShowNavBar(true); // 렌더링 중에 상태 변경
  }, []);
  let finalAccountname = urlAccountname || myAccountname;

  const handleShowFollowers = () => {
    setListToShow('followers');
    setActiveButton('followers');
  };

  const handleShowFollowings = () => {
    setListToShow('followings');
    setActiveButton('followings');
  };

  const handleShowPosts = () => {
    setListToShow('posts');
    setActiveButton('posts');
  };

  const handleShowPhrase = () => {
    setListToShow('phrase');
    setActiveButton('phrase');
  };

  async function toggleFollow(accountnameToggle) {
    if (!accountnameToggle) return;

    const API = isFollowing ? unfollowAPI : followAPI;
    const action = isFollowing ? '언팔로우' : '팔로우';

    try {
      const response = await API({ accountname: accountnameToggle });
      if (response) {
        showToast(`${action}를 성공했습니다.`);
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(`${action} 요청 실패`, err);
      showToast(`${action} 요청에 실패했습니다.`);
    }
  }

  // 상단바 케밥 버튼
  const LogoutButton = urlAccountname === myAccountname && (
    <button onClick={() => setshowModalBtn(true)}>
      <HiOutlineDotsVertical />
    </button>
  );

  const handleLogout = () => {
    navigateToLoginPage();
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    handleCancel(false);
  };
  const handleCancel = () => {
    setshowModalBtn(false);
  };

  const navigateToLoginPage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('recoil-persist');
    setLoginCheck(false);
    navigate('/startloginpage');
  };

  const handleFollowClick = () => {
    toggleFollow(urlAccountname);
  };

  const toggleView = () => {
    setView((currentView) => (currentView === 'feed' ? 'gallery' : 'feed'));
  };

  const followButton = isFollowing ? (
    <FollowButton
      $isFollowing={isFollowing}
      onClick={handleFollowClick}
      $category='basic'
      shape='primary'
    >
      언팔로우
    </FollowButton>
  ) : (
    <FollowButton
      $isFollowing={isFollowing}
      onClick={handleFollowClick}
      $category='basic'
      shape='primary'
    >
      팔로우
    </FollowButton>
  );

  // useParams로 가져온 accountname이 없거나 현재 로그인된 유저의 accountname과 같을 경우 팔로우버튼이 보이지 않음
  const showFollowButton = urlAccountname && urlAccountname !== myAccountname;

  let content;
  switch (listToShow) {
    case 'followers':
      content = <FollowerList accountname={finalAccountname} />;
      break;
    case 'followings':
      content = <FollowingList accountname={finalAccountname} />;
      break;
    case 'phrase':
      content = <MyPhraseList />;
      break;
    case 'posts':
    default:
      content = (
        <>
          <FollowerHeader>
            <SSectionTitle>피드</SSectionTitle>
            <ViewToggleButton view={view} toggleView={toggleView} />
          </FollowerHeader>
          <UserPost accountname={finalAccountname} />
        </>
      );
      break;
  }

  if (isLoading) return <Loading>Loading...</Loading>;

  return (
    <>
      <Topbar
        title='프로필'
        rightButton={
          <>
            {showFollowButton && followButton}
            {LogoutButton}
          </>
        }
      />
      <MyProfile
        onShowPosts={handleShowPosts}
        onShowPhrase={handleShowPhrase}
        onShowFollowers={handleShowFollowers}
        onShowFollowings={handleShowFollowings}
        activeButton={activeButton}
      />
      {content}

      {showModalBtn && (
        <ModalButton text={['로그아웃']} onClick={[openModal]} onCancel={handleCancel} padding />
      )}
      <Modal
        content='로그아웃하시겠습니까?'
        btnTxt='로그아웃'
        isVisible={isModalOpen}
        onConfirm={handleLogout}
        onCancel={closeModal}
      />
    </>
  );
}

const FollowButton = styled.button`
  background-color: ${({ $isFollowing }) => ($isFollowing ? 'var(--gray-200)' : 'var(--white)')};
  color: ${({ $isFollowing }) => ($isFollowing ? 'var(--gray-400)' : 'var(--black)')};
  border: 1px solid ${({ $isFollowing }) => ($isFollowing ? 'var(--gray-300)' : 'var(--gray-400)')};
  border-radius: 25px;
  cursor: pointer;
  font-size: var(--font-xm-size);
  line-height: 1;
  text-align: center;
  padding: 7px 16px;
`;

const FollowerHeader = styled.header`
  display: flex;
  text-align: center;
  margin-top: 20px;
  padding: 13px 0;
  font-family: 'Pretendard-Medium', sans-serif;
  font-size: var(--font-sm-size);
  border-top: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
  border-bottom: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
`;

const SSectionTitle = styled.h2`
  flex: 1;
  margin-left: 30px;
`;
