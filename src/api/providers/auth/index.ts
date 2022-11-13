import axios from 'axios';
import { UserResponse } from '../../../interfaces';

const useAuthProviders = () => {
  const getAccessToken = ({ code }: { code: string }) => {
    return axios({
      method: 'GET',
      url: 'http://localhost:4000/getAccessToken',
      params: { code },
    });
  };

  const getUserData = async ({ token }: { token: string }) => {
    const response = await axios<UserResponse>({
      method: 'GET',
      url: 'http://localhost:4000/getUserData',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  };

  return {
    getAccessToken,
    getUserData,
  };
};

export default useAuthProviders;
