import apiClient from "../api/apiClient";

export const login = async (email, password) => {
    try {
        const response = await apiClient.post("/admin/login", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};