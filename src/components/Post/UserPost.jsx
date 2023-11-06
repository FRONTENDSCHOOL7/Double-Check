/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useGetInfiniteUserPosts } from 'API/Post';
import PostItem from 'components/Post/PostItem';
import GalleryView from './PostGallery';
import Topbar from 'components/Common/Topbar/Topbar';
import styled from 'styled-components';
import galleryIcon from '../../assets/images/icon/icon-gallery.svg';
import feedIcon from '../../assets/images/icon/icon-feed.svg';
import { useRecoilState } from 'recoil';
import { viewState } from '../../Recoil/FeedView';

const colors = [
  ['#FFE7FF', '#E3EEFF'],
  '#F2F4FF',
  '#ccf0ff',
  ['#F1E4F1', '#F9F0DC'],
  '#f4f4f4',
  '#fff0f0',
  ['#DDF6FA', '#F9F0DC'],
  '#f9f0ff',
  '#f0f8ff',
];

export default function UserPost({ accountname }) {
  const { allUserPosts, isLoading } = useGetInfiniteUserPosts(accountname);
  console.log(allUserPosts);
  const [view, setView] = useRecoilState(viewState);

  const validUserPosts = allUserPosts.filter((post) => {
    try {
      post.parsedContent = JSON.parse(post.content);
      return post.parsedContent.review;
    } catch (error) {
      return false;
    }
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const toggleView = () => {
    setView((currentView) => (currentView === 'feed' ? 'gallery' : 'feed'));
  };

  return (
    <div>
      {view === 'feed' ? (
        validUserPosts.map((post, index) => {
          const colorIndex = index % colors.length;
          const color = colors[colorIndex];
          return <PostItem key={post._id} post={post} color={color} />;
        })
      ) : (
        <GalleryView posts={validUserPosts} />
      )}
    </div>
  );
}

const StyledImage = styled.img`
  width: 25px;
  height: auto;
`;
