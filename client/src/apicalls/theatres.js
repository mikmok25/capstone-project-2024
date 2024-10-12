import { axiosInstance } from ".";

//  Add a new Theatre

export const addTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get all theatres

export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance.get("/api/theatres/get-all-theatres");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//  Get all theatres by owner

export const GetAllTheatresByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-theatres-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Update theatre

export const updateTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/update-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Delete theatre

export const deleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//  Add show

export const addShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/add-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get all shows

export const getAllShowsByTheatre = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/get-all-shows-by-theatre",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Delete Show

export const DeleteShow = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatres/delete-show",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
