import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from 'assets/images/doublechaeklogo.svg';
import { ModalBackDrop } from 'components/Common/Modal/ModalStyle';
import { GiHamburgerMenu } from 'react-icons/gi';
import ToggleMenu from './ToggleMenu';
import { useNavigate } from 'react-router-dom';

export default function HamSideYesLogin() {
  // 햄버거버튼 열기 false -> true = opensidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // 토큰 가져오기
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

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
      console.log(data);
      // 여기서 data에서 원하는 정보만 추출
      setUserInfo({
        name: data.user.username,
        id: data.user._id,
        image: data.user.image,
        // 다른 필요한 데이터
      });
      console.log(userInfo);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <Container>
      <SButton onClick={toggleSidebar}>
        <GiHamburgerMenu />
      </SButton>
      {isSidebarOpen && (
        <>
          <SideBarBackDrop onClick={sidebarClose} />
          <Sidebar isOpen={isSidebarOpen}>
            <Logo src={logo} alt='logo' />
            <MyAccount>
              {userInfo ? (
                <>
                  <img src='{userInfo.image}' alt='userprofileimage' />
                  <p>`{userInfo.name}님, 환영합니다!`</p>
                  <p>`{userInfo.id}</p>
                </>
              ) : (
                '계정 정보를 불러오는 중...'
              )}
            </MyAccount>
            {/* 토글 */}
            <ToggleMenu title='책 목록' menuItems={bookMenuItems} />
            <ToggleMenu title='글귀' menuItems={quotesMenuItems} />
            <LogoutBtn onClick={() => handleMenuItemClick('/')}>로그아웃</LogoutBtn>
          </Sidebar>
        </>
      )}
    </Container>
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
  z-index: 20;
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

const MyAccount = styled.button`
  background-color: lightgray;
  width: 100%;
  height: 178px;
  margin-top: 39px;
`;

const LogoutBtn = styled.button`
  margin-top: auto; // 나머지 콘텐츠와 분리하여 밑으로 밀기
  margin-bottom: 20px;
  width: 60%; // 버튼 너비를 사이드바에 맞춤
  font-size: 20px;
  cursor: pointer;
`;

const SideBarBackDrop = styled(ModalBackDrop)`
  transform: translateX(-50%);
  left: 50%;
`;
