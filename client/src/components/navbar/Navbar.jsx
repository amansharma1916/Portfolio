import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import ThemeToggle from "./toggle/ThemeToggle";
import "./Navbar.css";

const Navbar = ( {navbarData}) => {

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <NavLink to="/" className="navbar__logo">
          {navbarData.logoText}
        </NavLink>

        <nav className="navbar__links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>


          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Work
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Experience
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>
          <div className="theme-toggle-container">
            <ThemeToggle
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </div>
        </nav>
        
      </div>
    </header>
  );
};

export default Navbar;