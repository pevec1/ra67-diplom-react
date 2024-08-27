import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from './../slices/searchSlice';

export * from "../slices/api";
export * from "./store";
export default configureStore({
  reducer: {
    search: searchReducer,
  },
});

