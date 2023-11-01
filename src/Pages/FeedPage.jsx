import React from 'react';
import { useLocation } from 'react-router-dom';

export default function FeedPage() {
  const location = useLocation();
  const { state } = location;

  const {
    author,
    commentCount,
    // comments,
    content,
    // createdAt,
    // heartCount,
    // hearted,
    // id,
    image,
    // updatedAt,
  } = state.post;
  console.log(author);
  const data = JSON.parse(content);

  const { title, author: reviewAuthor, review } = data;

  return (
    <div>
      <h1>FeedPage</h1>
      <div>
        <img src={image} alt='' />
        <p>책 제목 : {title}</p>
        <p>저자 : {reviewAuthor}</p>
        <p>내 리뷰 : {review}</p>
        <p>이름 : {author.username}</p> <p>닉네임: {author.accountname}</p>
        <p>Comment Count: {commentCount}</p>
      </div>
    </div>
  );
}
