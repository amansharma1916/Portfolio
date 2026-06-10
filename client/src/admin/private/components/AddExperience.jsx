import { useState } from "react";

const AddExperience = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      company: formData.company,
      role: formData.role,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,

      achievements:
        formData.achievements
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

      technologies:
        formData.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

      displayOrder: Number(
        formData.displayOrder
      ),

      isCurrent: formData.isCurrent,
    };

    onSubmit(payload);
  };

  return (
    <form
      className="experience-edit-card"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label>Company</label>

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Role</label>

        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>

          <input
            type="text"
            name="startDate"
            placeholder="Apr 2026"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>

          <input
            type="text"
            name="endDate"
            placeholder="Jun 2026"
            value={formData.endDate}
            onChange={handleChange}
            disabled={
              formData.isCurrent
            }
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="form-group">
        <label>
          Achievements
        </label>

        <textarea
          name="achievements"
          value={formData.achievements}
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
          value={formData.technologies}
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
            min="1"
            name="displayOrder"
            value={
              formData.displayOrder
            }
            onChange={handleChange}
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isCurrent"
              checked={
                formData.isCurrent
              }
              onChange={handleChange}
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
          Create Experience
        </button>

        <button
          type="button"
          className="action-btn"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddExperience;