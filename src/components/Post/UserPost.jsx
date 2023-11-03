/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetInfiniteUserPosts } from 'API/post1';
import Post from 'components/Post/Post';

const colors = [
  ['#FFE7FF', '#E3EEFF'],
  '#F2F4FF',
  '#ccf0ff',
  ['#F1E4F1', '#F9F0DC'],
  '#f4f4f4',
  '#fff0f0',
  ['#DDF6FA', '#F9F0DC'],
  '#f9f0ff',
  '#f0f8ff',
];

export default function UserPost() {
  const { accountname } = useParams();
  const { allUserPosts } = useGetInfiniteUserPosts(accountname);
  console.log(allUserPosts);

  const validUserPosts = allUserPosts.filter((post) => {
    try {
      post.parsedContent = JSON.parse(post.content);
      return (
        post.parsedContent &&
        post.parsedContent.title &&
        post.parsedContent.author &&
        post.parsedContent.review
      );
    } catch (error) {
      return false;
    }
  });

  return (
    <div>
      {validUserPosts.length > 0 ? (
        validUserPosts.map((post, index) => {
          const colorIndex = index % colors.length;
          const color = colors[colorIndex];
          return <Post key={post._id} post={post} color={color} />;
        })
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
