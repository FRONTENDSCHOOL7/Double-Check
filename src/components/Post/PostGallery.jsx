import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function PostGallery({ posts }) {
  return (
    <SGalleryPostList>
      {posts.map((post) => (
        <SGalleryPostItem key={post.id}>
          <Link to={`/post/${post.id}`}>
            <GalleryImg src={post.image} alt='책 표지 이미지' />
          </Link>
        </SGalleryPostItem>
      ))}
    </SGalleryPostList>
  );
}

const SGalleryPostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
  max-width: 390px;
  margin: auto;
  padding: 5px;
`;

const SGalleryPostItem = styled.li`
  list-style-type: none;
`;

const GalleryImg = styled.img`
  width: 100%;
  height: -webkit-fill-available;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
`;
