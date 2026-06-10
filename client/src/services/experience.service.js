import apiClient from "../api/apiClient";

export const getExperiences = async () => {
    const response = await apiClient.get("/experience");

    return response.data;
}

export const getExperienceById = async (id) => {
    const response = await apiClient.get(`/experience/${id}`);

    return response.data;
}

export const createExperience = async (experienceData) => {
    const response = await apiClient.post("/experience", experienceData);

    return response.data;
}

export const updateExperience = async (id, experienceData) => {
    const response = await apiClient.put(`/experience/${id}`, experienceData);

    return response.data;
}

export const deleteExperience = async (id) => {
    const response = await apiClient.delete(`/experience/${id}`);

    return response.data;
}