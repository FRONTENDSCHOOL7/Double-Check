/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDeleteComment, useReportComment } from 'API/Comment';
import showMore from '../../assets/images/icon/show-more-x.svg';
import ImageCheck from 'components/Common/ImageCheck';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useTimeSince from 'Hooks/useTimeSince';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { commentTextState } from 'Recoil/CommentText';
import { showToast } from 'Hooks/useCustomToast';
import Modal from 'components/Common/Modal/Modal';
import { commentCount } from 'Recoil/CommnetCount';

const CommentItem = ({ comment, postId }) => {
  const [commentText, setCommentText] = useRecoilState(commentTextState);
  const [showModal, setShowModal] = useState(false);
  const timeSince = useTimeSince(comment.createdAt);
  const userId = localStorage.getItem('userId');
  const setCommentCount = useSetRecoilState(commentCount);

  const { deleteCommentMutate } = useDeleteComment(postId, {
    onSuccessExtra: () => {
      setCommentCount((prevCounts) => {
        // 현재 포스트의 댓글 수를 확인하고, 만약 없다면 0으로 시작
        const currentCount = prevCounts[postId] || 0;

        // 댓글 수를 하나 줄이되, 0 미만으로 내려가지 않도록 Math.max를 사용
        const newCount = Math.max(currentCount - 1, 0);
        const newCounts = {
          ...prevCounts,
          [postId]: newCount,
        };
        return newCounts;
      });
    },
  });
  const { reportCommentMutate } = useReportComment(postId);

  const handleDelete = (commentId) => {
    deleteCommentMutate({ postId, commentId });
    setShowModal(false);
    setCommentText('');
  };

  const handleReport = (commentId) => {
    reportCommentMutate(commentId, { postId });
    setShowModal(false);
  };

  const handleShowMoreClick = () => {
    console.log('Checking comment._id:', comment.author._id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <SCommentList>
        <SCommentItem>
          <SCommentHeader>
            <SProfileImg src={ImageCheck(comment.author.image, 'profile')} alt='유저 프로필 사진' />
            <SLink to={`/profile/${comment.author.username}`}>
              <SCommentH4>{comment.author.username}</SCommentH4>
            </SLink>
            <STime>{timeSince}</STime>
            <button onClick={handleShowMoreClick}>
              <SCommentIcon src={showMore} alt='프로필 더보기 아이콘' />
            </button>
          </SCommentHeader>
          <SCommentWrap>
            <SCommentContent>{comment.content}</SCommentContent>
          </SCommentWrap>
        </SCommentItem>
      </SCommentList>
      {showModal && (
        <Modal
          isVisible={showModal}
          onCancel={handleCloseModal}
          content={
            comment.author._id === userId
              ? '이 댓글을 삭제하시겠습니까?'
              : '이 댓글을 신고하시겠습니까?'
          }
          btnTxt={comment.author._id === userId ? '삭제' : '신고'}
          onConfirm={
            comment.author._id === userId
              ? () => {
                  console.log('Deleting comment with id:', comment.id);
                  handleDelete(comment.id);
                }
              : () => handleReport(comment.author._id)
          }
        />
      )}
    </>
  );
};

export default CommentItem;

const SCommentList = styled.li`
  padding: 16px 16px 0 16px;
  border-bottom: 1px solid var(--gray-200);
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
  margin: 0 22px 10px 49px;
  line-height: 1.2;
`;

const STime = styled.span`
  flex: 1;
  font-family: 'Pretendard-regular', sans-serif;
  font-size: var(--font-xxs-size);
  color: var(--gray-400);
`;
