import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  proposal: {},
  searchContractors: [],
  searchHomeowners:[],
  homeOwnerData: [],
  contractorData: [],
  blueprint:"",
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
  contractId:"",
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload; // Assign error message directly
      state.loading = false; // Set loading to false
      state.errorMsg = true; // Set error message flag to true
    },
    setReduxContractId(state,action){
state.contractId = action.payload
    },
 
    proposalSuccess(state, action) {
      state.proposal = action.payload;
      state.loading = false; // Set loading to false
      state.errorMsg = false; // Set error message flag to false
    },
     searchSuccess(state, action) {
      state.searchHomeowners = action.payload;
      state.loading = false; // Set loading to false
      state.errorMsg = false; // Set error message flag to false
    },
     searchContractorSuccess(state, action) {
      state.searchContractors = action.payload;
      state.loading = false; // Set loading to false
      state.errorMsg = false; // Set error message flag to false
    },
    searchHomeOwnerSuccess(state, action) {
       state.homeOwnerData = action.payload;
      state.loading = false; // Set loading to false
      state.errorMsg = false;
    },
    searchContractorResult(state, action) {
       state.contractorData = action.payload;
      state.loading = false; // Set loading to false
      state.errorMsg = false;
    },
    docSuccess(state, action) {
       state.blueprint = action.payload;
      state.loading = false; // Set loading to false
      state.errorMsg = false;
    },
    
  },
});

export const {
  apiError,
  proposalSuccess,
  searchSuccess,
  searchHomeOwnerSuccess,
  searchContractorSuccess,
  searchContractorResult,
  docSuccess,setReduxContractId
} = proposalSlice.actions;

export default proposalSlice.reducer;

export const selectSearchHomeOwners = (state:any) => state.proposal?.searchHomeowners
export const selectHomeOwnerData = (state:any) => state.proposal?.homeOwnerData
export const selectContractId = (state:any) => state.proposal?.contractId