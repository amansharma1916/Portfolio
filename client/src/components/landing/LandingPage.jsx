import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import profileImage from "../../assets/images/profile.png";

const LandingPage = () => {
  return (
    <section className="hero">
      <div className="container hero__container">
        <div className="hero__image-wrapper">
          <img
            src={profileImage}
            alt="Aman Sharma"
            className="hero__image"
          />
        </div>

        <div className="hero__content">
          <p className="hero__intro">Hi, my name is</p>

          <h1 className="hero__name">
            AMAN
            <br />
            SHARMA.
          </h1>

          <h2 className="hero__title">
            Full Stack Developer &
            <br />
            Computer Science Student
          </h2>

          <p className="hero__description">
            I build scalable web applications, AI-powered systems,
            geospatial platforms, and modern digital experiences using
            technologies that solve real-world problems.
          </p>

          <div className="hero__actions">
            <NavLink to="/projects" className="hero__btn">
              View Work
            </NavLink>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;