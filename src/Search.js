import React, { useState } from 'react';
import axios from 'axios';

function Test2() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBookList, setSearchBookList] = useState([]);
  const [bookInfoDetail, setBookInfoDetail] = useState([]);

  const serverURL = 'http://localhost:3020'; // 서버의 엔드포인트 URL

  const getSearchBook = async () => {
    if (!searchBookList) {
      alert('검색어를 입력해주세요.');
    }

    try {
      const response = await axios.get(
        `${serverURL}/search?searchQuery=${encodeURIComponent(searchQuery)}`,
      );
      console.log(response.data); // 서버에서 받은 데이터 출력
      setSearchBookList(response.data.items);
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };

  const getBookInfoDetail = async (isbn13) => {
    try {
      const res = await axios.get(`${serverURL}/search/book/detail/${isbn13}`);
      console.log(res.data.items);
      setBookInfoDetail(res.data.items); // Updated to an array
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={getSearchBook}>Search</button>
      <ul>
        {searchBookList &&
          searchBookList.map((item, index) => (
            <li key={index}>
              <button onClick={() => getBookInfoDetail(item.isbn)}>
                <img src={item.image} alt='' />
                <h3>{item.title}</h3>
                <span>{item.author}</span>
              </button>
            </li>
          ))}
      </ul>
      <article>
        {bookInfoDetail[0] && (
          <div>
            <img src={bookInfoDetail[0].image} alt='책 표지 이미지' />
            <h2>{bookInfoDetail[0].title}</h2>
            <span>{bookInfoDetail[0].author}</span>
            <p>{bookInfoDetail[0].description}</p>
          </div>
        )}
      </article>
    </div>
  );
}

export default Test2;
