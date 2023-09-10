import { configureStore } from "@reduxjs/toolkit";
import fromReducer from "./slices/formSlice";
export const store = configureStore({
  reducer: {
    form: fromReducer,
  },
});
