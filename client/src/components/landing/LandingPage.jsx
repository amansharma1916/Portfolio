import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import profileImage from "../../assets/images/profile.png";

const LandingPage = ({ heroData }) => {
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
          <p className="hero__intro">{heroData.introText}</p>

          <h1 className="hero__name">
            {heroData.firstName} {heroData.lastName}
          </h1>

          <h2 className="hero__title">
            {(heroData.title || "").split("&").map((part, index, arr) => (
              <span key={index} className="hero__title-part">
                {part.trim()}
                {index < arr.length - 1 && " &"}
              </span>
            ))}
          </h2>

          <p className="hero__description">
            {heroData.description}
          </p>

          <div className="hero__actions">
            <NavLink to={heroData.buttons[0].link} className="hero__btn">
              {heroData.buttons[0].label}
            </NavLink>

            <a
              href={heroData.buttons[1].link}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn"
            >
              {heroData.buttons[1].label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;