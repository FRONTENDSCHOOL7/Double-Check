import React, { useState, useEffect, useRef } from 'react';
import { postUploadAPI } from '../../API/Post';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledTextarea from '../../components/Common/Textarea/TextareaStyle';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import styled from 'styled-components';
import Topbar from 'components/Common/Topbar/Topbar';
import { showToast } from 'Hooks/useCustomToast';

export default function PostPage() {
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const bookData = location.state;
  const [review, setReview] = useState('');
  const [showModal, setShowModal] = useState(false);

  console.log(bookData.isbn);
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
  // 내가 작성할 리뷰 정보
  const postData = {
    title: bookData.title,
    author: bookData.author,
    isbn: bookData.isbn,
    review: review,
  };
  const post = {
    post: {
      content: JSON.stringify(postData),
      image: bookData.image || bookData.cover,
    },
  };

  const handlePostUpload = async () => {
    try {
      const response = await postUploadAPI(post);
      console.log(response);
      setShowModal(true);
      console.log(response.post.id);
      // 리뷰등록하면 상세페이지로 이동! postDetailPage
      // navigate(`/post/${response.post.id}`);
      navigate('/post');
    } catch (error) {
      console.error('업로드 에러:', error);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <>
      <Topbar
        title
        rightButton={
          <Button
            category='basic'
            shape='primary'
            type='button'
            onClick={confirmUpload}
            disabled={review.trim() === ''} // 텍스트를 입력하지않으면  버튼이 비 활성화
          >
            등록
          </Button>
        }
      />
      <SPostContainer>
        <StyledTextarea
          ref={textareaRef}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder='읽은 부분에 대해 기억하고 싶은 내용 또는 나의 생각을 담아  공유해보세요!'
          height='100%'
          width='100%'
          border='none'
        />
        <Modal
          content='등록하시겠습니까?'
          btnTxt='예'
          isVisible={showModal}
          onConfirm={handlePostUpload}
          onCancel={() => setShowModal(false)}
        />
        {/* <Modal
          content='리뷰를 등록을 취소하시겠습니까?'
          btnTxt='예'
          isVisible={showModal}
          onConfirm={handleLeavePage}
          onCancel={() => setShowModal(false)}
        /> */}
      </SPostContainer>
    </>
  );
}

const SPostContainer = styled.section`
  height: 100%;
`;

// <Topbar
//
// title='글귀 목록'
// rightButton={
//   <Button
//     category='basic'
//     shape='primary'
//     type='button'
//     onClick={() => navigate('/phraseupload')}
//   >
//     작성
//   </Button>
// }
// />
