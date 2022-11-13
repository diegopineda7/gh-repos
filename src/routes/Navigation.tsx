import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { SignUpPage, ReposPage, LogInPage } from '../pages';
import logo from '../assets/gh-logo.svg';

// Hooks
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { isLoggedIn, currentUser, logOut } = useAuth();

  return (
    <div className="main-layout">
      <nav>
        {!isLoggedIn && (
          <>
            <img src={logo} alt="React Logo" />
            <h3>GH Repos</h3>
          </>
        )}
        {isLoggedIn && (
          <div className="profile">
            <a href={currentUser.url} target="_blank" rel="noreferrer">
              <img src={currentUser.avatarUrl} alt={currentUser.name} />
            </a>

            <>
              <p>{currentUser.name}</p>
              <p>@{currentUser.login}</p>
            </>
          </div>
        )}
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
                  My repos
                </NavLink>
              </li>
              <li>
                <label onClick={logOut}>Log out</label>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="container">
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
    </div>
  );
};

export default Navigation;
