import apiClient from "../api/apiClient";

export const getProjects = async () => {
  try {
    const response = await apiClient.get("/projects");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};

export const addProject = async (projectData) => {
  try {
    const response = await apiClient.post("/projects", projectData);
    return response.data.data;
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await apiClient.put(`/projects/${id}`, projectData);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await apiClient.delete(`/projects/${id}`);
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }
};