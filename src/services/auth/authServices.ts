import axios from 'axios';

export const getToken = async () => {
  const ACCOUNT = 'https://localhost:7005/api/Account';
  try {
    const { data } = await axios(ACCOUNT);
    return data.results;
  } catch (error) {
    console.log(error);
    return error;
  }
};
