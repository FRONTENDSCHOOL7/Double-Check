/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImageCheck from 'components/Common/ImageCheck';
import showMore from '../../assets/images/icon/show-more-y.svg';
import comment from '../../assets/images/icon/icon-comment.svg';
import ModalButton from 'components/Common/Modal/ModalButton';
import LikeButton from 'components/Common/Button/likeButton';
import Modal from 'components/Common/Modal/Modal';
import { postDeleteAPI, reportPost } from 'API/Post';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { likedState } from '../../Recoil/like';
import { commentCount } from 'Recoil/CommnetCount';
import userInfoState from 'Recoil/UserInfo';
import { showToast } from 'Hooks/useCustomToast';

export default function PostDetail({
  authorInfo,
  postDetails,
  postInfo,
  postid,
  heartCount,
  hearted,
  isbn,
}) {
  const [dateData, setDateData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [ItemId, setItemId] = useState(null);
  const userInfo = useRecoilState(userInfoState);
  const navigate = useNavigate();
  const { post_id } = useParams();
  const likedPosts = useRecoilValue(likedState);
  const counts = useRecoilValue(commentCount);
  const currentCount = counts[post_id] || 0;

  const setCommentCounts = useSetRecoilState(commentCount);

  // 댓글 추가 시 댓글 수 상태 업데이트
  useEffect(() => {
    setCommentCounts((prevCounts) => ({
      ...prevCounts,
      [post_id]: postInfo.commentCount,
    }));
  }, [postInfo.commentCount, setCommentCounts]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  // 내 계정이름
  const accountname = userInfo && userInfo[0] ? userInfo[0].accountname : '';

  useEffect(() => {
    setDateData(postInfo.createdAt);
  }, [postInfo.createdAt]);

  const year = new Date(dateData).getFullYear();
  const month = new Date(dateData).getMonth() + 1;
  const day = new Date(dateData).getDate();

  // 책 제목 ()있으면 잘라냄
  let postDetailstitle = postDetails.title || ''; // 기본값으로 빈 문자열을 사용
  postDetailstitle = postDetailstitle.replace(/\([^)]*\)/g, '');

  // 책 저자 ^ 를 쉼표로 바꿈
  let postDetailsauthor = '';

  if (postDetails && typeof postDetails.author === 'string') {
    postDetailsauthor = postDetails.author.replace(/\^/g, ',');
  }

  const navigateToEditPage = () => {
    navigate(`/post/${post_id}/edit`);
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
    setIsModalOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeletePost = async () => {
    try {
      await postDeleteAPI(post_id);
      showToast('해당 피드가 삭제되었습니다.');
      navigate(`/post`);
    } catch (error) {
      showToast('피드 삭제에 실패했습니다. ');
    }
  };

  // 게시물 신고 api
  const handleReport = async () => {
    setShowReportModal(false);
    try {
      const res = await reportPost({ postId: ItemId });
      showToast('해당 피드가 신고되었습니다.');
      console.log(res);
    } catch (error) {
      showToast('피드 신고에 실패했습니다. ');
    }
  };
  const handleShowMoreClick = () => {
    // 로그인된 계정이름과 포스트 계정이름을 비교함
    if (accountname === authorInfo.accountname) {
      setIsModalOpen(true);
    } else {
      setItemId(post_id); // 현재 id 설정
      setShowReportModal(true);
    }
  };

  return (
    <SMainPostDetail>
      <SPostarticle>
        <Link to={`/profile/${authorInfo.accountname}`}>
          <SProfileImg src={ImageCheck(authorInfo.image, 'profile')} alt='유저 프로필 사진' />
        </Link>
        <div>
          <SPostHeader>
            <SLink to={`/profile/${authorInfo.accountname}`}>
              <span>{authorInfo.username}</span>
              <span>{authorInfo.accountname}</span>
            </SLink>
            <SShowMore onClick={handleShowMoreClick}>
              <img src={showMore} alt='더보기 버튼' />
            </SShowMore>
          </SPostHeader>
          <SPostSection>
            <pre>{postDetails.review}</pre>
            {/* 책 페이지로 이동  */}
            <SBookImgLink to={`/book/${isbn}`}>
              <SPostImg src={postDetails.image} alt='책 표지 이미지' />
              <div>
                <span>{postDetailstitle}</span>
                <p>{postDetailsauthor}</p>
              </div>
            </SBookImgLink>
          </SPostSection>
          <SPostFooter>
            <SButtonGroup>
              <LikeButton postId={postid} liked={hearted} heartCount={heartCount}></LikeButton>
              <button>
                <img src={comment} alt='댓글 버튼' />
                <span>{currentCount}</span>
              </button>
            </SButtonGroup>
            <time dateTime={postInfo.createdAt}>
              {year}년 {month}월 {day}일
            </time>
          </SPostFooter>
        </div>
      </SPostarticle>

      <Modal
        content='해당 피드를 삭제하시겠습니까?'
        btnTxt='예'
        isVisible={showDeleteModal}
        onConfirm={handleDeletePost}
        onCancel={handleCloseDeleteModal}
      />

      {isModalOpen && (
        <ModalButton
          itemId={postid}
          text={['수정', '삭제']}
          onClick={[navigateToEditPage, handleOpenDeleteModal]}
          onCancel={() => setIsModalOpen(false)}
        />
      )}

      {showReportModal && (
        <Modal
          content={'해당 피드를 신고하시겠습니까?'}
          btnTxt='예'
          isVisible={showReportModal}
          onConfirm={handleReport}
          onCancel={() => setShowReportModal(false)}
        />
      )}
    </SMainPostDetail>
  );
}
const SMainPostDetail = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`;
const SPostarticle = styled.article`
  display: flex;
  gap: 10px;
  padding: 15px 19px;
  position: relative;
  border-bottom: 1px solid var(--gray-200);
`;

const SPostHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const SProfileImg = styled.img`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: 1px solid var(--gray-300);
  aspect-ratio: 1 / 1;
  flex-shrink: 0;
  object-fit: cover;
`;
const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: var(--gray-500);

  & > span:nth-of-type(1) {
    font-family: 'Pretendard-SemiBold';
    color: var(--black);
  }
  & > span:nth-of-type(2) {
    font-size: var(--font-xxs-size);
  }
`;
/* const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--gray-500);
  margin-left: 10px;

  & span {
    font-size: var(--font-xs-size);
  }

  & > span:first-of-type {
    font-family: 'Pretendard-SemiBold';
    color: var(--black);
  }
`; */

const SPostSection = styled.section`
  margin: 12px 0 16px;
  gap: 41px;

  pre {
    margin: 16px 4px;
    font-size: var(--font-xs-size);
    line-height: 1.3;
    position: relative;
    word-break: break-all;
    white-space: pre-wrap;
    font-family: 'Pretendard-regular', sans-serif;
  }
`;

const SBookImgLink = styled(Link)`
  border-radius: 5px;
  background-color: var(--light-blue);
  padding: 20px;
  display: flex;
  font-size: var(--font-xxs-size);

  div {
    display: flex;
    flex-direction: column;
    margin-left: 13px;
    margin-top: 10px;
  }

  span {
    line-height: 1.3;
  }

  p {
    margin-top: 10px;
    color: var(--gray-500);
  }
`;

const SPostImg = styled.img`
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  display: block;
  width: 40%;
  object-fit: contain;
`;

const SPostFooter = styled.footer`
  justify-content: space-between;
  font-family: 'Pretendard-regular', sans-serif;
  color: var(--gray-400);
  time {
    font-size: var(--font-xxs-size);
  }
`;

const SButtonGroup = styled.div`
  gap: 15px;
  display: flex;
  margin-bottom: 10px;
  box-sizing: border-box;
  align-items: center;
  button {
    display: flex;
    gap: 6px;
    -webkit-box-align: center;
    align-items: center;
    font-size: var(--font-xs-size);
    color: var(--gray-500);
  }
`;

const SShowMore = styled.button`
  margin-left: auto;
  padding: 0 10px;
`;
