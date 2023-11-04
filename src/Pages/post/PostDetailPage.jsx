import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postGetUpdateAPI, postDeleteAPI } from 'API/Post';
import { useRecoilState } from 'recoil';
import { postDetailsState, postDetailUser, postDetailInfo } from '../../Recoil/PostDetail';
import { useNavigate } from 'react-router-dom';
import Topbar from 'components/Common/Topbar/Topbar';
import Modal from 'components/Common/Modal/Modal';
import CommentUpload from 'components/Comment/CommentUpload';
import Comments from 'components/Comment/Comments';

export default function PostDetailPage() {
  const navigate = useNavigate();
  const { post_id } = useParams();
  const [postDetails, setPostDetails] = useRecoilState(postDetailsState);
  const [showModal, setShowModal] = useState(false);
  const [postlUser, setPostlUser] = useRecoilState(postDetailUser);
  const [postInfo, setPostInfo] = useRecoilState(postDetailInfo);
  console.log(postlUser);
  console.log(postInfo);

  const confirmDelete = (e) => {
    e.preventDefault();
    console.log('confirmDelete 함수 실행');
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 게시물의 상세 정보 가져오기
        const response = await postGetUpdateAPI(post_id);
        const content = JSON.parse(response.post.content);

        // 게시물 책, 리뷰 정보 설정
        setPostDetails({
          title: content.title,
          author: content.author,
          review: content.review,
          image: response.post.image,
        });

        // 게시물 정보 설정
        setPostInfo({
          updatedAt: response.post.updatedAt,
          createdAt: response.post.createdAt,
          heartCount: response.post.heartCount,
          commentCount: response.post.commentCount,
          comments: response.post.comments,
        });

        // 게시물 작성자 설정
        setPostlUser(response.post.author);
      } catch (error) {
        console.log('에러 발생: ' + error);
      }
    };

    fetchData();
  }, [post_id, setPostDetails, setPostInfo, setPostlUser]);

  const navigateToEditPage = () => {
    // 수정 페이지로 이동
    navigate(`/post/${post_id}/edit`);
  };

  const handleDeletePost = async () => {
    try {
      await postDeleteAPI(post_id);
      console.log('삭제');
      navigate(`/`);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <section>
      <Topbar title='Post Detail' />
      {postDetails ? (
        <div>
          <h1>{postDetails.title}</h1>
          <p>Author: {postDetails.author}</p>
          <p>내 리뷰: {postDetails.review}</p>
          <img src={postDetails.image} alt='' />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Comments postId={post_id} />
      <CommentUpload postId={post_id} />

      <Modal
        content='리뷰를 삭제하시겠습니까?'
        btnTxt='예'
        isVisible={showModal}
        onConfirm={handleDeletePost}
        onCancel={() => setShowModal(false)}
      />
      <button onClick={navigateToEditPage}>수정</button>
      <button onClick={confirmDelete}>삭제</button>
    </section>
  );
}
