import { useEffect, useState } from "react";
import "./PortfolioForm.css";
import {
  getPortfolioData,
  updatePortfolioData,
} from "../../../services/portfolio.service";

const PortfolioForm = () => {
  const [loading, setLoading] = useState(true);

  const [portfolioData, setPortfolioData] = useState({
    logoText: "",

    github: "",
    linkedin: "",
    leetcode: "",

    introText: "",
    firstName: "",
    lastName: "",

    title: "",
    description: "",
    profileImage: "",

    primaryButtonLabel: "",
    primaryButtonLink: "",

    secondaryButtonLabel: "",
    secondaryButtonLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPortfolioData();

        const data = res.data;

        setPortfolioData({
          logoText: data.navbar?.logoText || "",

          github: data.sidebar?.github || "",
          linkedin: data.sidebar?.linkedin || "",
          leetcode: data.sidebar?.leetcode || "",

          introText: data.hero?.introText || "",
          firstName: data.hero?.firstName || "",
          lastName: data.hero?.lastName || "",

          title: data.hero?.title || "",
          description: data.hero?.description || "",
          profileImage: data.hero?.profileImage || "",

          primaryButtonLabel:
            data.hero?.buttons?.[0]?.label || "",

          primaryButtonLink:
            data.hero?.buttons?.[0]?.link || "",

          secondaryButtonLabel:
            data.hero?.buttons?.[1]?.label || "",

          secondaryButtonLink:
            data.hero?.buttons?.[1]?.link || "",
        });
      } catch (error) {
        console.error(
          "Error fetching portfolio data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPortfolioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      navbar: {
        logoText: portfolioData.logoText,
      },

      sidebar: {
        github: portfolioData.github,
        linkedin: portfolioData.linkedin,
        leetcode: portfolioData.leetcode,
      },

      hero: {
        introText: portfolioData.introText,
        firstName: portfolioData.firstName,
        lastName: portfolioData.lastName,

        title: portfolioData.title,
        description: portfolioData.description,
        profileImage: portfolioData.profileImage,

        buttons: [
          {
            label: portfolioData.primaryButtonLabel,
            link: portfolioData.primaryButtonLink,
          },
          {
            label: portfolioData.secondaryButtonLabel,
            link: portfolioData.secondaryButtonLink,
          },
        ],
      },
    };

   

    try {
      await updatePortfolioData(payload);

      alert("Portfolio updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update portfolio");
    }
  };

  if (loading) {
    return (
      <section className="admin-card">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className="admin-card">
      <div className="admin-card__header">
        <h2>Portfolio</h2>
        <p>Manage landing page content.</p>
      </div>

      <form
        className="portfolio-form"
        onSubmit={handleSubmit}
      >
        {/* Branding */}

        <div className="form-group">
          <label>Logo Text</label>

          <input
            type="text"
            name="logoText"
            value={portfolioData.logoText}
            onChange={handleChange}
          />
        </div>

        {/* Social Links */}

        <div className="form-row">
          <div className="form-group">
            <label>Github URL</label>

            <input
              type="text"
              name="github"
              value={portfolioData.github}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>LinkedIn URL</label>

            <input
              type="text"
              name="linkedin"
              value={portfolioData.linkedin}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>LeetCode URL</label>

          <input
            type="text"
            name="leetcode"
            value={portfolioData.leetcode}
            onChange={handleChange}
          />
        </div>

        {/* Hero Section */}

        <div className="form-group">
          <label>Intro Text</label>

          <input
            type="text"
            name="introText"
            value={portfolioData.introText}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              value={portfolioData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              value={portfolioData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={portfolioData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={portfolioData.description}
            onChange={handleChange}
            rows={5}
          />
        </div>

        <div className="form-group">
          <label>Profile Image URL</label>

          <input
            type="text"
            name="profileImage"
            value={portfolioData.profileImage}
            onChange={handleChange}
          />
        </div>

        {/* CTA Buttons */}

        <div className="form-row">
          <div className="form-group">
            <label>Primary Button Label</label>

            <input
              type="text"
              name="primaryButtonLabel"
              value={portfolioData.primaryButtonLabel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Primary Button Link</label>

            <input
              type="text"
              name="primaryButtonLink"
              value={portfolioData.primaryButtonLink}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Secondary Button Label</label>

            <input
              type="text"
              name="secondaryButtonLabel"
              value={portfolioData.secondaryButtonLabel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Secondary Button Link</label>

            <input
              type="text"
              name="secondaryButtonLink"
              value={portfolioData.secondaryButtonLink}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="save-btn"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default PortfolioForm;