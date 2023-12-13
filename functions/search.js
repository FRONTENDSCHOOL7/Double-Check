const axios = require('axios');

const aladinApiKey = process.env.REACT_APP_ALADIN_API_KEY;
const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const naverClientSecret = process.env.REACT_APP_NAVER_CLIENT_SECRET;

const aladinApiSearchUrl = 'http://www.aladin.co.kr/ttb/api/ItemSearch.aspx';
const aladinApiLookUpUrl = 'http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx';
const naverApiBaseUrl = 'https://openapi.naver.com/v1/search/book.json';
//http://localhost:8888/.netlify/functions/search?searchQuery=%EA%B3%A0%EC%96%91%EC%9D%B4
exports.handler = async (event) => {
  try {
    const { isbn, searchQuery } = event.queryStringParameters;
    let naverApiUrl = '';
    let aladinApiUrl = '';

    if (!isbn && !searchQuery) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'ISBN 정보 또는 검색어가 필요합니다.' }),
      };
    }

    if (isbn) {
      naverApiUrl = `${naverApiBaseUrl}?query=${isbn}`;
      aladinApiUrl = `${aladinApiLookUpUrl}?ttbkey=${aladinApiKey}&itemIdType=ISBN&ItemId=${isbn}&output=js&Cover=Big&Version=20131101&CategoryId`;
    } else {
      naverApiUrl = `${naverApiBaseUrl}?query=${encodeURIComponent(searchQuery)}`;
      aladinApiUrl = `${aladinApiSearchUrl}?ttbkey=${aladinApiKey}&Query=${encodeURIComponent(
        searchQuery,
      )}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101&CategoryId`;
    }

    const naverHeaders = {
      'X-Naver-Client-Id': naverClientId,
      'X-Naver-Client-Secret': naverClientSecret,
    };

    const [naverResponse, aladinResponse] = await Promise.all([
      axios.get(naverApiUrl, { headers: naverHeaders }),
      axios.get(aladinApiUrl),
    ]);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        naverData: naverResponse.data,
        aladinData: aladinResponse.data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
