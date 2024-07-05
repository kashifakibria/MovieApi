React Components Redux API
+---------------------------+ +---------------------------+ +------------------+
| | | | | |
| MovieList Mounts | | Store Initialization | | |
| +---------------------+ | | +---------------------+ | | |
| | useSelector | | | | Initial State: | | | |
| | (Subscribe to |<----------->| | movies: [], | | | |
| | movies state) | | | | status: 'idle' | | | |
| +---------------------+ | | +---------------------+ | | |
| | | | | | |
| v | | | | |
| +---------------------+ | | +---------------------+ | | |
| | Initial Render | | | | Wait for Actions | | | |
| | (Empty movie list) | | | +---------------------+ | | |
| +---------------------+ | | ^ | | |
| | | | | | | |
| v | | +---------------------+ | | |
| +---------------------+ | | | Action Received | | | |
| | useEffect | | | | (FETCH_MOVIES) | | | |
| | (Dispatch |---------->|| +---------------------+ | | |
| | FETCH_MOVIES) | | | | | | |
| +---------------------+ | | v | | |
| | | | +---------------------+ | | |
| (wait) | | | Thunk Middleware | | | |
| | | | | Initiates API Call |------------->| GET /movies |
| | | | +---------------------+ | | |
| | | | | | | | |
| | | | (wait) | | v |
| | | | | | | Process Request |
| | | | v | | | |
| | | | +---------------------+ | | v |
| | | | | Receive API Response|<----------| Send Response |
| | | | +---------------------+ | | |
| | | | | | +------------------+
| | | | v |
| | | | +---------------------+ |
| | | | | Reducer Processes | |
| | | | | MOVIES_LOADED Action| |
| | | | +---------------------+ |
| | | | | |
| | | | v |
| | | | +---------------------+ |
| | | | | State Updated: | |
| | | | | movies: [ | |
| | | | | {id:1, title: | |
| | | | | "Inception",...}, | |
| | | | | {id:2, title: | |
| | | | | "The Matrix",...} | |
| | | | | ], | |
| | | | | status: 'succeeded' | |
| | | | +---------------------+ |
| | | | | |
| v | | v |
| +---------------------+ | | +---------------------+ |
| | State Change |<-----------| | Notify Subscribers | |
| | Detected | | | +---------------------+ |
| +---------------------+ | | |
| | | | |
| v | | |
| +---------------------+ | | |
| | Re-render | | | |
| | (Show 2 movies) | | | |
| +---------------------+ | | |
| | | | |
| v | | |
| +---------------------+ | | |
| | Update DOM | | | |
| | (Display Inception | | | |
| | and The Matrix) | | | |
| +---------------------+ | | |
| | | |
+---------------------------+ +---------------------------+

Tutorial: Fetching Movies from TMDB API with React and Redux Toolkit

1. Set up the project

First, create a new React project using Create React App:

Install the necessary dependencies:

```bash
npm install @reduxjs/toolkit react-redux axios @mui/material @emotion/react @emotion/styled
```

2. Create the API service

Create a new file `src/services/tmdbApi.js`:

```javascript
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "your_api_key_here"; // Replace with your TMDB API key

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};
```

3. Create the Redux slice

Create a new file `src/store/moviesSlice.js`:

```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../services/tmdbApi";

export const getPopularMovies = createAsyncThunk(
  "movies/getPopular",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPopularMovies();
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
```

4. Set up the Redux store

Create a new file `src/store/store.js`:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});
```

5. Create the MovieList component

Create a new file `src/components/MovieList.js`:

```javascript
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../store/moviesSlice";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const MovieList = () => {
  const dispatch = useDispatch();
  const { popularMovies, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPopularMovies());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <CircularProgress />;
  }

  if (status === "failed") {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (!popularMovies || popularMovies.length === 0) {
    return <Typography>No movies found.</Typography>;
  }

  return (
    <Grid container spacing={3}>
      {popularMovies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {movie.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Release Date: {movie.release_date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieList;
```

6. Update the App component

Update the `src/App.js` file:

```javascript
import React from "react";
import { Box } from "@mui/material";
import ButtonAppBar from "./AppBar";
import PermanentDrawerLeft from "./PermanentDrawer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Counter from "./components/usestatecounterbeautified";
import MovieList from "./components/MovieList";

function App() {
  return (
    <Provider store={store}>
      <Box sx={{ display: "flex" }}>
        <ButtonAppBar />
        <PermanentDrawerLeft />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
            marginTop: "64px", // AppBar height
            marginLeft: "140px", // Drawer width
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            height: "calc(100vh - 64px)", // Full viewport height minus AppBar height
          }}
        >
          <MovieList />
        </Box>
      </Box>
    </Provider>
  );
}

export default App;
```

7. Run the application

Start the development server:

```bash
npm start
```

Now, let's break down what's happening in this implementation:

1. In `tmdbApi.js`, we define a function `fetchPopularMovies` that uses Axios to make an API call to TMDB and fetch popular movies.

2. In `moviesSlice.js`, we create a Redux slice using `createSlice` from Redux Toolkit. We also define an async thunk `getPopularMovies` using `createAsyncThunk`. This thunk calls our API service and handles the async operation.

3. The slice defines the initial state and uses `extraReducers` to handle the different states of the async operation (pending, fulfilled, rejected).

4. In `store.js`, we set up the Redux store and include our movies reducer.

5. The `MovieList` component is where we connect to the Redux store using hooks:

   - We use `useDispatch` to get the dispatch function and call our `getPopularMovies` thunk.
   - We use `useSelector` to access the movies state from the store.
   - In the `useEffect` hook, we dispatch the thunk if the status is 'idle'.
   - We render different UI based on the status (loading, error, or success).

6. Finally, in `App.js`, we wrap our application with the Redux `Provider` and render the `MovieList` component.

This implementation provides a solid foundation for fetching and displaying movies from the TMDB API. It handles loading and error states, and uses Material-UI components for styling. You can expand on this by adding more features like pagination, searching, or displaying movie details.
