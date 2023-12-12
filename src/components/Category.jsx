/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 부모 컴포넌트에서 카테고리 버튼을 렌더링합니다.
export function CategoryList({ categories, initialClickedCategories, onCategoryClick }) {
  const [clickedCategories, setClickedCategories] = useState(initialClickedCategories);
  useEffect(() => {
    setClickedCategories(initialClickedCategories);
  }, [initialClickedCategories]);

  // 상태 업데이트 후의 값을 확인
  useEffect(() => {
    console.log(clickedCategories);
  }, [clickedCategories]);

  const handleButtonClick = (category) => {
    const isClicked = clickedCategories.includes(category);
    const canAdd = clickedCategories.length < 3;
    if (isClicked) {
      // 이미 클릭한 카테고리인 경우, 클릭 해제
      setClickedCategories((prevState) => prevState.filter((item) => item !== category));
    } else if (!isClicked && canAdd) {
      // 클릭하지 않은 카테고리이고, 아직 3개 미만이라면 클릭해서 추가
      setClickedCategories((prevState) => [...prevState, category]);
    }
    // 클릭한 카테고리가 이미 3개이면 추가하지 않고, 부모 컴포넌트에도 변경을 알리지 않음
    if (isClicked || canAdd) {
      onCategoryClick(category); // 부모 컴포넌트에서 클릭 이벤트 처리
    }
  };

  return (
    <div>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          $clicked={clickedCategories.includes(category)} // 클릭된 경우 스타일 변경
          onClick={() => handleButtonClick(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </div>
  );
}

const CategoryButton = styled.button`
  background-color: ${(props) => (props.$clicked ? 'var(--medium-blue)' : 'var(--white)')};
  color: var(--black);
  font-family: 'Pretendard-Regular';
  font-size: var(--font-xs-size);
  font-style: normal;
  font-weight: 400;
  padding: 8px 20px;
  border: none;
  border-radius: 70px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d2d8fa;
  }
`;
