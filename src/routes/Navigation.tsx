import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { SignUpPage, ReposPage, LogInPage } from '../pages';
import logo from '../logo.svg';

// Hooks
import useLocalStorage from '../hooks/useLocalStorage';

const Navigation = () => {
  const { isLoggedIn, logOut } = useLocalStorage();

  return (
    <div className="main-layout">
      <nav>
        <img src={logo} alt="React Logo" />
        <ul>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? 'nav-active' : '')}
                >
                  Sign up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? 'nav-active' : '')}
                >
                  Log in
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink
                  to="/repos"
                  className={({ isActive }) => (isActive ? 'nav-active' : '')}
                >
                  Repos
                </NavLink>
              </li>
              <li>
                <label onClick={logOut}>Log out</label>
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<SignUpPage />} />
            <Route path="/login" element={<LogInPage />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/repos" element={<ReposPage />} />
          </>
        )}
        <Route
          path="/*"
          element={<Navigate to={isLoggedIn ? '/repos' : '/'} replace />}
        />
      </Routes>
    </div>
  );
};

export default Navigation;
