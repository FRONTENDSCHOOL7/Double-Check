import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { VscChevronLeft } from 'react-icons/vsc';
import { ReactComponent as Doblechaek } from '../../assets/images/logo/doblechaek.svg';
import TopBarBtn from './TopBarBtn';
import HamSideNoLogin from './HamSideBar/HamSideNoLogin';

// 왼쪽 요소 : 미입력시 기본 값 < 뒤로가기
const LeftEl = ({ leftEl }) => {
  // 뒤로가기 기능
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };

  if (leftEl === 'navbar') {
    // 햄버거 바 일때
    return <TopBarBtn icon={HamSideNoLogin} />;
  } else {
    return <TopBarBtn icon={VscChevronLeft} onClick={handleClick} />;
  }
};

// 가운데 요소 : 기본값 로고
const CenterEl = ({ centerEl }) => {
  if (centerEl === 'search') {
    return <Sh1>검색하기</Sh1>;
  } else if (centerEl === 'profile') {
    return <Sh1>내 프로필</Sh1>;
  } else if (centerEl === 'writelist') {
    return <Sh1>내 글귀 목록</Sh1>;
  } else if (centerEl === 'write') {
    return <Sh1>글귀</Sh1>;
  } else if (centerEl === 'feed') {
    return <Sh1>피드</Sh1>;
  } else if (centerEl === 'home') {
    return (
      <h1>
        <SLink home to='/'>
          <SDoblechaek />
        </SLink>
      </h1>
    );
  } else {
    return <Sh1>{centerEl}</Sh1>;
  }
};

// 오른쪽 요소
const RightEl = ({ rightEl }) => {
  // 뒤로가기 기능
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/search');
  };
  if (rightEl === 'searchicon') {
    //검색아이콘
    return <TopBarBtn icon={BiSearchAlt} onClick={handleClick} />;
  } else {
    return <TopBarBtn />;
  }
};
export default function Topbar({ leftEl, centerEl, rightEl }) {
  return (
    <SHeader>
      {/* 요기 로그인 됐을 때 안됐을 때 진짜 모르겠음 ㅠ.ㅠ */}
      <LeftEl leftEl={leftEl} />
      <CenterEl centerEl={centerEl} />
      <RightEl rightEl={rightEl} />

      {/* <SButton>
        <GiHamburgerMenu />
      </SButton>
      <Sh1>
        <SLink home to='/'>
          <SDoblechaek />
        </SLink>
      </Sh1>
      <SLink to='/search'>
        <BiSearchAlt />
      </SLink> */}
    </SHeader>
  );
}

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 70px;
  padding: 0 16px;
  border-bottom: solid 1px #e4e4e4;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 100;
`;

const Sh1 = styled.h1`
  text-align: center;
  font-size: large;
  font-weight: 600;
`;

const SLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  display: block;
  width: ${(props) => (props.home ? '200px' : '25px')};
  height: ${(props) => (props.home ? '' : '25px')};
  svg {
    font-size: 25px;
  }
`;
const SDoblechaek = styled(Doblechaek)`
  width: 100%;
  vertical-align: bottom;
`;
// const SImg = styled.img`
//   width: 170px;
// `;
