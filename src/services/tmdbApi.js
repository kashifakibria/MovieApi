import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "99e3229cf66e3a5614cab1ba285232ef";

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};
