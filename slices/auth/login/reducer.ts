import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  fcmToken:null,
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = action.payload
    },
    reset_login_flag(state) {
      state.error = ""
      state.loading = false;
      state.errorMsg = false;
    },
     setfcmToken(state, action) {
      state.fcmToken = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    
    
  },

});

export const {
  apiError,
  setfcmToken,
  loginSuccess,
  logoutUserSuccess,
  reset_login_flag
} = loginSlice.actions

export default loginSlice.reducer