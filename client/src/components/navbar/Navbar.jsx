import { useEffect, useState , useRef} from "react";
import { NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import ThemeToggle from "./toggle/ThemeToggle";
import "./Navbar.css";

const Navbar = ( {navbarData}) => {

  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="navbar">
      <div className="container navbar__container">
        <NavLink to="/" className="navbar__logo">
          {navbarData.logoText}
        </NavLink>

        <nav className={`navbar__links ${isMenuOpen ? "active" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>


          <NavLink
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Work
          </NavLink>

          <NavLink
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("experience")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Experience
          </NavLink>

          <NavLink
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
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

        <button
          className="hamburger"
          ref={menuRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
      </div>
    </header>
  );
};

export default Navbar;