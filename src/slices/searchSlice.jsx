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
  search: "",
  result: [],
  loading: false,
  error: "",
};

export const searchSlice = createAppSlice({
  name: "search",
  initialState,
  selectors: {
    usersSearch: (state) => state.search,
    usersList: (state) => state.result,
    usersError: (state) => state.error,
    usersLoading: (state) => state.loading,
  },
  reducers: (create) => ({
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    fetchSearch: create.asyncThunk(
      async (search, { rejectWithValue }) => {
        try {
          const response = await fetch(
            "https://backdiplomra67.axareact.ru/api/items?q=" + search
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
          state.result = action.payload;
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

export const { setSearch, fetchSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
