/* eslint-disable no-unused-vars */
import React from 'react';
import { useDeleteComment, useReportComment } from 'API/Comment';
import showMore from '../../assets/images/icon/show-more-x.svg';
import ImageCheck from 'components/Common/ImageCheck';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useTimeSince from 'Hooks/useTimeSince';
import { useRecoilState } from 'recoil';
import { commentTextState } from 'Recoil/CommentText';
import { showToast } from 'Hooks/useCustomToast';

export default function CommentItem({ comment, postId }) {
  const [commentText, setCommentText] = useRecoilState(commentTextState);
  const timeSince = useTimeSince(comment.createdAt);

  const { deleteCommentMutate } = useDeleteComment(postId);
  const { reportCommentMutate, isLoading, isError } = useReportComment(postId);

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    deleteCommentMutate({ postId, commentId });
    showToast('댓글이 삭제되었습니다.');
    setCommentText(''); // 댓글 삭제 후에 textarea를 비우기 위해 상태 업뎃!!
  };

  const handleReportComment = (commentId) => {
    showToast('댓글이 신고되었습니다.');
    reportCommentMutate(commentId, { postId });
  };

  return (
    <SCommentList key={comment.id}>
      <SCommentItem>
        <SCommentHeader>
          <SProfileImg src={ImageCheck(comment.author.image, 'profile')} alt='유저 프로필 사진' />
          <SLink to={`/profile/${comment.author.username}`}>
            <SCommentH4>{comment.author.username}</SCommentH4>
          </SLink>
          <STime>{timeSince}</STime>
          <SCommentIcon src={showMore} alt='프로필 더보기 아이콘' />
          <button onClick={() => handleDeleteComment(comment.id)}>-</button>
          <button onClick={() => handleReportComment(comment.id)}>-</button>
        </SCommentHeader>
        <SCommentWrap>
          <SCommentContent>{comment.content}</SCommentContent>
        </SCommentWrap>
      </SCommentItem>
    </SCommentList>
  );
}

const SCommentList = styled.li`
  padding: 16px;
  border-top: 1px solid var(--gray-300);
`;
const SCommentItem = styled.article`
  display: flex;
  flex-direction: column;
`;
const SCommentHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SLink = styled(Link)``;
const SProfileImg = styled.img`
  height: 41px;
  border-radius: 50%;
  width: 41px;
`;
const SCommentH4 = styled.h4``;
const SCommentIcon = styled.img``;
const SCommentWrap = styled.section``;
const SCommentContent = styled.p`
  font-family: 'Pretendard-regular', sans-serif;
  margin: 8px 0;
`;
const STime = styled.span`
  flex: 1;
  font-family: 'Pretendard-regular', sans-serif;
  font-size: var(--font-xxs-size);
  color: var(--gray-400);
`;
