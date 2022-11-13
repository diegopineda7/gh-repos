import { useEffect, useState } from 'react';
import useApi from '../api';
import { LOGGED_IN_USER_KEY, USERS_LIST_KEY } from '../constants';
import useLocalStorage from './useLocalStorage';
import { Repo } from '../interfaces';

const useRepos = () => {
  const { useProviders } = useApi();
  const { useReposProviders } = useProviders();
  const { getRepos } = useReposProviders();
  const { users, currentUser } = useLocalStorage();
  const favorites = currentUser.favorites;

  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    handleGetRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetRepos = async () => {
    const { data } = await getRepos();
    setRepos(data);
  };

  const markRepoAsFavorite = (repo: Repo) => {
    let favoritesResult: number[];
    if (favorites.includes(repo.id)) {
      favoritesResult = favorites.filter((r: number) => r !== repo.id);
    } else {
      favoritesResult = [...favorites, repo.id];
    }
    try {
      const userResult = { ...currentUser, favorites: favoritesResult };
      const userIdx = users.findIndex((u) => u.id === currentUser.id);
      const newUsersList = [...users].splice(userIdx, 1, userResult);
      localStorage.setItem(USERS_LIST_KEY, JSON.stringify(newUsersList));
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userResult));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    repos,
    favorites,
    markRepoAsFavorite,
  };
};

export default useRepos;
