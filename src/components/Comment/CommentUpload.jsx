/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useUploadComment } from '../../API/Comment';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { commentTextState } from 'Recoil/CommentText';
import StyledTextarea from 'components/Common/Textarea/TextareaStyle';
import styled from 'styled-components';
import { StyledButton } from 'components/Common/Button/ButtonStyle';
import { showToast } from 'Hooks/useCustomToast';
import { commentCount } from 'Recoil/CommnetCount';

export default function CommentUpload({ postId }) {
  const [commentText, setCommentText] = useRecoilState(commentTextState);
  const setCommentCount = useSetRecoilState(commentCount);

  const { uploadCommentMutate } = useUploadComment(postId, {
    onSuccessExtra: () => {
      setCommentText('');
      setCommentCount((prevCounts) => {
        // postId에 해당하는 댓글 수를 1 증가
        const newCounts = {
          ...prevCounts,
          [postId]: (prevCounts[postId] || 0) + 1,
        };
        return newCounts;
      });
    },
  });

  /* 모달 !!!!!!!!!!!!!!!!!
   *
   *
   */

  const handleCommentUpload = (event) => {
    event.preventDefault();
    if (!commentText.trim()) return;
    const commentData = {
      comment: {
        content: commentText,
      },
    };
    uploadCommentMutate(commentData);
  };

  return (
    <CommentForm onSubmit={handleCommentUpload}>
      <CommentTextarea
        placeholder='댓글을 입력해주세요.'
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      ></CommentTextarea>
      <CommentButton shape='none' type='submit'>
        등록
      </CommentButton>
    </CommentForm>
  );
}

const CommentForm = styled.form`
  padding: 10px 10px 19px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CommentTextarea = styled(StyledTextarea)`
  width: 100%;
  padding: 13px 20px;
  background-color: var(--gray-200);
  line-height: 1;
  border: none;
  border-radius: 32px;
  height: 41px;
  font-family: 'Pretendard-regular', sans-serif;
  font-size: var(--font-xs-size);
  &::placeholder {
    font-size: var(--font-xs-size);
    /* padding: 0 8px; */
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentButton = styled(StyledButton)`
  font-size: var(--font-xs-size);
  font-family: 'Pretendard-SemiBold', sans-serif;
  color: var(--gray-500);
`;
