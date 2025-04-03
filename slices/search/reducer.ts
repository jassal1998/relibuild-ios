import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  mainCategory: [],
  subCategory:[],
  searchContractors:[],
  
  error: "", // for error message
  loading: false,
    errorMsg: false, // for error
 
};

const mainSearch = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.result;
      state.loading = true;
       state.errorMsg = true;
     
    },
    mainCategory(state, action) {
      state.mainCategory = action.payload
      state.loading = false;
         state.errorMsg = false;
    },
    subCategory(state, action) {
      state.subCategory = action.payload
      state.loading = false;
         state.errorMsg = false;
    },
    getSearchCont(state, action) {
      state.searchContractors = action.payload;
      state.loading = false;
    },
    
   
  },
});

export const {
  apiError,
mainCategory,
subCategory,
getSearchCont
} = mainSearch.actions

export default mainSearch.reducer;