import React, { useState } from 'react';
import styled from 'styled-components';
import pigs from '../../../assets/images/pigs.png';
import logo from 'assets/images/hamlogo.svg';
import Button from 'components/Common/Button/Button';
import { ModalBackDrop } from 'components/Common/Modal/ModalStyle';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function HamSideNoLogin() {
  // 햄버거버튼 열기위한 리코일 false -> true = opensidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(true);
  };

  // 백드롭 화면 클릭시 사이드바 닫기 핸들링
  const sidebarClose = () => {
    setSidebarOpen(false);
  };

  // 버튼 눌렀을 때 이동, 사이드바 닫기 핸들러
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/startloginpage');
    setSidebarOpen(false);
  };
  return (
    <Container>
      <GiHamburgerMenu onClick={toggleSidebar} />

      {isSidebarOpen && (
        <>
          <SideBarBackDrop onClick={sidebarClose} />
          <Sidebar isOpen={isSidebarOpen}>
            <Logo src={logo} alt='logo' />
            <Character src={pigs} alt='character' />
            <LoginBtn category='sidebarBtn' onClick={handleButtonClick}>
              로그인/회원가입 하러 가기
            </LoginBtn>
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

// const SButton = styled.button`
//   width: 25px;
//   height: 25px;
//   cursor: pointer;
//   svg {
//     font-size: 25px;
//   }
// `;

// const Sidebar = styled.div`
//   position: absolute;
//   width: 244px;
//   height: 100vh;
//   background-color: white;
//   z-index: 20;
//   top: 0;
//   left: 50%;
//   transform: translateX(${(props) => (props.isOpen ? '-80%' : '0')});
//   transition: transform 0.3s ease-in-out;
// `;

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
  position: absolute;
  width: 244px;
  height: 100vh;
  background-color: white;
  z-index: 250;
  left: -16px;
  top: -21px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px 60px 10px;
`;

const Logo = styled.img`
  /* image2.png에 대한 스타일 */
  display: block;
  width: 160px;
  height: 70px;
`;

const Character = styled.img`
  /* image1.jpg에 대한 스타일 */
  display: block;
  width: 200px;
  margin: 85px 0px 10px 0px;
  /* width: 166px;
  height: 153px;
  margin: 107px auto;  */
`;

const LoginBtn = styled(Button)`
  display: block;
`;

const SideBarBackDrop = styled(ModalBackDrop)`
  transform: translateX(-50%);
  left: 50%;
`;
