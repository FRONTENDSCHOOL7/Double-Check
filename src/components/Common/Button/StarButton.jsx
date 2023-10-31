import React, { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import CoustomToast from '../Toast/CustomToast';

export default function Star() {
  const [starFilled, setStarFilled] = useState(false);
  const [toast, setToast] = useState(false); // 추가: 토스트 메시지 상태
  const handleStarClick = () => {
    setStarFilled(!starFilled);
    setToast(starFilled ? '취소되었습니다' : '저장되었습니다');
  };
  return (
    <>
      <button onClick={handleStarClick}>
        {starFilled ? (
          <AiFillStar style={{ color: '#ffd90c', fontSize: '30px' }} />
        ) : (
          <AiOutlineStar style={{ fontSize: '30px' }} />
        )}
      </button>
      {toast && <CoustomToast setToast={setToast} text={toast} />}
    </>
  );
}
