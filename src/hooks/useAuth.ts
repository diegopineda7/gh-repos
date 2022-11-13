import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  LOGGED_IN_USER_KEY,
  USERS_LIST_KEY,
  ACCESS_TOKEN_KEY,
} from '../constants';
import { Credentials, User } from '../interfaces';
import useApi from '../api';

const useAuth = () => {
  const navigate = useNavigate();
  const [userError, setUserError] = useState<string>();
  const isLoggedIn = localStorage.getItem(ACCESS_TOKEN_KEY);
  const loggedInUser = localStorage.getItem(LOGGED_IN_USER_KEY);
  const usersList = localStorage.getItem(USERS_LIST_KEY);
  const users: User[] = usersList ? JSON.parse(usersList) : [];
  const currentUser: User = loggedInUser ? JSON.parse(loggedInUser) : {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');

  const { useProviders } = useApi();
  const { useAuthProviders } = useProviders();
  const { getAccessToken, getUserData } = useAuthProviders();

  useEffect(() => {
    registerUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const askForAccess = async () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=repo`
    );
  };

  const registerUser = async () => {
    if (code && !localStorage.getItem(ACCESS_TOKEN_KEY)) {
      const { data } = await getAccessToken({ code });
      if (data.access_token) {
        const { viewer: profileData } = await getUserData({
          token: data.access_token,
        });
        const newUser = {
          ...profileData,
          token: data.access_token,
          favorites: [],
        };
        const userExists = users.find((u) => u.login === newUser.login);
        if (userExists) {
          setUserError(
            `The user @${userExists.login} is already registered, please Log In`
          );
        } else {
          const newUsersList = usersList
            ? [...JSON.parse(usersList), newUser]
            : [newUser];
          localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
          localStorage.setItem(USERS_LIST_KEY, JSON.stringify(newUsersList));
          localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(newUser));
          navigate('/repos');
        }
      }
    }
  };

  const validateUser = (credentials: Credentials) => {
    setUserError('');

    const userFound = users.find((u) => u.login === credentials.username);
    if (userFound) {
      localStorage.setItem(ACCESS_TOKEN_KEY, userFound.token);
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userFound));
      navigate('/repos');
    } else {
      setUserError(
        "Username not found. If you haven't registered yet, please Sign up "
      );
    }
  };

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOGGED_IN_USER_KEY);
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

export default useAuth;
