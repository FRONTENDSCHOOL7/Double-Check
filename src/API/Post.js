/* eslint-disable no-unused-vars */
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { authInstance } from './Instance';
import { showToast } from 'Hooks/useCustomToast';
import { useState } from 'react';

//게시글 작성
export const postUploadAPI = async (postData) => {
  try {
    const response = await authInstance.post('/post', postData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//게시글 목록
export const postListAPI = async ({ accountname }) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await authInstance.get(`/post/${accountname}/userpost`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 수정
export const postPutAPI = async (id, putData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await authInstance.put(`/post/${id}`, putData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//게시글 수정 시에 불러오기
export const postGetUpdateAPI = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const reponse = await authInstance.get(`/post/${id}`);
    return reponse.data;
  } catch (error) {
    throw error;
  }
};

//게시글 삭제
export const postDeleteAPI = async (id, token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await authInstance.delete(`/post/${id}`, token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useDeletePost = (postId) => {
  const queryClient = useQueryClient();
  const { mutate: deletePostMutate } = useMutation(() => postDeleteAPI(postId), {
    onSuccess: () => {
      showToast('피드가 삭제되었습니다.');
      queryClient.invalidateQueries('posts');
    },
  });
  return { deletePostMutate };
};

const getPosts = async ({ pageParam = 0 }) => {
  const skip = pageParam * 200;
  const response = await authInstance.get(`/post?limit=200&skip=${skip}`);
  return response.data;
};

const getUserPosts = async ({ pageParam = 0 }, { accountname }) => {
  const skip = pageParam * 200;
  try {
    const response = await authInstance.get(
      `/post/${accountname}/userpost/?limit=200&skip=${skip}`,
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getFollowingPosts = async ({ pageParam = 0 }) => {
  const skip = pageParam * 200;
  const response = await authInstance.get(`/post/feed`);
  return response.data;
};

export const reportPost = async ({ postId }) => {
  const response = await authInstance.post(`/post/${postId}/report`);
  return response.data;
};

// 전체 게시글
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

// 유저별 게시글
//queryFn에 accountname을 전달하기 위해 클로저를 사용
export const useGetInfiniteUserPosts = (accountname) => {
  const [allUserPosts, setAllUserPosts] = useState([]);
  const {
    data: userposts,
    fetchNextPage: fetchNextUserPosts,
    hasNextPage: hasNextUserPosts,
  } = useInfiniteQuery({
    queryKey: ['userposts', accountname],
    queryFn: async ({ pageParam = 0 }) => {
      return await getUserPosts({ pageParam }, { accountname });
    },
    onSuccess: (newData) => {
      const posts = newData.pages.map((page) => page.post || []);
      setAllUserPosts(posts.flat());
    },
  });

  return { userposts, allUserPosts, fetchNextUserPosts, hasNextUserPosts };
};

// 팔로잉 게시글
export const useGetInfiniteFollowingPosts = () => {
  const [allFollowingPosts, setAllFollowingPosts] = useState([]);
  const {
    data: followingPosts,
    fetchNextPage: fetchNextPosts,
    hasNexPage: hasNextPosts,
  } = useInfiniteQuery({
    queryKey: 'followingPosts',
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getFollowingPosts(pageParam);
      console.log(response.posts.flat());
      return response.posts;
    },
    onSuccess: (newData) => {
      console.log(newData);
      setAllFollowingPosts(newData.pages.flat());
    },
  });

  return { followingPosts, allFollowingPosts, fetchNextPosts, hasNextPosts };
};
