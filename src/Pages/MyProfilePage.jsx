import Topbar from 'components/Common/TopBar';
import MyProfile from 'components/MyProfile/MyProfile';
import React from 'react';

export default function MyProfilePage() {
  return (
    <>
      <Topbar centerEl='내 프로필' />
      <MyProfile />
    </>
  );
}
