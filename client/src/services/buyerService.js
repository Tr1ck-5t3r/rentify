import axios from "axios";

export const createInterest = async (interestData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/interests/create",
      interestData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating interest:", error);
    throw error;
  }
};

export const getInterestsByPropertyId = async (propertyId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/interests/${propertyId}`
    );
    let propertyids = [];
    response.data.forEach((interest) => {
      propertyids.push(interest.propertyId);
    });

    return propertyids;
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
};

export const getInterestsByBuyerId = async (buyerId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/interests/${buyerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching interests:", error);
    throw error;
  }
};

export const deleteInterest = async (interestId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/interests/${interestId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting interest:", error);
    throw error;
  }
};
