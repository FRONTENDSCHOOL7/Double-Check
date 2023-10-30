import React, { useState, useEffect, useRef } from 'react';
import Topbar from 'components/Common/TopBar';
import axios from 'axios';
import loginToken from 'Recoil/LoginToken';
import { useRecoilState } from 'recoil';
import SearchContent from 'components/Search/SearchContent';
import { InputBox } from 'components/Common/input';
import styled from 'styled-components';
import { SearchAPI } from 'API/Search';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);
  const [bookdata, setBookData] = useState([]);
  const [token] = useRecoilState(loginToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userButtonRef = useRef(null);
  const bookButtonRef = useRef(null);

  const [filter, setFilter] = useState('user'); // 'all', 'user', or 'book'

  const handleUserFilter = () => {
    setFilter('user');
    userButtonRef.current.focus();
  };

  const handleBookFilter = () => {
    setFilter('book');
    bookButtonRef.current.focus();
  };

  const handleInputChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);

    // 검색어 입력이 변경될 때 검색 결과 초기화
    if (newKeyword === '') {
      setData([]);
      setBookData([]);
    }
  };

  useEffect(() => {
    const search = async () => {
      if (keyword) {
        setLoading(true);
        setError('');

        try {
          const res = await SearchAPI(token, keyword);
          setData(res);
          setLoading(false);
        } catch (error) {
          setError('검색 중 오류 발생');
          setLoading(false);
        }
      } else {
        setData([]);
      }
    };

    if (keyword) {
      search();
    }
  }, [keyword, token]);

  useEffect(() => {
    if (keyword) {
      axios
        .get(`http://localhost:8080/search?searchQuery=${encodeURIComponent(keyword)}`)
        .then((response) => {
          const data = response.data.items;
          setBookData(data);
        })
        .catch((error) => {
          console.error('에러 발생:', error);
        });
    }
  }, [keyword]);

  return (
    <>
      <Topbar centerEl='search' />

      <Ssection>
        <SDiv>
          <SInputWrap>
            <InputBox
              type='text'
              value={keyword}
              onChange={handleInputChange}
              placeholder='검색..'
              width='100%'
              height='100%'
              borderRadius='40px'
            />
          </SInputWrap>
          <FilterButtons>
            <button
              ref={userButtonRef}
              onClick={handleUserFilter}
              className={filter === 'user' ? 'active' : ''}
            >
              유저
            </button>
            <button
              ref={bookButtonRef}
              onClick={handleBookFilter}
              className={filter === 'book' ? 'active' : ''}
            >
              책
            </button>
          </FilterButtons>
        </SDiv>
        {loading && <SNodata>검색 중...</SNodata>}
        {error && <p>{error}</p>}
        {!loading && !error && data.length === 0 && bookdata.length === 0 && (
          <SNodata>검색 결과가 없습니다.</SNodata>
        )}
        {!loading && !error && (data.length > 0 || bookdata.length > 0) && (
          <SearchContent data={data} bookdata={bookdata} filter={filter} keyword={keyword} />
        )}
      </Ssection>
    </>
  );
}

const FilterButtons = styled.div`
  border-bottom: 1px solid var(--gray-200);
  button {
    margin-right: 10px;
    font-size: large;
    padding: 15px;
    border: none;
    &:focus {
      border-bottom: 2px solid var(--dark-purple);
      outline: none;
    }
  }
  button.active {
    border-bottom: 2px solid var(--dark-purple);
  }
`;
const SDiv = styled.div`
  padding: 20px 0px;
`;

const SInputWrap = styled.div`
  padding: 6px;
`;

const Ssection = styled.section``;

const SNodata = styled.p`
  text-align: center;
  margin-top: 20px;
`;
