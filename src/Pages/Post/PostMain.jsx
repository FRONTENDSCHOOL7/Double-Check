import React from 'react';
import { useInfinitePosts, useGetInfiniteFollowingPosts } from 'API/post1';
import Post from 'components/Post/Post';
import Topbar from 'components/Common/Topbar/Topbar';

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

export default function PostMain() {
  const { allPosts } = useInfinitePosts();
  const { allFollowingPosts } = useGetInfiniteFollowingPosts();
  console.log(allFollowingPosts);

  const validPosts = allPosts.filter((post) => {
    if (typeof post.content !== 'string') {
      return false;
    }

    try {
      // JSON.parse()를 사용하여 post.content를 객체로 변환
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
      <Topbar title='전체 피드' />
      {validPosts.map((post, index) => {
        const colorIndex = index % colors.length;
        const color = colors[colorIndex];
        return <Post key={post._id} post={post} color={color} />;
      })}
    </div>
  );
}
