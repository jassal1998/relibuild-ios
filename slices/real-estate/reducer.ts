import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [],
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const realEstateReducer = createSlice({
  name: "realEstate",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.result;
      state.loading = true;
      state.errorMsg = true;
    },
    realEstateSuccess(state, action) {
      state.properties = action.payload
      state.loading = false;
      state.errorMsg = false;
    },},
});

export const {
  apiError,
  realEstateSuccess
} = realEstateReducer.actions

export default realEstateReducer.reducer;