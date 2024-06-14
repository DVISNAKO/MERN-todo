import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { logout, token } = useContext(AuthContext);
  const isLogin = !!token; // Check if token exists to determine login status

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand text-decoration-none" to="/">MERN todo App</Link>
        
        {isLogin ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/" onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                logout();
              }}>Выйти</a>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/login">Войти</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
