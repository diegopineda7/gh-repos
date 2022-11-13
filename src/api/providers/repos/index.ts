import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import { Repo } from '../../../interfaces';
import { ACCESS_TOKEN_KEY } from '../../../constants';

const useReposProviders = () => {
  const getRepos = () => {
    const response = axios<Repo[]>({
      method: 'GET',
      url: `https://api.github.com/user/repos`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
      },
    });
    return trackPromise(response);
  };

  return {
    getRepos,
  };
};

export default useReposProviders;
