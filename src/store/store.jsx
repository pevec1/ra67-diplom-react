import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { sliceMagRTK } from "../slices/sliceMagRTK";

export const store = configureStore({
  reducer: {
    [sliceMagRTK.reducerPath]: sliceMagRTK.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sliceMagRTK.middleware),
});

setupListeners(store.dispatch);
