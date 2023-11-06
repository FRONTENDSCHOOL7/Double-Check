import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Topbar from 'components/Common/Topbar/Topbar';
import Feed from 'components/MyProfile/Feed';
import FollowerList from 'components/MyProfile/FollowerList';
import FollowingList from 'components/MyProfile/FollowingList';
import MyProfile from 'components/MyProfile/MyProfile';
import Modal from 'components/Common/Modal/Modal';
import ModalButton from 'components/Common/Modal/ModalButton';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';

export default function MyProfilePage() {
  const navigate = useNavigate();
  const [listToShow, setListToShow] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // 활성화된 버튼 상태 관리

  // 모달 체크 시작
  const [showLogout, setShowLogout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setLoginCheck] = useRecoilState(loginCheck);
  // 로그아웃 모달체크
  const handleCancel = () => {
    setShowLogout(false);
  };
  const LogoutButton = (
    // 로그아웃,개인정보 모달 열기 setShowLogout(true)
    <button onClick={() => setShowLogout(true)}>
      <HiOutlineDotsVertical />
    </button>
  );

  // 로그아웃
  function openModal() {
    setIsModalOpen(true);
    setShowLogout(false);
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  // 로그아웃 처리를 위한 함수
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('recoil-persist');
    setLoginCheck(false);
    setIsModalOpen(false);
    location.reload(navigate('/main'));
  };
  // 모달 끝

  const handleShowFollowers = () => {
    setListToShow('followers');
    setActiveButton('followers'); // 팔로워 버튼 활성화 상태로 설정
  };

  const handleShowFollowings = () => {
    setListToShow('followings');
    setActiveButton('followings'); // 팔로잉 버튼 활성화 상태로 설정
  };

  let content;
  if (listToShow === 'followers') {
    content = <FollowerList />;
  } else if (listToShow === 'followings') {
    content = <FollowingList />;
  } else {
    content = <Feed />;
  }

  return (
    <>
      <Topbar title='내 프로필' rightButton={LogoutButton} />
      <MyProfile
        onShowFollowers={handleShowFollowers}
        onShowFollowings={handleShowFollowings}
        activeButton={activeButton}
      />
      {content}
      {showLogout && (
        <ModalButton text={['로그아웃']} onClick={[openModal]} onCancel={handleCancel} />
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
