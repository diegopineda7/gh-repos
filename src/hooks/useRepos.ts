import { useEffect, useState } from 'react';
import useApi from '../api';
import { LOGGED_IN_USER_KEY, USERS_LIST_KEY } from '../constants';
import useAuth from './useAuth';
import { Repo, User } from '../interfaces';

const useRepos = () => {
  const { useProviders } = useApi();
  const { useReposProviders } = useProviders();
  const { getRepos } = useReposProviders();
  const { users, currentUser } = useAuth();
  const favorites = currentUser.favorites;

  const [repos, setRepos] = useState<Repo[]>([]);
  const [reposToShow, setReposToShow] = useState<Repo[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [isFavoritesTab, setIsFavoritesTab] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(() => {
    handleGetRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFavoritesTab) {
      setReposToShow(
        (searchText ? reposToShow : repos).filter((r) =>
          favorites.includes(r.id)
        )
      );
    } else {
      setReposToShow(searchText ? reposToShow : repos);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavoritesTab, rerender]);

  const handleGetRepos = async () => {
    const data = await getRepos();
    setRepos(data);
    setReposToShow(data);
  };

  const handleSearchByName = (name: string) => {
    setIsFavoritesTab(false);
    setSearchText(name);
    if (name) {
      setReposToShow(
        repos.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()))
      );
    } else setReposToShow(repos);
  };

  const clearSearch = () => {
    setSearchText('');
    setIsFavoritesTab(false);
    setReposToShow(repos);
  };

  const toggleFavoriteRepo = (repo: Repo) => {
    let favoritesResult: string[];
    if (favorites.includes(repo.id)) {
      favoritesResult = favorites.filter((r) => r !== repo.id);
    } else {
      favoritesResult = [...favorites, repo.id];
    }
    const userResult: User = { ...currentUser, favorites: favoritesResult };
    const userIdx = users.findIndex((u) => u.login === currentUser.login);
    const newUsersList = [...users];
    newUsersList.splice(userIdx, 1, userResult);
    localStorage.setItem(USERS_LIST_KEY, JSON.stringify(newUsersList));
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userResult));
    setRerender(!rerender);
  };

  return {
    allRepos: repos,
    repos: reposToShow,
    favorites,
    searchText,
    isFavoritesTab,
    handleSearchByName,
    clearSearch,
    setIsFavoritesTab,
    toggleFavoriteRepo,
  };
};

export default useRepos;
