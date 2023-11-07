/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import showMore from '../../assets/images/icon/show-more-y.svg';
import { Link } from 'react-router-dom';
import ImageCheck from 'components/Common/ImageCheck';
import useTimeSince from 'Hooks/useTimeSince';
import comment from '../../assets/images/icon/icon-comment.svg';
import ModalButton from 'components/Common/Modal/ModalButton';
import Modal from 'components/Common/Modal/Modal';
import { useRecoilState } from 'recoil';
import { itemIdState } from 'Recoil/PhraseId';
import { showToast } from 'Hooks/useCustomToast';
import { useNavigate } from 'react-router-dom';
// import { setProfile } from 'API/Profile';
// import accountname from '../../Recoil/Accountname';
import { useRecoilValue } from 'recoil';
import { likedState } from '../../Recoil/like';
import LikeButton from 'components/Common/Button/likeButton';
import { commentCount } from 'Recoil/CommnetCount';
import { postDeleteAPI, useDeletePost, reportPost } from 'API/Post';
import { postDetailsState } from 'Recoil/PostDetail';
import userInfoState from 'Recoil/UserInfo';

export default function PostItem({ post, color, id }) {
  console.log(post.id);
  console.log(id);
  const timeSincePosted = useTimeSince(post.createdAt);
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { title, author, review, isbn } = post.parsedContent || {};
  const [currentItemId, setCurrentItemId] = useRecoilState(itemIdState);
  const userInfo = useRecoilState(userInfoState);
  const userId = localStorage.getItem('userId');
  const commentCounts = useRecoilValue(commentCount);
  const [likedPosts, setLikedPosts] = useRecoilState(likedState);
  const navigate = useNavigate();
  // console.log(likedPosts);
  // console.log(post.heartCount);
  const [postDetails, setPostDetails] = useRecoilState(postDetailsState);

  const accountname = userInfo[0].accountname;

  const handleShowMoreClick = () => {
    if (post.author.accountname === accountname) {
      setShowEditDeleteModal(true);
      setCurrentItemId(id);
    } else {
      setShowReportModal(true);
    }
  };

  const navigateToEditPage = () => {
    if (post && id) {
      const { title, author, review, isbn } = post.parsedContent || post;
      setPostDetails((currentDetails) => ({
        ...currentDetails,
        title,
        author: author?.name || author,
        review,
        isbn,
      }));

      navigate(`/post/${id}/edit`);
    } else {
      showToast('게시글 정보를 불러올 수 없습니다.');
    }
  };

  const confirmDeleteReport = async () => {
    setShowEditDeleteModal(false);
    setShowDeleteModal(true);
  };

  const { deletePostMutate } = useDeletePost(id);

  const handleDelete = () => {
    deletePostMutate(id);
    setShowDeleteModal(false);
  };

  // const confirmDelete = async () => {
  //   try {
  //     await postDeleteAPI(currentItemId);
  //     showToast('피드가 삭제되었습니다.');
  //     setShowDeleteModal(false);
  //     navigate('/post');
  //   } catch (error) {
  //     showToast('피드 삭제에 실패했습니다.');
  //     setShowDeleteModal(false);
  //   }
  // };

  const handleCancel = () => {
    setShowModal(false);
    setShowReportModal(false);
    setShowDeleteModal(false);
  };

  const confirmReport = () => {
    setCurrentItemId(id);
    setShowReportModal(false);
    setShowModal(true);
    setShowEditDeleteModal(false);
  };

  const handleReport = async () => {
    setShowModal(false);
    try {
      const response = await reportPost({ postId: currentItemId });
      showToast('해당 피드가 신고되었습니다.');
      console.log(response);
    } catch (error) {
      showToast('피드 신고에 실패했습니다. ');
    }
  };
  // 65486b5eb2cb2056630b8d8a
  console.log(post);
  console.log(id); // post id
  console.log(post.id);
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
        <Link to={`/post/${id}`}>
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
              postId={id}
              liked={likedPosts[id]}
              heartCount={post.heartCount}
            ></LikeButton>
          </SPostbutton>
          <Link to={`/post/${id}`}>
            <SPostbutton>
              <img src={comment} alt='댓글 버튼' />
              <span>{commentCounts[id] || 0}</span>
            </SPostbutton>
          </Link>
        </SButtonGroup>
        <STime>{timeSincePosted}</STime>
      </SPostFooter>

      {showEditDeleteModal && (
        <ModalButton
          itemId={currentItemId}
          text={['피드 수정', '피드 삭제']}
          onClick={[navigateToEditPage, confirmDeleteReport]}
          onCancel={() => setShowEditDeleteModal(false)}
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
          content={'해당 피드를 신고하시겠습니까?'}
          btnTxt='예'
          isVisible={showModal}
          onConfirm={() => handleReport({ postId: currentItemId })}
          onCancel={() => setShowModal(false)}
        />
      )}
      {showDeleteModal && (
        <Modal
          content={'해당 피드를 삭제하시겠습니까?'}
          btnTxt='예'
          isVisible={showDeleteModal}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </SPostArticle>
  );
}

const SPostArticle = styled.article`
  margin-bottom: 36px;

  &:first-of-type {
    margin-top: 17px;
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
  margin-top: 25px;
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
  object-fit: fill;
`;

const SPostSpan = styled.span``;

const SPostFooter = styled.footer`
  padding: 8px 21px;
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
  height: 261px;
  background: ${(props) =>
    Array.isArray(props.color)
      ? `linear-gradient(${props.color[0]}, ${props.color[1]})`
      : props.color};
`;

const STime = styled.time`
  font-size: var(--font-xxs-size);
`;
