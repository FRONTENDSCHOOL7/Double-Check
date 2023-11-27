import React, { useState, useEffect, useRef } from 'react';
import { postUploadAPI } from '../../API/Post';
import { useLocation, useNavigate } from 'react-router-dom';
import StyledTextarea from '../../components/Common/Textarea/TextareaStyle';
import Button from 'components/Common/Button/Button';
import Modal from 'components/Common/Modal/Modal';
import styled from 'styled-components';
import Topbar from 'components/Common/Topbar/Topbar';
import { showToast } from 'Hooks/useCustomToast';
import { useRecoilState } from 'recoil';
import { newinfo } from '../../Recoil/PostDetail';
export default function PostPage() {
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const bookData = location.state;
  console.log(bookData.isbn);
  const [review, setReview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [newInfo, setNewInfo] = useRecoilState(newinfo);
  // console.log(bookData.isbn);
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
  // 내가 작성한 리뷰 정보 , 업로드
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

      // post값을 리코일에 저장
      setNewInfo(response);
      setShowModal(true);

      // 리뷰등록하면 상세페이지로 이동! postDetailPage
      // navigate(`/post/${response.post.id}`);
      showToast('등록 되었습니다');
      navigate('/post');
    } catch (error) {
      console.error('업로드 에러:', error);
    }
  };

  // 수정하기갔다오면 이상함
  console.log(newInfo);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  const handleLeavePage = () => {
    navigate(-1);
  };
  const onLeaveClick = () => {
    setShowLeaveModal(true);
  };
  return (
    <>
      <Topbar
        title
        executeLeaveOnClick
        onLeaveClick={onLeaveClick}
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
          placeholder='읽은 부분에 대해 기억하고 싶은 내용 또는 나의 생각을 담아 공유해보세요!'
          height='100%'
          width='100%'
          border='none'
        />
        <Modal
          content='피드를 등록하시겠습니까?'
          btnTxt='예'
          isVisible={showModal}
          onConfirm={handlePostUpload}
          onCancel={() => setShowModal(false)}
        />
        <Modal
          content={
            <div>
              작성 중인 내용이 저장되지 않습니다.
              <br />
              정말로 나가시겠습니까?
            </div>
          }
          btnTxt='예'
          isVisible={showLeaveModal}
          onConfirm={handleLeavePage}
          onCancel={() => setShowLeaveModal(false)}
        />
      </SPostContainer>
    </>
  );
}

const SPostContainer = styled.section`
  height: 100%;
`;
