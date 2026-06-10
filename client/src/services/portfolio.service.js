import apiClient from "../api/apiClient";

export const getPortfolioData = async () => {
  const response = await apiClient.get("/portfolio");

  return response.data;
};

export const updatePortfolioData = async (data) => {
  const response = await apiClient.put("/portfolio", data);

  return response.data;
};