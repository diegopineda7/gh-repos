import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import logo from '../logo.svg';

const Navigation = () => {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <nav>
          <img src={logo} alt="Logo" />
          <ul>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? 'nav-active' : '')}
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'nav-active' : '')}
              >
                Log In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'nav-active' : '')}
              >
                Repos
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<h1>Sign Up</h1>}></Route>
          <Route path="/login" element={<h1>Log In</h1>}></Route>
          <Route path="/" element={<h1>Repos</h1>}></Route>
          <Route path="/*" element={<Navigate to="/" replace />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Navigation;
