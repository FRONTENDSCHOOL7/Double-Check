import styled from 'styled-components';

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  padding: 20px 0 15px 0;
  width: inherit;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  background-color: var(--white);
  z-index: 30;
`;

const NavBarContents = styled.div`
  width: 100%;
  display: flex;
  gap: 65px;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled.li`
  text-align: center;
  color: ${({ active }) => (active === 'false' ? 'var(--gray-500)' : 'var(--dark-purple)')};
  display: flex;
  flex-direction: column;
  gap: ${({ to }) => (to === '/profile' ? '4px' : '6px')};
  font-size: var(--font-xs-size);
`;

const NavItemImg = styled.img`
  height: ${({ to }) => (to === '/profile' ? '36px' : '31px')};
`;

const NavItemTxt = styled.p`
  min-width: 57px;
`;

export { NavBarWrapper, NavBarContents, NavItem, NavItemImg, NavItemTxt };
