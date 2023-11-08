import React, { useState, useEffect } from 'react';
import { getfollowingListAPI } from '../../API/Profile';
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

export default function FollowingList({ accountname }) {
  const [followings, setFollowings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFollowings() {
      try {
        setIsLoading(true);
        const response = await getfollowingListAPI({ accountname });
        console.log(response);
        setFollowings(response);
        setIsLoading(false);
      } catch (err) {
        console.error('팔로잉 리스트 요청 실패', err);
        setError(err);
        setIsLoading(false);
      }
    }

    if (accountname) {
      fetchFollowings();
    }
  }, [accountname]);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>팔로잉 리스트를 가져오는데 실패했습니다.</div>;
  }

  if (isLoading) return <Loding>Loading...</Loding>;
  if (error) return <div>Error: {error}</div>;

  // 사용자 프로필로 이동하는 함수
  const goToUserProfile = (accountname) => {
    navigate(`/profile/${accountname}`);
  };

  return (
    <div>
      <FollowerTitle>팔로잉 목록</FollowerTitle>
      {followings && followings.length > 0 ? (
        <UserProfileWrapper>
          {followings.map((following, index) => (
            <UserProfile key={index} onClick={() => goToUserProfile(following.accountname)}>
              <ProfileImage
                src={ImageCheck(following.image, 'profile')}
                alt='유저 기본 프로필 이미지'
              />
              {following.username}
            </UserProfile>
          ))}
        </UserProfileWrapper>
      ) : (
        <EmptyList>현재 팔로잉 목록이 비어있습니다.</EmptyList>
      )}
    </div>
  );
}
