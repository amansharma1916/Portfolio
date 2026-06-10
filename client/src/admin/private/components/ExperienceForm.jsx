import { useState } from "react";
import "./ExperienceForm.css";

const ExperienceForm = () => {
  const [experiences] = useState([
    {
      _id: "1",
      company: "Wyreflow Technologies",
      role: "Frontend Team Lead",
      startDate: "Apr 2026",
      endDate: "Jun 2026",
    },
    {
      _id: "2",
      company: "Bluestock Fintech",
      role: "Full Stack Developer Intern",
      startDate: "Jan 2025",
      endDate: "Apr 2025",
    },
  ]);

  return (
    <section className="admin-card">
      <div className="admin-card__header">
        <div>
          <h2>Experience</h2>
          <p>
            Manage internship and professional
            experiences.
          </p>
        </div>

        <button className="save-btn">
          Add Experience
        </button>
      </div>

      <div className="experience-list">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="experience-item"
          >
            <div className="experience-item__info">
              <h3>{experience.company}</h3>

              <p>{experience.role}</p>

              <span>
                {experience.startDate} -{" "}
                {experience.endDate}
              </span>
            </div>

            <div className="experience-item__actions">
              <button className="action-btn">
                Edit
              </button>

              <button className="action-btn delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceForm;