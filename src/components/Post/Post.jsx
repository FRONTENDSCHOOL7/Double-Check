/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import showMore from '../../assets/images/icon/show-more-y.svg';
import { Link } from 'react-router-dom';
import ImageCheck from 'components/Common/ImageCheck';
import useTimeSince from 'Hooks/useTimeSince';
import heart from '../../assets/images/icon/icon-heart.svg';
import fillheart from '../../assets/images/icon/icon-fill-heart.svg';
import comment from '../../assets/images/icon/icon-comment.svg';
import ModalButton from 'components/Common/Modal/ModalButton';
import Modal from 'components/Common/Modal/Modal';
import { useRecoilState } from 'recoil';
import { itemIdState } from 'Recoil/PhraseId';
import { showToast } from 'Hooks/useCustomToast';
import { reportPost } from '../../API/post1';
import { setProfile } from 'API/Profile';
import accountname from '../../Recoil/Accountname';
import { useRecoilValue } from 'recoil';
import { likedState } from '../../Recoil/like';
import LikeButton from 'components/Common/Button/likeButton';
export default function Post({ post, color }) {
  const timeSincePosted = useTimeSince(post.createdAt);
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const { title, author, review, isbn } = post.parsedContent || {};
  const [currentItemId, setCurrentItemId] = useRecoilState(itemIdState);
  const userId = localStorage.getItem('userId');

  const [likedPosts, setLikedPosts] = useRecoilState(likedState);
  // console.log(likedPosts);
  // console.log(post.heartCount);

  const handleShowMoreClick = () => {
    if (post.author._id === userId) {
      setShowEditDeleteModal(true);
      setCurrentItemId(post._id);
    } else {
      setShowReportModal(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowReportModal(false);
  };

  const confirmReport = () => {
    setCurrentItemId(post._id);
    setShowReportModal(false);
    setShowModal(true);
    setShowEditDeleteModal(false);
  };

  const handleReport = async () => {
    setShowModal(false);
    try {
      const response = await reportPost({ postId: currentItemId });
      showToast('해당 게시글이 신고되었습니다.');
      console.log(response);
    } catch (error) {
      showToast('게시글 신고에 실패했습니다. ');
    }
  };

  return (
    <SPostArticle>
      <SPostHeader>
        <SProfileImg src={ImageCheck(post.author.image, 'profile')} alt='유저 프로필 사진' />

        <SLink to={`/profile/${post.author.accountname}`}>
          <SPostSpan>{post.author.username}</SPostSpan>
          <SPostSpan className='accountname'>{post.author.accountname}</SPostSpan>
        </SLink>
        <SShowMore onClick={handleShowMoreClick}>
          <img src={showMore} alt='더보기 버튼' />
        </SShowMore>
      </SPostHeader>
      <SPostSection>
        {/* <h2>{contentJson.title}</h2>
                  <span>{contentJson.author}</span> */}
        <Link to={`/post/${post._id}`} state={isbn}>
          <SImgWrapper color={color}>
            <SPostImg src={post.image} alt='책 표지 이미지' />
          </SImgWrapper>
          <SPostText>{review}</SPostText>
        </Link>
      </SPostSection>
      <SPostFooter>
        <SButtonGroup>
          <SPostbutton>
            <LikeButton
              postId={post._id}
              liked={likedPosts[post._id]}
              heartCount={post.heartCount}
            ></LikeButton>
          </SPostbutton>
          <SPostbutton>
            <img src={comment} alt='댓글 버튼' />
          </SPostbutton>
        </SButtonGroup>
        <SPostSpan>{timeSincePosted}</SPostSpan>
      </SPostFooter>
      {showEditDeleteModal && (
        <ModalButton
          itemId={currentItemId}
          text={['리뷰 수정', '리뷰 삭제']}
          onCancel={handleCancel}
        />
      )}
      {showReportModal && (
        <ModalButton
          itemId={currentItemId}
          text={['신고하기']}
          onClick={[confirmReport]}
          onCancel={handleCancel}
        />
      )}
      {showModal && ( // 수정된 모달 상태 체크
        <Modal
          content={'해당 리뷰를 신고하시겠습니까?'}
          btnTxt='예'
          isVisible={showModal}
          onConfirm={() => handleReport({ postId: currentItemId })}
          onCancel={() => setShowModal(false)}
        />
      )}
    </SPostArticle>
  );
}

const SPostArticle = styled.article`
  margin-bottom: 59px;

  &:first-of-type {
    margin-top: 26px;
  }
`;

const SPostHeader = styled.header`
  padding: 0 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--gray-500);

  & > span:first-of-type {
    font-family: 'Pretendard-SemiBold';
    color: var(--black);
  }
  .accountname {
    font-size: var(--font-xxs-size);
  }
`;

const SPostSection = styled.section`
  margin: 12px 0 16px;
  position: relative;
  gap: 41px;
`;

const SPostText = styled.p`
  margin: 33px 0 12px;
  font-family: 'Pretendard-regular', sans-serif;
  padding: 0 21px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SPostImg = styled.img`
  max-width: 100%;
  max-height: 93%;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 12%);
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
`;

const SProfileImg = styled.img`
  /* width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  border: 1px solid var(--gray-300); */
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  object-fit: cover;
`;

const SPostSpan = styled.span``;

const SPostFooter = styled.footer`
  padding: 12px 21px;
  display: flex;
  justify-content: space-between;
  color: var(--gray-400);
  font-family: 'Pretendard-regular', sans-serif;
  border-top: 1px solid var(--gray-200);
`;

const SButtonGroup = styled.div``;

const SPostbutton = styled.button`
  margin-right: 10px;

  img {
    margin-right: 4px;
  }
  span {
    color: var(--gray-500);
  }
`;

const SShowMore = styled.button`
  margin-left: auto;
  padding: 0 10px;
`;

const SImgWrapper = styled.div`
  position: relative;
  border-radius: 4px;
  height: 267px;
  background: ${(props) =>
    Array.isArray(props.color)
      ? `linear-gradient(${props.color[0]}, ${props.color[1]})`
      : props.color};
`;
