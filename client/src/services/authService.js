import axios from "axios";

const API_URL = "http://localhost:3000/api";

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Make sure to return the correct data part of the response
  } catch (error) {
    throw error.response.data; // Ensure error handling returns the response data
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log(response.data.user);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logout = () => {
  localStorage.removeItem("token");
};

export { register, login, logout };
