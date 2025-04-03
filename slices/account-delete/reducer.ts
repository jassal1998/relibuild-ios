import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  accountDelete: "",
  accountStatus:false,
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const accountDelete = createSlice({
  name: "accountDelete",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.errorMsg = true;
    },
    deleteSuccess(state, action) {
      state.accountDelete = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
      isDeleted(state, action) {
      state.accountStatus = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const {
  apiError,
  deleteSuccess,
  isDeleted
} = accountDelete.actions

export default accountDelete.reducer;