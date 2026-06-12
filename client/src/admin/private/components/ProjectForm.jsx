import { useEffect, useState } from "react";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../../../services/projects.service";
import AddProject, { ProjectFields } from "./AddProject";
import { emptyProject, toPayload } from "./projectForm.utils";
import "./ExperienceForm.css";
import "./ProjectForm.css";

const toFormData = (project) => ({
  title: project.title ?? "",
  subtitle: project.subtitle ?? "",
  description: project.description ?? "",
  technologies: (project.technologies ?? []).join(", "),
  highlights: (project.highlights ?? []).join("\n"),
  github: project.github ?? "",
  liveDemo: project.liveDemo ?? "",
  featured: Boolean(project.featured),
});

const ProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(emptyProject);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(() => setError("Could not load projects."));
  }, []);

  const handleChange = ({ target }) => {
    setEditData((current) => ({
      ...current,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const updatedProject = await updateProject(editingId, toPayload(editData));
      setProjects((current) => current.map((project) => (
        project._id === editingId ? updatedProject : project
      )));
      setEditingId(null);
    } catch {
      setError("Could not update the project.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      setProjects((current) => current.filter((project) => project._id !== id));
    } catch {
      setError("Could not delete the project.");
    }
  };

  const handleCreate = async (projectData) => {
    setError("");

    try {
      const createdProject = await addProject(projectData);
      setProjects((current) => [...current, createdProject]);
      setShowAddForm(false);
    } catch {
      setError("Could not create the project.");
    }
  };

  return (
    <section className="admin-card">
      <div className="admin-card__header">
        <div>
          <h2>Projects</h2>
          <p>Manage the projects shown in your project constellation.</p>
        </div>
        <button className="save-btn" onClick={() => setShowAddForm(true)}>Add Project</button>
      </div>

      {error && <p className="project-admin-error">{error}</p>}

      {showAddForm && (
        <AddProject onSubmit={handleCreate} onCancel={() => setShowAddForm(false)} />
      )}

      <div className="experience-list">
        {projects.map((project) => editingId === project._id ? (
          <form key={project._id} className="experience-edit-card" onSubmit={handleUpdate}>
            <ProjectFields data={editData} onChange={handleChange} />
            <div className="experience-item__actions">
              <button type="submit" className="save-btn">Update Project</button>
              <button type="button" className="action-btn" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div key={project._id} className="experience-item">
            <div className="experience-item__info">
              <h3>{project.title} {project.featured && <span className="project-admin-featured">Featured</span>}</h3>
              <p>{project.subtitle}</p>
              <span>{(project.technologies ?? []).join(" · ") || "No technologies added"}</span>
            </div>
            <div className="experience-item__actions">
              <button
                className="action-btn"
                onClick={() => {
                  setEditingId(project._id);
                  setEditData(toFormData(project));
                }}
              >
                Edit
              </button>
              <button className="action-btn delete" onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectForm;
