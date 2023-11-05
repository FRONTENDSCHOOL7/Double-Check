/* eslint-disable no-unused-vars */
import React from 'react';
import { useInfiniteComments, useDeleteComment, useReportComment } from 'API/Comment';
import { useRecoilState } from 'recoil';
import { commentTextState } from 'Recoil/CommentText';
import styled from 'styled-components';
import CommentItem from './CommentItem';

export default function Comments({ postId }) {
  // 댓글 전체 보기
  const { allComments } = useInfiniteComments(postId);
  const comments = allComments.flat();

  return (
    <SCommentContainer>
      <SCommentH3>댓글</SCommentH3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} postId={postId} />
      ))}
    </SCommentContainer>
  );
}

const SCommentContainer = styled.ul`
  padding-top: 13px;
`;
const SCommentH3 = styled.h3`
  font-family: 'Pretendard-semiBold', sans-serif;
  font-size: var(--font-sm-size);
  margin: 0 0 10px 13px;
`;
