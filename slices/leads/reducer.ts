import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  leads: [],
  leadDetails:{},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const leads = createSlice({
  name: "leads",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.errorMsg = true;
    },
    leadSuccess(state, action) {
      state.leads = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    leadDetails(state, action) {
      state.leadDetails = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const {
  apiError,
  leadSuccess,
  leadDetails
} = leads.actions

export default leads.reducer;