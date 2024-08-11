import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "../slices/sliceFilms";

export default configureStore({
  reducer: {
    value: valueReducer,
  },
});
