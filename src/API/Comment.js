/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authInstance } from './Instance';
import { toast } from 'react-toastify';
import useCustomToast from 'Hooks/useCustomToast';
import { showToast, successToast } from 'Hooks/useCustomToast';

// 댓글 등록
const uploadComment = async (postId, commentData) => {
  try {
    const response = await authInstance.post(`/post/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('댓글 등록 에러: ', error);
    throw error; // 에러를 throw 하여 useMutation에서 에러 처리
  }
};

const getComments = async ({ postId, pageParam = 0 }) => {
  const skip = pageParam * 10;
  try {
    const response = await authInstance.get(`/post/${postId}/comments/?limit=10&skip=${skip}`);
    return response.data;
  } catch (error) {
    console.error('댓글 전체 보기: ', error);
    throw error;
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const response = await authInstance.delete(`/post/${postId}/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 오류: ', error);
    throw error;
  }
};

export const reportComment = async (postId, commentId) => {
  const response = await authInstance.post(`/post/${postId}/comments/${commentId}/report`);
  return response.data;
};

export const useUploadComment = (postId, { onSuccessExtra }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: uploadCommentMutate } = useMutation(
    (commentData) => uploadComment(postId, commentData),
    {
      onSuccess: () => {
        showToast('댓글이 등록되었습니다.');

        if (onSuccessExtra) onSuccessExtra();
        queryClient.invalidateQueries({ queryKey: ['comments', postId], refetchActive: true });
      },
    },
  );

  return { uploadCommentMutate };
};

export const useInfiniteComments = (postId) => {
  const [allComments, setAllComments] = useState([]);
  const {
    data: comments,
    fetchNextPage: fetchNextComments,
    hasNextPage: hasNextComments,
  } = useInfiniteQuery({
    queryKey: ['comments', postId], // queryKey에 postId를 포함시켜 각 포스트마다 다른 쿼리 결과 캐시
    queryFn: ({ pageParam }) => getComments({ postId, pageParam }),
    onSuccess: (newData) => {
      setAllComments(newData.pages.map((page) => page.comments));
    },
  });

  return { comments, allComments, fetchNextComments, hasNextComments };
};

export const useDeleteComment = (postId, { onSuccessExtra }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCommentMutate } = useMutation(
    ({ postId, commentId }) => deleteComment(postId, commentId),
    {
      onSuccess: () => {
        showToast('댓글이 삭제되었습니다.');
        if (onSuccessExtra) onSuccessExtra();
        queryClient.invalidateQueries(['comments', postId]);
      },
    },
  );
  return { deleteCommentMutate };
};

export const useReportComment = (postId) => {
  const queryClient = useQueryClient();

  const {
    mutate: reportCommentMutate,
    isLoading,
    isError,
  } = useMutation((commentId) => reportComment(postId, commentId), {
    onSuccess: () => {
      showToast('댓글이 신고되었습니다.');
      queryClient.invalidateQueries(['comments', postId]);
    },
    onError: () => {
      showToast('댓글 신고에 실패했습니다.');
    },
  });

  return {
    reportCommentMutate,
    isLoading,
    isError,
  };
};
