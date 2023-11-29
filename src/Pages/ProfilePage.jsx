/* eslint-disable no-unused-vars */
import MyProfile from 'components/MyProfile/Profile';
import UserPost from 'components/Post/UserPost';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import accountnameState from 'Recoil/Accountname';
import { profileAPI, followAPI, unfollowAPI } from 'API/Profile';
import { useParams } from 'react-router-dom';
import Topbar from 'components/Common/Topbar/Topbar';
import FollowerList from 'components/MyProfile/FollowerList';
import FollowingList from 'components/MyProfile/FollowingList';
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
export default function ProfilePage() {
  const navigate = useNavigate();
  const [listToShow, setListToShow] = useState(null);
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
  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getMyProfile = async () => {
    setIsLoading(true);
    try {
      const response = await profileAPI();
      setMyAccountname(response.user.accountname);
      setIsLoading(false);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyProfile();
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

  async function toggleFollow(accountnameToggle) {
    if (!accountnameToggle) return;

    const API = isFollowing ? unfollowAPI : followAPI;
    const action = isFollowing ? '언팔로우' : '팔로우';

    try {
      const response = await API({ accountname: accountnameToggle });
      if (response) {
        console.log(response);
        console.log(response.profile.isfollow);
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
  // 모달 함수
  const handleLogout = () => {
    navigateToLoginPage(); // 로그아웃 함수 호출
    closeModal(); // 모달 닫기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  const openModal = () => {
    setIsModalOpen(true); // 모달 열기
    handleCancel(false);
  };
  const handleCancel = () => {
    setshowModalBtn(false);
  };

  // 로그아웃 하시겠습니까 ? 예 클릭시
  const navigateToLoginPage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('recoil-persist');
    setLoginCheck(false);
    navigate('/startloginpage');
  };
  // 모달 끝

  const handleFollowClick = () => {
    toggleFollow(urlAccountname);
  };

  const toggleView = () => {
    setView((currentView) => (currentView === 'feed' ? 'gallery' : 'feed'));
  };

  const followButton = isFollowing ? (
    <FollowButton
      isFollowing={isFollowing}
      onClick={handleFollowClick}
      category='basic'
      shape='primary'
    >
      언팔로우
    </FollowButton>
  ) : (
    <FollowButton
      isFollowing={isFollowing}
      onClick={handleFollowClick}
      category='basic'
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
    default:
      content = (
        <>
          <FollowerHeader>
            <SSectionTitle>게시물</SSectionTitle>
            <ViewToggleButton view={view} toggleView={toggleView} />
          </FollowerHeader>
          <UserPost accountname={finalAccountname} />
        </>
      );
      break;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
  background-color: ${(props) => (props.isFollowing ? 'var(--gray-200)' : 'var(--white)')};
  color: ${(props) => (props.isFollowing ? 'var(--gray-400)' : 'var(--black)')};
  border: 1px solid ${(props) => (props.isFollowing ? 'var(--gray-300)' : 'var(--gray-400)')};
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
