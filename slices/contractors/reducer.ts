import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  contractors: [],
  contractorsDetail:{},
  error: "", // for error message
  loading: false,
  isUserLogout: false,
  errorMsg: false, // for error
  contractorCount: "",
  contractorCountResult:[]
};

const contractors = createSlice({
  name: "contractors",
  initialState,
  reducers: {
    apiError(state, action) {
      state.error = action.payload.data;
      state.loading = true;
      state.errorMsg = true;
    },
    contractorSuccess(state, action) {
      state.contractors = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    detailContractorSuccess(state, action) {
      state.contractorsDetail = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
     contractorCountAllSuccess(state, action) {
      state.contractorCountResult = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
    contractorCountSuccess(state, action) {
      console.log(action.payload, "action.payload")
      state.contractorCount = action.payload
      state.loading = false;
      state.errorMsg = false;
    },
  },
});

export const {
  apiError,
  contractorSuccess,
  detailContractorSuccess,
  contractorCountAllSuccess,
  contractorCountSuccess
} = contractors.actions

export default contractors.reducer;