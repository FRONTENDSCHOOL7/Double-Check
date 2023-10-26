import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiSearchAlt } from 'react-icons/bi';
import { ReactComponent as Doblechaek } from '../../assets/images/logo/doblechaek.svg';
export default function Topbar() {
  const onClinkOpenNavbar = () => {
    console.log('누르면 너비게이션 바 나오게');
  };
  return (
    <SHeader>
      <SButton onClick={onClinkOpenNavbar}>
        <GiHamburgerMenu />
      </SButton>
      <Sh1>
        <SLink home to='/'>
          <SDoblechaek />
        </SLink>
      </Sh1>
      <SLink to='/search'>
        <BiSearchAlt />
      </SLink>
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

const SButton = styled.button`
  width: 25px;
  height: 25px;
  cursor: pointer;

  svg {
    font-size: 25px;
  }
`;
const Sh1 = styled.h1``;

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
