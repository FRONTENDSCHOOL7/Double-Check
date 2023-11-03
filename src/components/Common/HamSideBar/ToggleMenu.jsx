import React, { useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import styled from 'styled-components';

export default function ToggleMenu({ title, menuItems }) {
  const [isOpen, setIsOpen] = useState(false);

  // ul li props로 전달받기 위한 함수
  const renderMenuItems = (items) => {
    return items.map((item, index) => (
      <li key={index}>
        <SubTitle onClick={item.action}>{item.name}</SubTitle>
      </li>
    ));
  };

  return (
    <TitleWrapper>
      <Title onClick={() => setIsOpen(!isOpen)}>
        <RotatingIcon isOpen={isOpen} />
        {title}
      </Title>
      {isOpen && <ul>{renderMenuItems(menuItems)}</ul>}
    </TitleWrapper>
  );
}

// 버튼 클릭 시 회전 스타일
const RotatingIcon = styled(BiSolidRightArrow).attrs({
  className: 'rotating-icon',
})`
  &.rotating-icon {
    font-size: 18px;
  }
  margin-right: 5px;
  font-size: 20px;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

const TitleWrapper = styled.div`
  margin-top: 35px;
  text-align: left;
  padding-left: 13px;
`;

const Title = styled.button`
  margin-bottom: 15px;
  font-size: 20px;
`;

const SubTitle = styled.button`
  margin-left: 25px;
  margin-bottom: 7px;
`;
