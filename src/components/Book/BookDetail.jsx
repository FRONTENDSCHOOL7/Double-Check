import React from 'react';
import styled from 'styled-components';
import Topbar from 'components/Common/Topbar/Topbar';

import BookDetailDesc from './BookDetailDesc';

const BookDetail = ({ detailInfo }) => {
  const {
    title,
    image,
    cover,
    publisher,
    author,
    categoryName,
    pubDate,
    isbn,
    pubdate,
    description,
  } = detailInfo;

  function extractTitlePublisher(title, fullPublisher) {
    const titleRegex = /^(.*?)\((.*?)\)$/;
    const titleMatch = titleRegex.exec(title);
    const publisherRegex = /^(.*?)\((.*?)\)$/;
    const publisherMatch = publisherRegex.exec(fullPublisher);

    const extractedTitle =
      titleMatch && titleMatch.length === 3 ? titleMatch[1].trim() : title.trim();
    const subtitle = titleMatch && titleMatch.length === 3 ? titleMatch[2].trim() : null;
    const extractedPublisher =
      publisherMatch && publisherMatch.length === 3
        ? publisherMatch[1].trim()
        : fullPublisher.trim();
    const imprint = publisherMatch && publisherMatch.length === 3 ? publisherMatch[2].trim() : null;

    return {
      extractedTitle,
      subtitle,
      extractedPublisher,
      imprint,
    };
  }
  const cleanedDesc = description.replace(/&lt;/g, '').replace(/&gt;/g, '');

  const { extractedTitle, subtitle, extractedPublisher } = extractTitlePublisher(title, publisher);

  const bookImage = image || cover;
  const pubdates = pubdate || pubDate;
  const modifiedAuthor = author.replace(/\^/g, ', ');

  return (
    <>
      <Topbar title bg />
      <Ssection>
        <SBookDetail>
          <h1>도서 상세 정보</h1>
          <SBookImg>
            <img src={bookImage} alt={title} loading='eager' />
          </SBookImg>
        </SBookDetail>
        <BookDetailDesc
          pubdates={pubdates}
          modifiedAuthor={modifiedAuthor}
          extractedTitle={extractedTitle}
          subtitle={subtitle}
          extractedPublisher={extractedPublisher}
          categoryName={categoryName}
          description={cleanedDesc}
          isbn={isbn}
          publisher={publisher}
          detailInfo={detailInfo}
        />
      </Ssection>
    </>
  );
};

const Ssection = styled.section`
  position: relative;
  background-color: var(--light-purple);
  p {
    color: var(--gray-500);
    font-size: 13px;
    margin-top: 10px;
  }
`;

const SBookDetail = styled.div`
  display: flex;
  justify-content: center;

  h1 {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

const SBookImg = styled.div`
  width: 200px;
  transform: translateY(21px);
  img {
    width: 100%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export default BookDetail;
