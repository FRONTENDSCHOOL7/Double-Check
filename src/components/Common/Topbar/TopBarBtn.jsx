import React from 'react';
import styled from 'styled-components';
// import Button from 'components/Common/Button/Button';
const TopBarBtn = ({ icon, onClick, txt }) => {
  return (
    <SButton onClick={onClick} aria-label='이전으로 이동'>
      {icon && icon()} {txt}
    </SButton>
  );
};

export default TopBarBtn;

const SButton = styled.button`
  width: 30px;
  height: 30px;
  cursor: pointer;

  svg {
    font-size: 30px;
  }
`;
