import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { VscChevronLeft } from 'react-icons/vsc';
import { ReactComponent as Doblechaek } from '../../../assets/images/doublechaeklogo.svg';
import TopBarBtn from '../TopBarBtn';

const Topbar = ({ leftButton, title, rightButton }) => {
  const navigate = useNavigate();
  const defaultLeftButton = <TopBarBtn icon={VscChevronLeft} onClick={() => navigate(-1)} />;

  const defaultTitle = (
    <SLink home to='/'>
      <SDoblechaek />
    </SLink>
  );

  return (
    <SHeader>
      {leftButton || defaultLeftButton}
      <Sh1>{title || defaultTitle}</Sh1>
      {rightButton || null}
    </SHeader>
  );
};

export default Topbar;

const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 70px;
  padding: 0 16px;
  border-bottom: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
  box-sizing: border-box;
  position: fixed;
  top: 0;
  background-color: ${(props) => (props.customStyle ? 'var(--light-blue)' : '#fff')};
  z-index: 100;
`;

const Sh1 = styled.h1`
  text-align: center;
  font-size: var(--font-base-size);
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
