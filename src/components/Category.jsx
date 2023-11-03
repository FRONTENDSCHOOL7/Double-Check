/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// styled-components를 사용하여 버튼 스타일을 정의합니다.
const CategoryButton = styled.button`
  background-color: ${(props) => (props.clicked ? '#d2d8fa' : '#fff')};
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  padding: 10px 20px;
  border: none;
  border-radius: 70px;
  margin: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d2d8fa;
  }
`;

// 부모 컴포넌트에서 카테고리 버튼을 렌더링합니다.
export function CategoryList({ categories, initialClickedCategories, onCategoryClick }) {
  const [clickedCategories, setClickedCategories] = useState(initialClickedCategories);
  useEffect(() => {
    setClickedCategories(initialClickedCategories);
  }, [initialClickedCategories]);

  useEffect(() => {
    console.log(clickedCategories); // 상태 업데이트 후의 값을 확인
  }, [clickedCategories]);

  const handleButtonClick = (category) => {
    const isClicked = clickedCategories.includes(category);
    if (isClicked) {
      // 이미 클릭한 카테고리인 경우, 클릭 해제
      setClickedCategories((prevState) => prevState.filter((item) => item !== category));
    } else {
      // 클릭하지 않은 카테고리인 경우, 클릭
      setClickedCategories((prevState) => [...prevState, category]);
    }
    onCategoryClick(category); // 부모 컴포넌트에서 클릭 이벤트 처리
  };

  return (
    <div>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          clicked={clickedCategories.includes(category)} // 클릭된 경우 스타일 변경
          onClick={() => handleButtonClick(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </div>
  );
}
