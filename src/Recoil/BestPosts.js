import { useEffect, useCallback } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useInfinitePosts } from 'API/Post';

export const sortedPostsState = atom({
  key: 'sortedPostsState',
  default: [],
});

export const useSortedPosts = () => {
  const [sortedPosts, setSortedPosts] = useRecoilState(sortedPostsState);
  const { allPosts, isLoadingPosts } = useInfinitePosts();

  const filterAndSortPosts = useCallback(() => {
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

      const sorted = [...filteredPosts].sort((a, b) => b.heartCount - a.heartCount);
      setSortedPosts(sorted);
    }
  }, [allPosts, isLoadingPosts, setSortedPosts]);
  useEffect(() => {
    filterAndSortPosts();
  }, [filterAndSortPosts]);
  return sortedPosts;
};
