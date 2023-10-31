const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

require('dotenv').config();
const aladinApiKey = process.env.REACT_APP_ALADIN_API_KEY;
const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const naverClientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
const aladinApiBaseUrl = 'https://www.aladin.co.kr/ttb/api/ItemList.aspx';
const naverApiBaseUrl = 'https://openapi.naver.com/v1/search/book.json';

// 공통 함수로 API 요청을 처리하는 함수
const fetchData = async (url, headers = {}) => {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    throw new Error('에러 발생');
  }
};

// 베스트셀러 정보 가져오기
app.get('/bestseller', async (req, res) => {
  const queryType = 'Bestseller';
  const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;

  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 신간 도서 정보 가져오기
app.get('/newBooks', async (req, res) => {
  const queryType = 'ItemNewAll';
  const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;

  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// 주목할 신작도서 가져오기
app.get('/NewBookSpecial', async (req, res) => {
  const queryType = 'ItemNewSpecial';
  const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${aladinApiKey}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;

  try {
    const data = await fetchData(aladinApiUrl);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//도서 검색기능
app.get('/search', async (req, res) => {
  const isbn = req.query.isbn; // ISBN 정보
  const searchQuery = req.query.searchQuery; // 사용자 검색 정보

  let naverApiUrl = '';
  if (isbn) {
    // ISBN 정보를 이용해 도서 정보 가져오기
    naverApiUrl = `${naverApiBaseUrl}?query=${isbn}`;
  } else if (searchQuery) {
    // 사용자 검색 정보를 이용해 도서 정보 가져오기
    naverApiUrl = `${naverApiBaseUrl}?query=${encodeURIComponent(searchQuery)}`;
  } else {
    res.status(400).json({ error: 'ISBN 정보 또는 검색어가 필요합니다.' });
    return;
  }
  const headers = {
    'X-Naver-Client-Id': naverClientId,
    'X-Naver-Client-Secret': naverClientSecret,
  };
  try {
    const data = await fetchData(naverApiUrl, headers);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log(`Listening on port 8080...`);
});
