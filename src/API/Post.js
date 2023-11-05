import { useMutation, useQueryClient } from 'react-query';
import { authInstance } from './Instance';
import { showToast } from 'Hooks/useCustomToast';

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
