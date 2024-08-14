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
  products: [],
  category: [],
  categories: [],
  loading: false,
  error: "",
};

export const sliceMag = createAppSlice({
  name: "products",
  initialState,
  selectors: {
    usersList: (state) => state.products,
    usersCategory: (state) => state.category,
    usersCategories: (state) => state.categories,
    usersError: (state) => state.error,
    usersLoading: (state) => state.loading,
  },
  reducers: (create) => ({
    fetchTopSales: create.asyncThunk(
      async (products, { rejectWithValue }) => {
        try {
          const response = await fetch(
            "https://backdiplomra67.axareact.ru/api/top-sales"
          );

          if (!response.ok) {
            return rejectWithValue("Loading top sales products error!");
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
          state.products = action.payload;
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
    fetchCategories: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const response = await fetch(
            "https://backdiplomra67.axareact.ru/api/categories"
          );

          if (!response.ok) {
            return rejectWithValue("Loading categories error!");
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
          state.categories = action.payload;
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
    fetchCategory: create.asyncThunk(
      async (value, { rejectWithValue }) => {
        try {
          const response = await fetch(
            "https://backdiplomra67.axareact.ru/api/items?categoryId=" + value
          );

          if (!response.ok) {
            return rejectWithValue("Loading categories error!");
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
          state.category = action.payload;
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

export const { fetchTopSales, fetchCategories, fetchCategory } =
  sliceMag.actions;
export default sliceMag.reducer;
