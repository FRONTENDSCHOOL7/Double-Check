import React from 'react';
import styled from 'styled-components';

const TopBarBtn = ({ icon, onClick }) => {
  return <SButton onClick={onClick}>{icon && icon()}</SButton>;
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
