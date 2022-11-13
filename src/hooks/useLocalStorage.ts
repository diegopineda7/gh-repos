import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LOGGED_IN_USER_KEY,
  USERS_LIST_KEY,
  ACCESS_TOKEN_KEY,
} from '../constants';
import { Credentials, User } from '../interfaces';
import useApi from '../api';

const useLocalStorage = () => {
  const navigate = useNavigate();
  const [userError, setUserError] = useState<string>();
  const isLoggedIn = localStorage.getItem(ACCESS_TOKEN_KEY);
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  const usersList = localStorage.getItem(USERS_LIST_KEY);
  const users: User[] = usersList ? JSON.parse(usersList) : [];
  const currentUser: User = loggedInUser ? JSON.parse(loggedInUser) : {};

  const { useProviders } = useApi();
  const { useAuthProviders } = useProviders();
  const { getAccessToken, getUserData } = useAuthProviders();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code && !localStorage.getItem(ACCESS_TOKEN_KEY)) {
      registerUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code && !localStorage.getItem(ACCESS_TOKEN_KEY)) {
      const { data } = await getAccessToken({ code });
      if (data.access_token) {
        localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
        const { data: profileData } = await getUserData({
          token: data.access_token,
        });
        if (usersList) {
          const userExists = users.find((u) => u.login === profileData.login);
          if (userExists) {
            setUserError('This user is already registered, please Log In');
          } else {
            const newUsersList = [
              ...JSON.parse(usersList),
              { ...profileData, favorites: [] },
            ];
            localStorage.setItem(USERS_LIST_KEY, JSON.stringify(newUsersList));
            localStorage.setItem(
              LOGGED_IN_USER_KEY,
              JSON.stringify({ ...profileData, favorites: [] })
            );
            navigate('/repos');
          }
        } else {
          localStorage.setItem(USERS_LIST_KEY, JSON.stringify([profileData]));
          navigate('/repos');
        }
      }
    }
  };

  const askForAccess = async () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo`
    );
  };

  const validateUser = (credentials: Credentials) => {
    setUserError('');

    if (usersList) {
      const users: User[] = JSON.parse(usersList);
      const userFound = users.find((u) => u.login === credentials.username);
      if (userFound) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userFound));
        navigate('/repos');
      } else {
        setUserError('Invalid credentials');
      }
    } else setUserError('Invalid credentials');
  };

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    navigate('/');
  };

  return {
    userError,
    isLoggedIn,
    users,
    currentUser,
    askForAccess,
    validateUser,
    logOut,
  };
};

export default useLocalStorage;
