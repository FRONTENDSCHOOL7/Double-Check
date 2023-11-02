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
import useCustomToast from 'Hooks/useCustomToast';
import { modalState } from 'Recoil/Modal';

export default function Post({ post, color }) {
  const timeSincePosted = useTimeSince(post.createdAt);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentItemId, setCurrentItemId] = useRecoilState(itemIdState);
  const { title, author, review } = post.parsedContent || {};

  const userId = localStorage.getItem('userId');
  const [modal, setModal] = useRecoilState(modalState);
  const showToast = useCustomToast();

  const handleCancel = () => {
    setModal((prev) => ({ ...prev, isModalVisible: false }));
  };

  const confirmReport = () => {
    setModal((prev) => ({ ...prev, showModal: true }));
  };

  const handleReport = () => {
    setModal({
      isModalVisible: false,
      showModal: false,
      showReportModal: false,
      currentItemId: null,
    });
    showToast('해당 리뷰가 신고되었습니다.');
  };

  const handleShowMoreClick = () => {
    if (post.author._id === userId) {
      // 사용자의 게시물인 경우
      setModal((prev) => ({
        ...prev,
        isModalVisible: !prev.isModalVisible,
        currentItemId: post._id,
      }));
    } else {
      // 다른 사용자의 게시물인 경우
      setModal((prev) => ({
        ...prev,
        showReportModal: !prev.showReportModal,
        currentItemId: post._id,
      }));
    }
  };

  return (
    <SPostArticle>
      <SPostHeader>
        <SProfileImg src={ImageCheck(post.author.image, 'profile')} alt='유저 프로필 사진' />
        <SLink to={`/profile/${post.author.accountname}`}>
          <SPostSpan>{post.author.username}</SPostSpan>
          <SPostSpan>{post.author.accountname}</SPostSpan>
        </SLink>
        <SShowMore onClick={handleShowMoreClick}>
          <img src={showMore} alt='더보기 버튼' />
        </SShowMore>
      </SPostHeader>
      <SPostSection>
        {/* <h2>{contentJson.title}</h2>
                  <span>{contentJson.author}</span> */}
        <Link to={`/post/${post._id}`}>
          <SImgWrapper color={color}>
            <SPostImg src={post.image} alt='책 표지 이미지' />
          </SImgWrapper>
          <SPostText>{review}</SPostText>
        </Link>
      </SPostSection>
      <SPostFooter>
        <SButtonGroup>
          <SPostbutton>
            <img src={heart} alt='좋아요 버튼' />
          </SPostbutton>
          <SPostbutton>
            <img src={comment} alt='댓글 버튼' />
          </SPostbutton>
        </SButtonGroup>
        <SPostSpan>{timeSincePosted}</SPostSpan>
      </SPostFooter>
      {modal.isModalVisible && (
        <ModalButton
          itemId={modal.currentItemId}
          text={['리뷰 수정', '리뷰 삭제']}
          // onClick={[handleEdit, confirmDelete]}
          onCancel={handleCancel}
        />
      )}
      {modal.showReportModal && (
        <ModalButton
          itemId={modal.currentItemId}
          text={['신고하기']}
          onClick={[confirmReport]}
          onCancel={() => setModal((prev) => ({ ...prev, showReportModal: false }))}
        />
      )}
      <Modal
        content={'해당 리뷰를 신고하시겠습니까?'}
        btnTxt='예'
        isVisible={modal.showModal}
        onConfirm={handleReport}
        onCancel={() => setModal((prev) => ({ ...prev, showModal: false }))}
      />
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
  gap: 3px;
  color: var(--gray-500);

  & > span:first-of-type {
    font-family: 'Pretendard-SemiBold';
    color: var(--black);
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
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
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
