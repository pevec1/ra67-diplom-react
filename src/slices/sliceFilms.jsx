import {
  // createSlice,
  // createAsyncThunk,
  buildCreateSlice,
  asyncThunkCreator,
} from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
const initialState = {
  value: [],
  favorite: [],
  loading: false,
  error: "",
}

export const sliceFilms = createAppSlice({
  name: "value",
  initialState,
  selectors: {
    usersList: (state) => state.value,
  },
  reducers: (create) => ({
    fetchFilms: create.asyncThunk(
      async (value, { rejectWithValue }) => {
        try {
          const response = await fetch(
            "http://www.omdbapi.com/?apikey=9713c5e7&s=" + value
          );

          if (!response.ok) {
            return rejectWithValue("Loading users error!");
          }

          return await response.json();
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "1";
        },
        fulfilled: (state, action) => {
          state.value = action.payload;
          state.error = "2";
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
          state.error = "3";
        },
      }
    ),
    fetchFilm: create.asyncThunk(
      async (value, { rejectWithValue }) => {
        try {
          const response = await fetch(
            "http://www.omdbapi.com/?apikey=9713c5e7&i=" + value
          );

          if (!response.ok) {
            return rejectWithValue("Loading users error!");
          }

          return await response.json();
        } catch (e) {
          return rejectWithValue(e);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
          state.error = "1";
        },
        fulfilled: (state, action) => {
          state.value = action.payload;
          state.error = "2";
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        settled: (state) => {
          state.loading = false;
          state.error = "3";
        },
      }
    ),
  }),
});

export const {  fetchFilms, fetchFilm } = sliceFilms.actions;
export default sliceFilms.reducer;
