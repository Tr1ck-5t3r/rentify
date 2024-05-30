// propertyService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const propertyService = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllProperties = async () => {
  try {
    const response = await propertyService.get("/properties");
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch properties";
  }
};

export const getPropertyById = async (propertyId) => {
  try {
    const response = await propertyService.get(`/properties/${propertyId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch property";
  }
};

export const createProperty = async (propertyData) => {
  try {
    const response = await propertyService.post("/properties", propertyData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to create property";
  }
};

export const getPropertiesByIds = async (propertyIds) => {
  try {
    const response = await propertyService.post("/properties/listed", {
      properties: propertyIds,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message || "Failed to fetch properties by IDs";
  }
};

// Add more functions for creating, updating, and deleting properties if needed

export default propertyService;
