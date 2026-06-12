import { useState } from "react";
import { emptyProject, toPayload } from "./projectForm.utils";

const AddProject = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyProject);

  const handleChange = ({ target }) => {
    setFormData((current) => ({
      ...current,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(toPayload(formData));
  };

  return (
    <form className="experience-edit-card" onSubmit={handleSubmit}>
      <ProjectFields data={formData} onChange={handleChange} />
      <div className="experience-item__actions">
        <button type="submit" className="save-btn">Create Project</button>
        <button type="button" className="action-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export const ProjectFields = ({ data, onChange }) => (
  <>
    <div className="form-row">
      <div className="form-group">
        <label>Title</label>
        <input name="title" value={data.title} onChange={onChange} required />
      </div>
      <div className="form-group">
        <label>Subtitle</label>
        <input name="subtitle" value={data.subtitle} onChange={onChange} required />
      </div>
    </div>

    <div className="form-group">
      <label>Description</label>
      <textarea name="description" value={data.description} onChange={onChange} rows={4} required />
    </div>

    <div className="form-group">
      <label>Technologies</label>
      <input name="technologies" value={data.technologies} onChange={onChange} placeholder="React, Node.js, MongoDB" />
    </div>

    <div className="form-group">
      <label>Highlights</label>
      <textarea name="highlights" value={data.highlights} onChange={onChange} rows={4} placeholder="One highlight per line" />
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>GitHub URL</label>
        <input type="text" name="github" value={data.github} onChange={onChange} placeholder="https://github.com/..." />
      </div>
      <div className="form-group">
        <label>Live Demo URL</label>
        <input type="text" name="liveDemo" value={data.liveDemo} onChange={onChange} placeholder="https://..." />
      </div>
    </div>

    <div className="form-group checkbox-group">
      <label>
        <input type="checkbox" name="featured" checked={data.featured} onChange={onChange} />
        Featured Project
      </label>
    </div>
  </>
);

export default AddProject;
