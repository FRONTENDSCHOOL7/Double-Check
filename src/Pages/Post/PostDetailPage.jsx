import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postGetUpdateAPI } from 'API/Post';
import { useRecoilState } from 'recoil';
import { postDetailsState, postDetailUser, postDetailInfo } from '../../Recoil/PostDetail';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Topbar from 'components/Common/Topbar/Topbar';

import PostDetail from 'components/Post/PostDetail';
import ModalButton from 'components/Common/Modal/ModalButton';
import Comments from 'components/Comment/Comments';
import CommentUpload from 'components/Comment/CommentUpload';

export default function PostDetailPage() {
  const { post_id } = useParams();
  const [postDetails, setPostDetails] = useRecoilState(postDetailsState);
  const [postUser, setPostUser] = useRecoilState(postDetailUser);
  const [postInfo, setPostInfo] = useRecoilState(postDetailInfo);
  const [showEditDeleteModal, setShowEditDeleteModal] = useState(false); // Added showEditDeleteModal state
  const [currentItemId, setCurrentItemId] = useState(null); // Added currentItemId state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postGetUpdateAPI(post_id);
        const content = JSON.parse(response.post.content);

        setPostDetails({
          title: content.title,
          author: content.author,
          review: content.review,
          image: response.post.image,
        });

        setPostInfo({
          updatedAt: response.post.updatedAt,
          createdAt: response.post.createdAt,
          heartCount: response.post.heartCount,
          hearted: response.post.hearted,
          commentCount: response.post.commentCount,
        });

        setPostUser(response.post.author);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [post_id, setPostDetails, setPostInfo, setPostUser]);

  const LogoutButton = (
    <button onClick={() => setShowEditDeleteModal(true)}>
      <HiOutlineDotsVertical />
    </button>
  );

  const handleCancel = () => {
    setShowEditDeleteModal(false);
  };

  const navigateToEditPage = () => {
    navigate(`/post/${post_id}/edit`);
  };

  return (
    <>
      <Topbar title rightButton={LogoutButton} />
      <PostDetail
        authorInfo={postUser}
        postInfo={postInfo}
        postDetails={postDetails}
        postid={post_id}
        hearted={postInfo.hearted}
        heartCount={postInfo.heartCount}
        showEditDeleteModal={showEditDeleteModal} // Pass the showEditDeleteModal state
        currentItemId={currentItemId} // Pass the currentItemId state
        setCurrentItemId={setCurrentItemId} // Pass the function to update currentItemId
      />
      <Comments postId={post_id} />
      <CommentUpload postId={post_id} />

      {showEditDeleteModal && (
        <ModalButton
          itemId={currentItemId}
          text={['리뷰 수정', '리뷰 삭제']}
          onClick={[navigateToEditPage, () => setShowEditDeleteModal(false)]}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
