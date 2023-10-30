import React from 'react';
import styled from 'styled-components';
// import Button from 'components/Common/Button/Button';
const TopBarBtn = ({ icon, onClick, txt }) => {
  return (
    <SButton category='basic' shape='primary' type='button' onClick={onClick}>
      {icon && icon()} {txt}
    </SButton>
  );
};

export default TopBarBtn;

const SButton = styled.button`
  width: 25px;
  height: 25px;
  cursor: pointer;

  svg {
    font-size: 25px;
  }
`;
