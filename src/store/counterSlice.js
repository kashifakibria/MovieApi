import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulated API call
const fetchCount = (amount = 1) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        // 80% success rate
        resolve({ data: amount });
      } else {
        reject(new Error("Failed to fetch count"));
      }
    }, 1000); // 1 second delay
  });
};

export const fetchCountAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchCountAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default counterSlice.reducer;
