/* eslint-disable no-unused-vars */
import MyProfile from 'components/MyProfile/Profile';
import UserPost from 'components/Post/UserPost';
import React, { useState, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import accountnameState from 'Recoil/Accountname';
import { profileAPI, followAPI, unfollowAPI } from 'API/Profile';
import { useParams } from 'react-router-dom';
import Topbar from 'components/Common/Topbar/Topbar';
import FollowerList from 'components/MyProfile/FollowerList';
import FollowingList from 'components/MyProfile/FollowingList';
import styled from 'styled-components';
import { showToast } from 'Hooks/useCustomToast';
import ViewToggleButton from 'components/Common/Button/ViewToggleButton';
import { viewState } from 'Recoil/FeedView';

export default function ProfilePage() {
  const [listToShow, setListToShow] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [myAccountname, setMyAccountname] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const accountname = useRecoilValue(accountnameState);
  const { accountname: urlAccountname } = useParams();
  const [view, setView] = useRecoilState(viewState);

  const getMyProfile = async () => {
    setIsLoading(true);
    try {
      const response = await profileAPI();
      setMyAccountname(response.user.accountname);
      console.log(response.user.accountname);
      setIsLoading(false);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, [urlAccountname]);

  let finalAccountname = urlAccountname || myAccountname;

  const handleShowFollowers = () => {
    setListToShow('followers');
    setActiveButton('followers');
  };

  const handleShowFollowings = () => {
    setListToShow('followings');
    setActiveButton('followings');
  };

  async function toggleFollow(accountnameToggle) {
    if (!accountnameToggle) return;

    const API = isFollowing ? unfollowAPI : followAPI;
    const action = isFollowing ? '언팔로우' : '팔로우';

    try {
      const response = await API({ accountname: accountnameToggle });
      if (response) {
        console.log(response);
        console.log(response.profile.isfollow);
        showToast(`${action}를 성공했습니다.`);
        setIsFollowing(!isFollowing);
      }
    } catch (err) {
      console.error(`${action} 요청 실패`, err);
      showToast(`${action} 요청에 실패했습니다.`);
    }
  }

  const handleFollowClick = () => {
    toggleFollow(urlAccountname);
  };

  const toggleView = () => {
    setView((currentView) => (currentView === 'feed' ? 'gallery' : 'feed'));
  };

  const followButton = isFollowing ? (
    <FollowButton
      isFollowing={isFollowing}
      onClick={handleFollowClick}
      category='basic'
      shape='primary'
    >
      언팔로우
    </FollowButton>
  ) : (
    <FollowButton
      isFollowing={isFollowing}
      onClick={handleFollowClick}
      category='basic'
      shape='primary'
    >
      팔로우
    </FollowButton>
  );

  // useParams로 가져온 accountname이 없거나 현재 로그인된 유저의 accountname과 같을 경우 팔로우버튼이 보이지 않음
  const showFollowButton = urlAccountname && urlAccountname !== myAccountname;

  let content;
  switch (listToShow) {
    case 'followers':
      content = <FollowerList accountname={finalAccountname} />;
      break;
    case 'followings':
      content = <FollowingList accountname={finalAccountname} />;
      break;
    default:
      content = (
        <>
          <FollowerTitle>
            <SSectionTitle>게시물</SSectionTitle>
            <ViewToggleButton view={view} toggleView={toggleView} />
          </FollowerTitle>
          <UserPost accountname={finalAccountname} />
        </>
      );
      break;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Topbar title='프로필' rightButton={showFollowButton && followButton} />
      <MyProfile
        onShowFollowers={handleShowFollowers}
        onShowFollowings={handleShowFollowings}
        activeButton={activeButton}
      />
      {content}
    </>
  );
}

const FollowButton = styled.button`
  background-color: ${(props) => (props.isFollowing ? 'var(--gray-300)' : 'var(--white)')};
  color: ${(props) => (props.isFollowing ? 'var(--gray-500)' : 'var(--black)')};
  border: 1px solid ${(props) => (props.isFollowing ? 'var(--gray-400)' : 'var(--gray-400)')};
  border-radius: 25px;
  cursor: pointer;
  font-size: var(--font-xm-size);
  line-height: 1;
  text-align: center;
  padding: 7px 16px;
`;

const FollowerTitle = styled.p`
  display: flex;
  text-align: center;
  margin-top: 20px;
  padding: 13px 0;
  font-family: 'Pretendard-Medium', sans-serif;
  font-size: var(--font-sm-size);
  border-top: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
  border-bottom: ${(props) => (props.customStyle ? 'none' : 'solid 1px #e4e4e4')};
`;

const SSectionTitle = styled.h4`
  flex: 1;
  margin-left: 30px;
`;
