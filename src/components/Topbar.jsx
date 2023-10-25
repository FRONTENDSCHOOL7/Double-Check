import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.svg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AiOutlineSearch } from 'react-icons/ai';
export default function Topbar() {
  return (
    <SHeader>
      <SButton>
        <RxHamburgerMenu />
      </SButton>
      <Sh1>
        <SLink>
          <SImg src={logo} alt='더블책 로고' />
        </SLink>
      </Sh1>
      <SButton>
        <AiOutlineSearch />
      </SButton>
    </SHeader>
  );
}

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 60px;
  padding: 0 16px;
  border-bottom: solid 1px #e4e4e4;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  background-color: #fff;
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
  width: 100%;
  height: 100%;
`;

const SImg = styled.img`
  width: 170px;
`;
