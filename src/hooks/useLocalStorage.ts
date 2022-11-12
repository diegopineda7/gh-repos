import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface User extends Credentials {
  firstName: string;
  lastName: string;
}

interface Credentials {
  username: string;
  password: string;
}

const useLocalStorage = () => {
  const navigate = useNavigate();
  const [userError, setUserError] = useState<string>();
  const isLoggedIn = window.localStorage.getItem('currentUser');

  const registerUser = (newUser: User) => {
    setUserError('');
    const usersList = window.localStorage.getItem('users');

    if (usersList) {
      const users: User[] = JSON.parse(usersList);
      const emailExists = users.find((u) => u.username === newUser.username);
      if (emailExists) {
        setUserError('This email is already exists');
      } else {
        const newUsersList = [...JSON.parse(usersList), newUser];
        try {
          window.localStorage.setItem('users', JSON.stringify(newUsersList));
          window.localStorage.setItem('currentUser', JSON.stringify(newUser));
          navigate('/repos');
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const validateUser = (credentials: Credentials) => {
    setUserError('');
    const usersList = window.localStorage.getItem('users');

    if (usersList) {
      const users: User[] = JSON.parse(usersList);
      const userFound = users.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );
      if (userFound) {
        try {
          window.localStorage.setItem('currentUser', JSON.stringify(userFound));
          navigate('/repos');
        } catch (e) {
          console.error(e);
        }
      } else {
        setUserError('Invalid credentials');
      }
    } else setUserError('Invalid credentials');
  };

  const logOut = () => {
    navigate('/');
    window.localStorage.removeItem('currentUser');
  };

  return { userError, isLoggedIn, registerUser, validateUser, logOut };
};

export default useLocalStorage;
