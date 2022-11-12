//Packages
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const useReposProviders = () => {
  const getInterventionsByProject = () => {
    const response = axios({
      method: 'GET',
      url: `/projects/interventions`,
    });
    return trackPromise(response);
  };

  return {
    getInterventionsByProject,
  };
};

export default useReposProviders;
