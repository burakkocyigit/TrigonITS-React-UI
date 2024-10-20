// import axios from 'axios';

// export const getToken = async () => {
//   const ACCOUNT = 'https://localhost:7005/api/Account/Login';
//   try {
//     const { data } = await axios(ACCOUNT);
//     return data.results;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
import axios from 'axios';

export const getToken = async (email: string, password: string) => {
  const ACCOUNT = 'https://localhost:7005/api/Account/Login';

  try {
    const { data } = await axios.post(
      ACCOUNT,
      {
        eMail: email, // Request objesindeki EMail alanı
        password: password, // Request objesindeki Password alanı
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return data;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};
