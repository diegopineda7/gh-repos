import axios from 'axios';
import { ReposResponse } from '../../../interfaces';
import { ACCESS_TOKEN_KEY } from '../../../constants';

const useReposProviders = () => {
  const getRepos = async () => {
    const response = await axios<ReposResponse>({
      method: 'GET',
      url: 'http://localhost:4000/getRepos',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
      },
    });
    return response.data.data.viewer.repositories.nodes;
  };

  return {
    getRepos,
  };
};

export default useReposProviders;
