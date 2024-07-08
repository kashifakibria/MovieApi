import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "49a5508b99e54cbf67438655e1565e32";

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
