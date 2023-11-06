import Topbar from 'components/Common/TopBar';
import Feed from 'components/MyProfile/Feed';
import FollowerList from 'components/MyProfile/FollowerList';
import FollowingList from 'components/MyProfile/FollowingList';
import MyProfile from 'components/MyProfile/MyProfile';
import React, { useState } from 'react';

export default function MyProfilePage() {
  const [listToShow, setListToShow] = useState(null); // 어떤 리스트를 보여줄지 결정하는 상태입니다.
  const [activeButton, setActiveButton] = useState(null); // 활성화된 버튼 상태 관리

  const handleShowFollowers = () => {
    setListToShow('followers');
    setActiveButton('followers'); // 팔로워 버튼 활성화 상태로 설정
  };

  const handleShowFollowings = () => {
    setListToShow('followings');
    setActiveButton('followings'); // 팔로잉 버튼 활성화 상태로 설정
  };

  let content;
  if (listToShow === 'followers') {
    content = <FollowerList />;
  } else if (listToShow === 'followings') {
    content = <FollowingList />;
  } else {
    content = <Feed />;
  }

  return (
    <>
      <Topbar centerEl='내 프로필' />
      <MyProfile
        onShowFollowers={handleShowFollowers}
        onShowFollowings={handleShowFollowings}
        activeButton={activeButton}
      />
      {content}
    </>
  );
}
