/* eslint-disable no-unused-vars */
import { useInfiniteQuery } from 'react-query';
import { authInstance } from './Instance';
import { useState } from 'react';

const getPosts = async ({ pageParam = 0 }) => {
  const skip = pageParam * 200;
  const response = await authInstance.get(`/post?limit=200&skip=${skip}`);
  return response.data;
};

// export const useInfinitePosts = () => {
//   return useInfiniteQuery('posts', getPosts, {
//     getNextPageParam: (lastPage, pages) => {
//       return pages.length;
//     },
//   });
// };

export const useInfinitePosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const {
    data: posts,
    fetchNextPage: fetchNextPosts,
    hasNexPage: hasNextPosts,
  } = useInfiniteQuery({
    queryKey: 'posts',
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getPosts(pageParam);
      console.log(response.posts.flat());
      return response.posts;
    },
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      const morePagesExist = lastPage.totalCount > nextPage * 200;
      return morePagesExist ? nextPage : undefined;
    },
    onSuccess: (newData) => {
      console.log(newData);
      setAllPosts(newData.pages.flat());
    },
  });

  return { posts, allPosts, fetchNextPosts, hasNextPosts };
};
