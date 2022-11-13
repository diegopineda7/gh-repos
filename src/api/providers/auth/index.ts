import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
import { UserResponse } from '../../../interfaces';

const useAuthProviders = () => {
  const getAccessToken = ({ code }: { code: string }) => {
    const response = axios({
      method: 'GET',
      url: 'http://localhost:4000/getAccessToken',
      params: { code },
    });
    return trackPromise(response);
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
