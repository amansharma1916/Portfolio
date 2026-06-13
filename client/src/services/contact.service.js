import apiClient from "../api/apiClient";

export const sendContactMessage = async (contactData) => {
    const response = await apiClient.post("/contact/send", contactData);

    return response.data;
}

export const getContactMessages = async () => {
    const response = await apiClient.get("/contact/messages");

    return response.data;
}

export const deleteContactMessage = async (id) => {
    const response = await apiClient.delete(`/contact/messages/${id}`);

    return response.data;
}