import React, { useEffect, useState } from 'react';
import { likeAPI, cancelLikeAPI } from '../../../API/like';
import heart from '../../../assets/images/icon/icon-heart.svg';
import fillheart from '../../../assets/images/icon/icon-fill-heart.svg';
import { useRecoilState } from 'recoil';
import loginToken from '../../../Recoil/LoginToken';

function LikeButton({ postId, liked, heartCount }) {
  const initialHearted = localStorage.getItem(`hearted_${postId}`) === 'true';
  const [token] = useRecoilState(loginToken);
  const [isLiked, setIsLiked] = useState(liked);
  const [heartValue, setHeartValue] = useState(heartCount);

  const handleLike = async () => {
    try {
      if (isLiked) {
        const response = await cancelLikeAPI(token, postId);
        if (response) {
          setIsLiked(false);
          localStorage.removeItem(`hearted_${postId}`);
          cancelHeartData();
        }
      } else {
        const response = await likeAPI(token, postId);
        if (response) {
          setIsLiked(true);
          localStorage.setItem(`hearted_${postId}`, response.post.hearted);
          getHeartData();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    setHeartValue(heartCount);
  }, [heartCount]);

  useEffect(() => {
    setIsLiked(initialHearted);
  }, [initialHearted]);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const getHeartData = () => {
    setHeartValue((prev) => prev + 1);
  };

  const cancelHeartData = () => {
    setHeartValue((prev) => prev - 1);
  };

  return (
    <>
      <button onClick={handleLike}>
        {isLiked ? <img src={fillheart} alt='Unlike' /> : <img src={heart} alt='Like' />}
        <span>{heartValue}</span>
      </button>
    </>
  );
}

export default LikeButton;
