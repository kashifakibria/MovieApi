import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../services/tmdbApi";

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async () => {
    return await fetchPopularMovies();
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMovies = action.payload;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
