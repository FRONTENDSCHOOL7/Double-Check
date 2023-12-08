import React, { useState, useEffect } from 'react';
import { useInfinitePosts, useGetInfiniteFollowingPosts } from 'API/Post';
import styled from 'styled-components';
import PostItem from 'components/Post/PostItem';
import Topbar from 'components/Common/Topbar/Topbar';
import PostGallery from 'components/Post/PostGallery';
import galleryIcon from '../../assets/images/icon/icon-gallery.svg';
import feeddIcon from '../../assets/images/icon/icon-feed.svg';
import PostSkeleton from 'assets/Skeleton/PostSkeleton';
import { useRecoilValue } from 'recoil';
import { calculatedColorState } from 'Recoil/PostColor';

export default function PostMain() {
  const { allPosts, isLoadingPosts } = useInfinitePosts();
  const [view, setView] = useState('feed');
  const { isLoadingFollowingPosts } = useGetInfiniteFollowingPosts();
  const getCalculatedColor = useRecoilValue(calculatedColorState);
  const [validPosts, setValidPosts] = useState([]);

  useEffect(() => {
    if (!isLoadingPosts) {
      const filteredPosts = allPosts.filter((post) => {
        if (typeof post.content !== 'string') {
          return false;
        }
        try {
          post.parsedContent = JSON.parse(post.content);
          return post.parsedContent.review;
        } catch (error) {
          return false;
        }
      });
      setValidPosts(filteredPosts);
    }
  }, [allPosts, isLoadingPosts]);

  if (isLoadingPosts || isLoadingFollowingPosts) {
    return <PostSkeleton />;
  }

  const toggleView = () => {
    setView((currentView) => (currentView === 'feed' ? 'gallery' : 'feed'));
  };

  return (
    <div>
      <Topbar
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
          return (
            <PostItem key={post._id} post={post} color={getCalculatedColor(index)} id={post._id} />
          );
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
