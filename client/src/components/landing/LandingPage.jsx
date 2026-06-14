import { NavLink, useNavigate } from "react-router-dom";
import { sectionMap } from "../../hooks/sectionNavigation";
import "./LandingPage.css";
import profileImage from "../../assets/images/profile.png";

const LandingPage = ({ heroData }) => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    const sectionId = sectionMap[link];

    if (sectionId) {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      return;
    }
    if (
      link.startsWith("http://") ||
      link.startsWith("https://")
    ) {
      window.open(link, "_blank");
      return;
    }

    navigate(link);
  };

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
            <button
              className="hero__btn"
              onClick={() =>
                handleNavigation(heroData.buttons[0].link)
              }
            >
              {heroData.buttons[0].label}
            </button>

            <button
              className="hero__btn"
              onClick={() =>
                handleNavigation(heroData.buttons[1].link)
              }
            >
              {heroData.buttons[1].label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;