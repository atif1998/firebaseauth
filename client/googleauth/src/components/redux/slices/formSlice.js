// features/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: { showForm: true },
  reducers: {
    hideForm: (state) => {
      state.showForm = false;
    },
  },
});

export const { hideForm } = formSlice.actions;
export const selectShowForm = (state) => state.form.showForm;
export default formSlice.reducer;
