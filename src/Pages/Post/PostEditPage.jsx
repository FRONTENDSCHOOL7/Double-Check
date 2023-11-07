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
  // eslint-disable-next-line no-unused-vars
  const [postDetails, setPostDetails] = useRecoilState(postDetailsState);
  // eslint-disable-next-line no-unused-vars
  const [review, setReview] = useState(postDetails.review);

  const confirmUpload = (e) => {
    e.preventDefault();
    console.log('confirmUpload 함수 실행');
    setShowModal(false);
    if (review === '' || review.length < 1) {
      setShowModal(false);
      return showToast('리뷰을 입력해주세요.');
    } else {
      setShowModal(true);
    }
  };
  console.log(postDetails);
  // 내가 작성할 리뷰 정보
  const postData = {
    title: postDetails.title,
    author: postDetails.author,
    isbn: postDetails.isbn,
    review: review,
  };

  const postEdit = {
    post: {
      content: JSON.stringify(postData),
      image: postDetails.image || postDetails.cover,
    },
  };
  console.log(post_id);
  const handleUpdatePost = async () => {
    try {
      const res = await postPutAPI(post_id, postEdit);
      console.log(res);
      setShowModal(true);
      navigate(`/post/${post_id}`);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

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

  return (
    <>
      <Topbar
        title
        rightButton={
          <Button category='basic' shape='primary' type='button' onClick={confirmUpload}>
            수정
          </Button>
        }
      />
      <SPostContainer>
        <StyledTextarea
          ref={textareaRef}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          height='100%'
          width='100%'
          border='none'
        />
        <Modal
          content='수정하시겠습니까?'
          btnTxt='예'
          isVisible={showModal}
          onConfirm={handleUpdatePost}
          onCancel={() => setShowModal(false)}
        />
        {/* <label>
          <textarea value={review} onChange={(e) => setReview(e.target.value)} />
        </label> */}
        {/* <button onClick={handleUpdatePost}>Update Post</button> */}
      </SPostContainer>
    </>
  );
}
const SPostContainer = styled.section`
  height: 100%;
`;
