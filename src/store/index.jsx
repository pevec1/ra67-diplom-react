import { configureStore } from "@reduxjs/toolkit";
import valueReducer from "../slices/sliceMag";

export default configureStore({
  reducer: {
    products: valueReducer,
    category: valueReducer,
    categories: valueReducer,
  },
});
