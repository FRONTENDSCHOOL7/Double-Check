import React, { useEffect, useState } from 'react';
import { likeAPI, cancelLikeAPI } from '../../../API/like';
import heart from '../../../assets/images/icon/icon-heart.svg';
import fillheart from '../../../assets/images/icon/icon-fill-heart.svg';
import { useRecoilState } from 'recoil';
import loginToken from '../../../Recoil/LoginToken';
import styled from 'styled-components';
import { likedState } from '../../../Recoil/like';
function LikeButton({ postId, liked, heartCount }) {
  // eslint-disable-next-line no-unused-vars
  const [likedPosts, setLikedPosts] = useRecoilState(likedState);
  const initialHearted = localStorage.getItem(`hearted_${postId}`) === 'true';
  const [token] = useRecoilState(loginToken);
  const [isLiked, setIsLiked] = useState(liked);
  const [heartValue, setHeartValue] = useState(heartCount);
  console.log(heartValue);
  const handleLike = async () => {
    try {
      if (isLiked) {
        const response = await cancelLikeAPI(token, postId);
        if (response) {
          setIsLiked(false);
          localStorage.removeItem(`hearted_${postId}`);
          cancelHeartData();
          setLikedPosts((prevLikedPosts) => {
            const updatedLikedPosts = { ...prevLikedPosts };
            delete updatedLikedPosts[postId];
            return updatedLikedPosts;
          });
        }
      } else {
        const response = await likeAPI(token, postId);
        if (response) {
          setIsLiked(true);
          localStorage.setItem(`hearted_${postId}`, response.post.hearted);
          getHeartData();
          setLikedPosts((prevLikedPosts) => ({
            ...prevLikedPosts,
            [postId]: true,
          }));
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
      <LikeButtonContainer onClick={handleLike}>
        {isLiked ? <LikeIcon src={fillheart} alt='Unlike' /> : <LikeIcon src={heart} alt='Like' />}
        <span>{heartValue}</span>
      </LikeButtonContainer>
    </>
  );
}
const LikeButtonContainer = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    color: var(--gray-500);
  }
`;

const LikeIcon = styled.img`
  margin-right: 4px;
`;
export default LikeButton;
