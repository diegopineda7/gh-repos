import useReposProviders from './repos';
import useAuthProviders from './auth';

const useProviders = () => {
  return { useReposProviders, useAuthProviders };
};

export default useProviders;
