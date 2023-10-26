import styled from 'styled-components';

const NavBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  padding: 20px 0 11px 0;
  width: inherit;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  background-color: var(--white);
`;

const NavBarContents = styled.div`
  width: 100%;
  display: flex;
  gap: 38px;
  justify-content: center;
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
  height: ${({ to }) => (to === '/profile' ? '27px' : '24px')};
`;

const NavItemTxt = styled.p`
  min-width: 57px;
`;

export { NavBarWrapper, NavBarContents, NavItem, NavItemImg, NavItemTxt };
