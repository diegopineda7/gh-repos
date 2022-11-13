import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { User } from '../../../interfaces';

const useAuthProviders = () => {
  const getAccessToken = ({ code }: { code: string }) => {
    const response = axios({
      method: 'GET',
      url: `http://localhost:4000/getAccessToken`,
      params: { code },
    });
    return trackPromise(response);
  };

  const getUserData = ({ token }: { token: string }) => {
    const response = axios<User>({
      method: 'GET',
      url: `http://localhost:4000/getUserData`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return trackPromise(response);
  };

  return {
    getAccessToken,
    getUserData,
  };
};

export default useAuthProviders;
