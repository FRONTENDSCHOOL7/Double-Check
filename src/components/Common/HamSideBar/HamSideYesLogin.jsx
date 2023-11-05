import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from 'assets/images/doublechaeklogo.svg';
import { ModalBackDrop } from 'components/Common/Modal/ModalStyle';
import { GiHamburgerMenu } from 'react-icons/gi';
import ToggleMenu from './ToggleMenu';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginCheck } from 'Recoil/LoginCheck';
import { BiLogOut } from 'react-icons/bi';
import ImageCheck from 'components/Common/ImageCheck';
import Modal from 'components/Common/Modal/Modal';
import { Link } from 'react-router-dom';
import userInfoState from 'Recoil/UserInfo';
export default function HamSideYesLogin() {
  // 햄버거버튼 열기 false -> true = opensidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [, setLoginCheck] = useRecoilState(loginCheck);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  // 햄버거 버튼 눌렀을 때 사이드바 열기 핸들링
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // 백드롭 화면 클릭시 사이드바 닫기 핸들링
  const sidebarClose = () => {
    setSidebarOpen(false);
  };

  // 토글 메뉴들 온클릭 사용시 페이지이동, 사이드바 닫기위해 함수 만듬
  const handleMenuItemClick = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  // 로그아웃 처리를 위한 함수
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('token');
    localStorage.removeItem('recoil-persist');
    setLoginCheck(false);
    setIsModalOpen(false);
    // 사이드바 닫기
    setSidebarOpen(false);
    // 사용자를 홈으로 리디렉션
    navigate('/');
  };

  // 토글 메뉴에 meneitems props로 전달하기
  const bookMenuItems = [
    { name: '전체 책 보기', action: () => handleMenuItemClick('/books') },
    { name: '내가 저장한 책 목록', action: () => handleMenuItemClick('/my-books') },
  ];

  const quotesMenuItems = [
    { name: '전체 글귀 보기', action: () => handleMenuItemClick('/quotes') },
    { name: '내가 작성한 글귀 목록', action: () => handleMenuItemClick('/my-quotes') },
  ];

  // 사용자 정보를 저장할 상태

  useEffect(() => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  // Function to open the modal
  function openModal() {
    setIsModalOpen(true);
    setSidebarOpen(false);
  }

  // Function to close the modal
  function closeModal() {
    setIsModalOpen(false);
  }

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('https://api.mandarin.weniv.co.kr/user/myinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 포함
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log(data);
      // 여기서 data에서 원하는 정보만 추출
      if (data && data.user) {
        const checkedImage = ImageCheck(data.user.image, 'profile'); //
        setUserInfo({
          name: data.user.username,
          id: data.user._id,
          image: checkedImage,
          accountname: data.user.accountname,
          // 다른 필요한 데이터
        });
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  console.log(userInfo);
  // userInfo가 있으면 이미지를 ImageCheck를 통해 검사하고, 그 결과를 사용합니다.
  const userImage = userInfo ? ImageCheck(userInfo.image, 'profile') : null;
  return (
    <>
      <>
        <Container>
          <SButton onClick={toggleSidebar}>
            <GiHamburgerMenu />
          </SButton>
          {isSidebarOpen && (
            <>
              <SideBarBackDrop onClick={sidebarClose} />
              <Sidebar isOpen={isSidebarOpen}>
                <Logo src={logo} alt='logo' />
                <MyAccount to='/setmyinfo'>
                  {userInfo ? (
                    <>
                      <UserImage src={userImage} alt='userprofileimage' />
                      <UserName>
                        {userInfo.name}님<br /> 환영합니다!
                      </UserName>
                      {/* <p>{userInfo.id}</p> */}
                    </>
                  ) : (
                    '계정 정보를 불러오는 중...'
                  )}
                </MyAccount>

                {/* 토글 */}
                <ToggleMenu title='책 목록' menuItems={bookMenuItems} />
                <ToggleMenu title='글귀' menuItems={quotesMenuItems} />
                <LogoutBtn onClick={openModal}>
                  <StyledIcon />
                  로그아웃
                </LogoutBtn>
              </Sidebar>
            </>
          )}
        </Container>
      </>

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

// 스타일
const Container = styled.div`
  font-family: Arial, sans-serif;
  position: relative;
`;

const SButton = styled.button`
  width: 25px;
  height: 25px;
  cursor: pointer;
  svg {
    font-size: 25px;
  }
`;

const Sidebar = styled.div`
  @keyframes slide {
    from {
      opacity: 0;
      width: 200px;
    }
    to {
      opacity: 1;
      width: 244px;
    }
  }

  animation: slide 0.3s;
  display: flex; // Flex container로 설정
  flex-direction: column; // Children을 세로로 정렬
  position: absolute;
  width: 244px;
  height: 100vh;
  background-color: white;
  z-index: 250;
  left: -16px;
  top: -21px;
`;

const Logo = styled.img`
  /* image2.png에 대한 스타일 */
  display: block;
  width: 153px;
  height: 57px;
  margin-top: 49px;
  margin-left: 27px;
`;

const MyAccount = styled(Link)`
  background-color: var(--gray-200);
  width: 100%;
  padding: 27px 0;
  margin-top: 39px;
`;

const UserImage = styled.img`
  width: 80px; // 이미지의 너비를 80px로 설정
  height: 80px; // 이미지의 높이를 80px로 설정
  border-radius: 50%; // 이미지를 원형으로 만듭니다
  object-fit: cover; // 이미지 비율을 유지하면서 요소에 맞춥니다
`;

const UserName = styled.p`
  margin-top: 15px;
  font-size: var(--font-xs-size);
`;

const LogoutBtn = styled.button`
  margin-top: auto; // 나머지 콘텐츠와 분리하여 밑으로 밀기
  margin-bottom: 20px;
  width: 50%; // 버튼 너비를 사이드바에 맞춤
  font-size: 18px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

// 부모요소(선택자점수)때문에 이미지 사이즈 줄이려고 이렇게함
const StyledIcon = styled(BiLogOut)`
  && {
    font-size: 23px;
  }
`;

const SideBarBackDrop = styled(ModalBackDrop)`
  transform: translateX(-50%);
  left: 50%;
`;
