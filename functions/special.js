const axios = require('axios');

const aladinApiBaseUrl = 'https://www.aladin.co.kr/ttb/api/ItemList.aspx';
// eslint-disable-next-line no-unused-vars
exports.handler = async (event, context) => {
  const queryType = 'ItemNewSpecial';
  const aladinApiUrl = `${aladinApiBaseUrl}?ttbkey=${process.env.REACT_APP_ALADIN_API_KEY}&QueryType=${queryType}&MaxResults=100&start=1&SearchTarget=Book&output=js&Cover=Big&Version=20131101`;
  try {
    const response = await axios.get(aladinApiUrl);
    const data = response.data;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
