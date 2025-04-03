import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  services: [],
  allServices:[],
  contractors:[],
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const services = createSlice({
  name: "services",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.result;
      state.loading = true;
      state.errorMsg = true;
    },
    serviceSuccess(state, action) {
      state.services = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    allServiceSuccess(state, action) {
      state.allServices = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    contractorSuccess(state, action) {
      state.contractors = action.payload.data
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const {
  apiError,
  serviceSuccess,
  contractorSuccess,
  allServiceSuccess
} = services.actions

export default services.reducer;