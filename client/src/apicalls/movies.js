const { axiosInstance } = require(".");

//  Add a new Movie

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/movies/add-movie", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get all movies

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/api/movies/get-movies");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// update a movie

export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/movies/update-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//  Delete a movie

export const deleteMovie = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/movies/delete-movie",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Get movie by id

export const getMovieById = async (id) => {
  try {
    const response = await axiosInstance.get(
      "/api/movies/get-movie-by-id/${id}"
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
