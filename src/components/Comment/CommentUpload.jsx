/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useUploadComment } from '../../API/Comment';
import { useRecoilState } from 'recoil';
import { commentTextState } from 'Recoil/CommentText';
import StyledTextarea from 'components/Common/Textarea/TextareaStyle';
import styled from 'styled-components';
import { StyledButton } from 'components/Common/Button/ButtonStyle';
import { showToast } from 'Hooks/useCustomToast';

export default function CommentUpload({ postId }) {
  const [commentText, setCommentText] = useRecoilState(commentTextState);
  console.log(postId);
  const { uploadCommentMutate } = useUploadComment(postId);

  /* 모달 !!!!!!!!!!!!!!!!!
   *
   *
   */

  const handleCommentUpload = (event) => {
    event.preventDefault();
    const commentData = {
      comment: {
        content: commentText,
      },
      onSuccess: () => {
        showToast('댓글이 등록되었습니다.');
        setCommentText('');
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
      <CommentButton category='basic' shape='none' type='submit'>
        등록
      </CommentButton>
    </CommentForm>
  );
}

const CommentForm = styled.form`
  padding: 0 10px;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CommentTextarea = styled(StyledTextarea)`
  width: 100%;
  padding: 10px;
  background-color: var(--gray-200);
  border: none;
  border-radius: 32px;
  height: 41px;
  font-family: 'Pretendard-regular', sans-serif;
  font-size: var(--font-xs-size);
  &::placeholder {
    font-size: var(--font-xs-size);
    padding: 0 7px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommentButton = styled(StyledButton)`
  border-radius: 11px;
  font-size: var(--font-xs-size);
`;
