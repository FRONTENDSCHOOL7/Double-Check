/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StyledTextarea from '../../components/Common/Textarea/TextareaStyle';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import styled from 'styled-components';
import Topbar from 'components/Common/Topbar/Topbar';
import { postPutAPI } from 'API/Post';
import { useRecoilState } from 'recoil';
import { postDetailsState } from '../../Recoil/PostDetail';
import { showToast } from 'Hooks/useCustomToast';

export default function PostEditPage() {
  const { post_id } = useParams();
  const navigate = useNavigate();
  const textareaRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [postDetails, setPostDetails] = useRecoilState(postDetailsState);
  const [review, setReview] = useState(postDetails.review);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (review && textareaRef.current) {
      const textLength = review.length;
      textareaRef.current.setSelectionRange(textLength, textLength);
      textareaRef.current.focus();
    }
  }, [review]);

  useEffect(() => {
    if (postDetails?.review) {
      setReview(postDetails.review);
    }
  }, [postDetails]);

  const confirmUpload = (e) => {
    e.preventDefault();
    console.log('confirmUpload 함수 실행');
    setShowModal(false);
    if (review === '' || review.length < 1) {
      setShowModal(false);
      return showToast('피드를 입력해주세요.');
    } else {
      setShowModal(true);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const res = await postPutAPI(post_id, {
        post: {
          content: JSON.stringify({
            title: postDetails.title,
            author: postDetails.author,
            isbn: postDetails.isbn,
            review: review,
          }),
          image: postDetails.image || postDetails.cover,
        },
      });

      setShowModal(false);
      showToast('해당 피드가 수정되었습니다.');
      navigate(`/post/${post_id}`);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleReviewChange = (e) => {
    const newReview = e.target.value;
    setReview(newReview);
  };

  useEffect(() => {
    setHasChanges(review !== postDetails.review);
    setButtonDisabled(review === postDetails.review);
  }, [review, postDetails.review]);

  return (
    <>
      <Topbar
        onLeaveClick={() => setShowLeaveConfirm(true)}
        executeLeaveOnClick
        title
        rightButton={
          <Button
            category='basic'
            shape='primary'
            type='button'
            onClick={confirmUpload}
            disabled={buttonDisabled}
          >
            수정
          </Button>
        }
      />
      <SPostContainer>
        <StyledTextarea
          ref={textareaRef}
          value={review}
          onChange={handleReviewChange}
          height='100%'
          width='100%'
          border='none'
        />
        <Modal
          content='피드를 수정하시겠습니까?'
          btnTxt='예'
          isVisible={showModal}
          onConfirm={handleUpdatePost}
          onCancel={() => setShowModal(false)}
        />
        <Modal
          content={
            <div>
              수정 중인 내용이 저장되지 않습니다.
              <br />
              정말로 나가시겠습니까?
            </div>
          }
          btnTxt='나가기'
          isVisible={showLeaveConfirm}
          onConfirm={() => {
            setShowLeaveConfirm(false);
            navigate(-1);
          }}
          onCancel={() => setShowLeaveConfirm(false)}
        />
      </SPostContainer>
    </>
  );
}

const SPostContainer = styled.section`
  height: 100%;
`;
