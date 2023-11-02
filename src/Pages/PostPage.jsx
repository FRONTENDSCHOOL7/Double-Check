import React, { useState } from 'react';
import { postUploadAPI } from '../API/Post';
import { useLocation } from 'react-router-dom';

export default function PostPage() {
  const [review, setReview] = useState('');
  const location = useLocation();
  const bookData = location.state;
  const [response, setResponse] = useState([]);
  const postData = {
    title: bookData.title,
    author: bookData.author,
    review: review,
  };

  const post = {
    post: {
      content: JSON.stringify(postData),
      image: bookData.image,
    },
  };
  const postresult = async () => {
    try {
      const res = await postUploadAPI(post); // post 객체를 서버로 전송
      setResponse(res);
    } catch (error) {
      console.error('Post Upload Error:', error);
    }
  };
  console.log(response);
  return (
    <div>
      <input
        type='text'
        placeholder='리뷰 입력'
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button onClick={postresult}>업로드</button>
      {/* <Link to={'/feed'} state={response}>
        게시물 확인
      </Link> */}
    </div>
  );
}
