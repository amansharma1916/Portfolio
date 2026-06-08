import apiClient from "../api/apiClient";

export const getPortfolioData = async () => {
  const response = await apiClient.get("/portfolio");

  return response.data;
};
