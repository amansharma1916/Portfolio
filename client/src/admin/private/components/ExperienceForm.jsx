import { useState , useEffect} from "react";
import { getExperiences , getExperienceById , updateExperience, deleteExperience, createExperience } from "../../../services/experience.service";
import "./ExperienceForm.css";
import AddExperience from "./AddExperience";

const ExperienceForm = () => {
  const [experiences,setExperiences] = useState([
    {
      _id: "6a283de476ff191287fc5a76",
      company: " Wyreflow Technologies",
      role: "api Frontend Team Lead",
      startDate: "api Apr 2026",
      endDate: "api Jun 2026",
      description:
        "api Led frontend development for client-facing applications and collaborated closely with backend teams.",
      achievements: [
        "api Built reusable micro frontend components",
        "Integrated payment systems",
        "Implemented OAuth authentication",
        "Worked with CI/CD pipelines",
      ],
      technologies: [
        "api React",
        "TypeScript",
        "Node.js",
        "Tailwind",
      ],
      displayOrder: 1,
      isCurrent: false,
    },
    {
      _id: "6a28444576ff191287fc5a78",
      company: "2  Wyreflow Technologies",
      role: "api 2 Frontend Team Lead",
      startDate: "api2 Apr 2026",
      endDate: "api Jun 2026",
      description:
        "api 2 Led frontend development for client-facing applications and collaborated closely with backend teams.",
      achievements: [
        "api Built reusable 2 micro frontend components",
        "Integrated payment systems",
        "Implemented OAuth authentication",
        "Worked with CI/CD pipelines",
      ],
      technologies: [
        "2api React",
        "TypeScript",
        "Node.js",
        "Tailwind",
      ],
      displayOrder: 2,
      isCurrent: false,
    },
  ]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await getExperiences();

        setExperiences(res.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);



  const [editData, setEditData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    achievements: "",
    technologies: "",
    displayOrder: 1,
    isCurrent: false,
  });

  const handleEdit = (experience) => {
    setEditingId(experience._id);

    setEditData({
      company: experience.company,
      role: experience.role,
      startDate: experience.startDate,
      endDate: experience.endDate,
      description: experience.description,
      achievements:
        experience.achievements.join("\n"),
      technologies:
        experience.technologies.join(", "),
      displayOrder: experience.displayOrder,
      isCurrent: experience.isCurrent,
    });
  };

  const handleCancel = () => {
    setEditingId(null);

    setEditData({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      achievements: "",
      technologies: "",
      displayOrder: 1,
      isCurrent: false,
    });
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...editData,
      achievements:
        editData.achievements
          .split("\n")
          .filter(Boolean),

      technologies:
        editData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
    };

    console.log(
      "Updating:",
      editingId,
      payload
    );

    await updateExperience(editingId, payload)
    setExperiences((prev) =>
      prev.map((exp) =>
        exp._id === editingId
          ? { ...exp, ...payload }
          : exp
      )
    );

    setEditingId(null);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      await deleteExperience(id);
      setExperiences((prev) =>
        prev.filter((exp) => exp._id !== id)
      );
    }
  };

  const handleAddExperience = () => {
    setShowAddForm(true);
  };

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

        <button className="save-btn" onClick={handleAddExperience}>
          Add Experience
        </button>
      </div>

      {showAddForm && (
      <AddExperience
        onSubmit={async (newExp) => {
          await createExperience(newExp);

          setExperiences((prev) => [
            ...prev,
            { _id: Date.now().toString(), ...newExp },
          ]);
          setShowAddForm(false);
        }}
        onCancel={() => setShowAddForm(false)}
      />
    )}

      <div className="experience-list">
        {experiences.map((experience) =>
          editingId === experience._id ? (
            <form
              key={experience._id}
              className="experience-edit-card"
              onSubmit={handleUpdate}
            >
              <div className="form-group">
                <label>Company</label>

                <input
                  type="text"
                  name="company"
                  value={editData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Role</label>

                <input
                  type="text"
                  name="role"
                  value={editData.role}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>

                  <input
                    type="text"
                    name="startDate"
                    value={editData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>

                  <input
                    type="text"
                    name="endDate"
                    value={editData.endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>

                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label>
                  Achievements
                </label>

                <textarea
                  name="achievements"
                  value={
                    editData.achievements
                  }
                  onChange={handleChange}
                  rows={5}
                  placeholder="One achievement per line"
                />
              </div>

              <div className="form-group">
                <label>
                  Technologies
                </label>

                <input
                  type="text"
                  name="technologies"
                  value={
                    editData.technologies
                  }
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Display Order
                  </label>

                  <input
                    type="number"
                    name="displayOrder"
                    value={
                      editData.displayOrder
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="isCurrent"
                      checked={
                        editData.isCurrent
                      }
                      onChange={
                        handleChange
                      }
                    />

                    Current Position
                  </label>
                </div>
              </div>

              <div className="experience-item__actions">
                <button
                  type="submit"
                  className="save-btn"
                >
                  Update Experience
                </button>

                <button
                  type="button"
                  className="action-btn"
                  onClick={
                    handleCancel
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              key={experience._id}
              className="experience-item"
            >
              <div className="experience-item__info">
                <h3>
                  {experience.company}
                </h3>

                <p>
                  {experience.role}
                </p>

                <span>
                  {
                    experience.startDate
                  }{" "}
                  -{" "}
                  {experience.endDate}
                </span>
              </div>

              <div className="experience-item__actions">
                <button
                  className="action-btn"
                  onClick={() =>
                    handleEdit(
                      experience
                    )
                  }
                >
                  Edit
                </button>

                <button className="action-btn delete" onClick={() => handleDelete(experience._id)}>
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default ExperienceForm;