import React, { useMemo, useState, useEffect, useRef } from 'react';
import Topbar from 'components/Common/Topbar/Topbar';
import axios from 'axios';
import loginToken from 'Recoil/LoginToken';
import { useRecoilState } from 'recoil';
import SearchContent from 'components/Search/SearchContent';
import { InputBox } from 'components/Common/input';
import styled from 'styled-components';
import { SearchAPI } from 'API/Search';
import UseDebounce from 'Hooks/useDebounce';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const debouncedSearchValue = UseDebounce(keyword, 1000);
  const [filter, setFilter] = useState('book');
  const [data, setData] = useState([]);
  const [bookdata, setBookData] = useState([]);
  const [token] = useRecoilState(loginToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userButtonRef = useRef(null);
  const bookButtonRef = useRef(null);
  const inputRef = useRef(null);

  const handleUserFilter = () => {
    if (filter !== 'user') {
      setFilter('user');
      userButtonRef.current.focus();
    }
  };

  const handleBookFilter = () => {
    if (filter !== 'book') {
      setFilter('book');
      bookButtonRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    setKeyword(e.target.value);

    if (e.target.value === '') {
      setBookData([]);
      setData([]);
    }
  };

  const uniqueData = useMemo(() => {
    return bookdata.filter((obj, index, array) => {
      if (obj.isbn && !obj.isbn13) {
        const hasIdenticalIsbn13 = array.some((item) => item.isbn13 === obj.isbn);
        return !hasIdenticalIsbn13;
      }
      return true;
    });
  }, [bookdata]);

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedSearchValue) {
        setLoading(true);
        setError('');

        try {
          const res = await SearchAPI(token, debouncedSearchValue);
          setData(res);
        } catch (error) {
          setError('검색 중 오류 발생');
        } finally {
          setLoading(false);
        }
      } else {
        setData([]);
      }
    };

    fetchData();
  }, [debouncedSearchValue, token]);

  useEffect(() => {
    if (debouncedSearchValue) {
      axios
        .get(
          `https://port-0-node-express-1igmo82clonz4u17.sel5.cloudtype.app/search?searchQuery=${encodeURIComponent(
            debouncedSearchValue,
          )}`,
        )
        .then((response) => {
          let naverItems = response.data.naverData.items;
          let aladinItem = response.data.aladinData.item;

          const mergedData = [...new Set([...naverItems, ...aladinItem])];
          const data = mergedData;
          setBookData(data);
        })
        .catch((error) => {
          console.error('에러 발생:', error);
        });
    } else {
      // 검색어가 없을 때 bookdata 초기화
      setBookData([]);
    }
  }, [debouncedSearchValue]);

  useEffect(() => {
    // 페이지가 로드될 때 input에 포커스를 줌
    inputRef.current.focus();
  }); // 빈 배열을 의존성으로 넣어 한 번만 실행되도록 설정

  return (
    <>
      <Topbar title='검색' />

      <Ssection>
        <SDiv>
          <SInputWrap>
            <InputBox
              ref={inputRef}
              type='text'
              value={keyword}
              onChange={handleInputChange}
              placeholder='검색어를 입력하세요.'
              width='100%'
              height='100%'
              radius='40px'
              id='searchInput'
              name='searchInput'
            />
          </SInputWrap>
          <FilterButtons>
            <button
              ref={bookButtonRef}
              onClick={handleBookFilter}
              className={filter === 'book' ? 'line' : ''}
            >
              책
            </button>
            <button
              ref={userButtonRef}
              onClick={handleUserFilter}
              className={filter === 'user' ? 'line' : ''}
            >
              유저
            </button>
          </FilterButtons>
        </SDiv>
        {!loading &&
          !error &&
          Array.isArray(data) &&
          data.length === 0 &&
          Array.isArray(bookdata) &&
          bookdata.length === 0 && (
            <SNodata>
              {filter === 'user'
                ? '유저 검색 결과가 없습니다.'
                : '제목, 저자, 출판사로 검색해보세요.'}
            </SNodata>
          )}
        {/* {!loading &&
          !error &&
          ((Array.isArray(data) && data.length > 0) ||
            (Array.isArray(uniqueData) && uniqueData.length > 0)) && (
            <SearchContent data={data} bookdata={uniqueData} filter={filter} keyword={keyword} />
          )} */}
        {!loading && !error && (data.length > 0 || uniqueData.length > 0) && (
          <SearchContent data={data} bookdata={uniqueData} filter={filter} keyword={keyword} />
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
  button.line {
    border-bottom: 2px solid var(--dark-purple);
  }
`;
const SDiv = styled.div`
  padding: 20px 0px;
`;

const SInputWrap = styled.div`
  padding: 0px 18px;
`;

const Ssection = styled.section``;

const SNodata = styled.p`
  text-align: center;
  margin-top: 20px;

  color: var(--gray-500);
`;
