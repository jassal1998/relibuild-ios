import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  token: '',
  userID: '',
  userType: '',
  spinner: false,
  userDetails: '',
  userID_OTHER: '',
  userDetails_OTHER: '',
};

export const profileDetial = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      console.log('ddddddd', action.state);
      state.isLogin = action.payload;
    },
    setSpinnerLoading: (state, action) => {
      state.spinner = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserDetails_OTHER: (state, action) => {
      state.userDetails_OTHER = action.payload;
    },
    setToken: (state, action) => {
      console.log(action, "action.payloadaction.payload");
      state.token = action.payload;
     
    },
    setUserID: (state, action) => {
      console.log(action, 'actioddddn.payloadaction.payload');
      state.userID = action.payload;
    
    },
    setUserID_OTHER: (state, action) => {
      state.userID_OTHER = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    loadUserFromStorage: (state, action) => {
      state.token = action.payload.token || '';
      state.userID = action.payload.userID || '';
      state.isLogin = !!action.payload.token;
    },
  },
});

export const {
  setUserID_OTHER,
  setUserDetails_OTHER,
  setIsLogin,
  setUserDetails,
  setUserType,
  setUserID,
  setToken,
  setSpinnerLoading,
  loadUserFromStorage,
} = profileDetial.actions;

export const selectIsLogin = state => state.profile?.isLogin;
export const selectToken = state => state.profile?.token;
export const selectUserID = state => state.profile?.userID;
export const selectUserID_OTHER = state => state.profile?.userID_OTHER;
export const selectUserType = state => state.profile?.userType;
export const selectSpinnerLoading = state => state.profile?.spinner;
export const selectUserDetails = state => state.profile?.userDetails;
export const selectUserDetails_OTHER = state =>
  state.profile?.userDetails_OTHER;

export default profileDetial.reducer;
