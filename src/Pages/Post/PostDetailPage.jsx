import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postGetUpdateAPI } from 'API/Post';
import { useRecoilState } from 'recoil';
import { postDetailsState, postDetailUser, postDetailInfo } from '../../Recoil/PostDetail';
import Topbar from 'components/Common/Topbar/Topbar';
import PostDetail from 'components/Post/PostDetail';
import Comments from 'components/Comment/Comments';
import CommentUpload from 'components/Comment/CommentUpload';
import PostDetailSkeleton from 'assets/Skeleton/PostDetailSkeleton';

export default function PostDetailPage() {
  const { post_id } = useParams();

  const [postDetails, setPostDetails] = useRecoilState(postDetailsState);
  const [postUser, setPostUser] = useRecoilState(postDetailUser);
  const [postInfo, setPostInfo] = useRecoilState(postDetailInfo);
  const [currentItemId, setCurrentItemId] = useState(null);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postGetUpdateAPI(post_id);
        const content = JSON.parse(response.post.content);

        setPostDetails({
          title: content.title,
          author: content.author,
          review: content.review,
          isbn: content.isbn,
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [post_id, setPostDetails, setPostInfo, setPostUser]);

  const navigateToMainPostPage = () => {
    navigate('/post');
  };
  if (isLoading) {
    return <PostDetailSkeleton />;
  }
  return (
    <>
      <Topbar title goBack={navigateToMainPostPage} />
      <PostDetail
        isbn={postDetails.isbn}
        authorInfo={postUser}
        postInfo={postInfo}
        postDetails={postDetails}
        postid={post_id}
        hearted={postInfo.hearted}
        heartCount={postInfo.heartCount}
        currentItemId={currentItemId}
        setCurrentItemId={setCurrentItemId}
      />
      <Comments postId={post_id} />
      <CommentUpload postId={post_id} />
    </>
  );
}
