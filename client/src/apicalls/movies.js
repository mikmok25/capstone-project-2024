const {axiosInstance} = require('.');

//  Add a new Movie

export const addMovie = async (payload) => { 
    try {
        const response = await axiosInstance.post('/api/movies/add-movie', payload);
        return response.data;
    } catch (error) {
        return error.response;
    }
};