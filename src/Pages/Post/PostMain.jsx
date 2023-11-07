import React, { useState } from 'react';
import { useInfinitePosts, useGetInfiniteFollowingPosts } from 'API/Post';
import styled from 'styled-components';
import Post from 'components/Post/PostItem';
import Topbar from 'components/Common/Topbar/Topbar';
// import { useNavigate } from 'react-router-dom';
import PostGallery from 'components/Post/PostGallery';
import galleryIcon from '../../assets/images/icon/icon-gallery.svg';
import feeddIcon from '../../assets/images/icon/icon-feed.svg';
import PostSkeleton from 'assets/Skeleton/PostSkeleton';
const colors = [
  ['#FFE7FF', '#E3EEFF'],
  '#F2F4FF',
  '#ccf0ff',
  ['#F1E4F1', '#F9F0DC'],
  '#f4f4f4',
  '#fff0f0',
  ['#DDF6FA', '#F9F0DC'],
  '#f9f0ff',
  ['#E3FDF5', '#FFE6FA'],
  '#f0f8ff',
  ['#ffecd2', '#fcb69f'],
  ['#fdfbfb', '#ebedee'],
  ['#e9defa', '#fbfcdb'],
];

export default function PostMain() {
  const { allPosts, isLoadingPosts } = useInfinitePosts();

  const [view, setView] = useState('feed');
  // const navigate = useNavigate();

  const { allFollowingPosts, isLoadingFollowingPosts } = useGetInfiniteFollowingPosts();
  console.log(allFollowingPosts);

  if (isLoadingPosts || isLoadingFollowingPosts) {
    return <PostSkeleton />;
  }

  const validPosts = allPosts.filter((post) => {
    if (typeof post.content !== 'string') {
      return false;
    }

    try {
      // JSON.parse()를 사용하여 post.content를 객체로 변환
      post.parsedContent = JSON.parse(post.content);
      return post.parsedContent.review;
    } catch (error) {
      return false;
    }
  });
  // const navigateToHomePage = () => {
  //   navigate('/');
  // };

  const toggleView = () => {
    setView((currentView) => (currentView === 'feed' ? 'gallery' : 'feed'));
  };

  return (
    <div>
      <Topbar
        // leftButton={<TopBarBtn icon={HamSideNoLogin} />}
        title='전체 피드'
        rightButton={
          <button onClick={toggleView}>
            {view === 'feed' ? (
              <StyledImage src={galleryIcon} alt='갤러리 뷰' />
            ) : (
              <StyledImage src={feeddIcon} alt='피드 뷰' />
            )}
          </button>
        }
      />

      {view === 'feed' ? (
        validPosts.map((post, index) => {
          const colorIndex = index % colors.length;
          const color = colors[colorIndex];
          return <Post key={post._id} post={post} color={color} />;
        })
      ) : (
        <PostGallery posts={validPosts} />
      )}
    </div>
  );
}

const StyledImage = styled.img`
  width: 25px;
  height: auto;
`;
