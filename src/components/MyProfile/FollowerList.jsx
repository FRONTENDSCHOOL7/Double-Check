/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { getfollowerListAPI } from '../../API/Profile';
import { useNavigate } from 'react-router-dom';
import ImageCheck from '../Common/ImageCheck';
import {
  FollowerTitle,
  UserProfileWrapper,
  UserProfile,
  ProfileImage,
  EmptyList,
  Loding,
} from './FollowListStyle';

export default function FollowerList({ accountname }) {
  const [followers, setFollowers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  console.log(accountname);

  useEffect(() => {
    async function fetchFollowers() {
      try {
        setIsLoading(true);
        const response = await getfollowerListAPI({ accountname });
        setFollowers(response);
        setIsLoading(false);
      } catch (err) {
        console.error('팔로워 리스트 요청 실패', err);
        setError(err);
        setIsLoading(false);
      }
    }

    if (accountname) {
      fetchFollowers();
    }
  }, [accountname]);

  if (isLoading) return <Loding>Loading...</Loding>;
  if (error) return <div>Error: {error}</div>;

  // 사용자 프로필로 이동하는 함수
  const goToUserProfile = (accountname) => {
    navigate(`/profile/${accountname}`);
  };
  return (
    <div>
      <FollowerTitle>팔로워 목록</FollowerTitle>
      {followers && followers.length > 0 ? (
        <UserProfileWrapper>
          {followers.map((follower, index) => (
            <UserProfile key={index} onClick={() => goToUserProfile(follower.accountname)}>
              <ProfileImage
                src={ImageCheck(follower.image, 'profile')}
                alt='유저 기본 프로필 이미지'
              />
              {follower.username}
            </UserProfile>
          ))}
        </UserProfileWrapper>
      ) : (
        <EmptyList>현재 팔로워 목록이 비어있습니다.</EmptyList>
      )}
    </div>
  );
}
