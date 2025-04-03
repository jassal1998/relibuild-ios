//Include Both Helper File with needed methods
import axios from "axios";

import { proposalSuccess, apiError, searchSuccess, searchHomeOwnerSuccess, docSuccess, searchContractorSuccess, searchContractorResult } from './reducer';
import { apiUrl } from "../../comman";
export const createProposal = (proposal: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${apiUrl}/proposal/createProposal`, {
        pUserId: "25",
        pContId: proposal.contractorId,
        pProjectId: proposal.projectId,
        pStartDate: proposal.daterange,
        pEndDate: proposal.daterange,
        pBidPrice: proposal.bidPrice,
        pAvailbility: proposal.availability,
        pCoverLetter: proposal.coverLetter
    });
    let data = response.data;
    if (data) {
        dispatch(proposalSuccess(data));
    }
  }
   catch (error) {
    dispatch(apiError('Error on CreateProposal'));
  }
};

export const getProposal = (id: any, contId: any) => async (dispatch: any) => {
  
  try {
    const response = await axios.get(`${apiUrl}/proposal/${id}/${contId}`);
    const data = response.data;
    if (data) {
      dispatch(proposalSuccess(data));
    } else {
      dispatch(apiError("Failed to fetch proposal data: No data received"));
    }
  } catch (error) {
    dispatch(apiError(`Failed to fetch proposal data`));
  }
};

export const searchContractor = (email: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${apiUrl}/proposal/searchContractor`, { email });
    let data = response.data;
    if (data) {
      dispatch(searchContractorSuccess(data))
    } else {
      console.error('Result not found in the response data');
    }
  } catch (error) {
    dispatch(apiError("Result not found in the response data"));
  }
};

export const searchHomeOwner = (email: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${apiUrl}/proposal/searchHomeowner`, { email });
    let data = response.data
    if (data) {
      dispatch(searchSuccess(data.data))
    } else {
      console.error('Result not found in the response data');
    }
  } catch (error) {
    console.log(error)
  }
};

export const searchInspector = (email: any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${apiUrl}/proposal/searchInspector`, { email });
    let data = response.data
    if (data) {
      // dispatch(searchSuccess(data))
    } else {
      console.error('Result not found in the response data');
    }
  } catch (error) {
    dispatch(apiError("Result not found in the response data"));
  }
};
export const getInspectorById = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${apiUrl}/proposal/inspector/${id}`);
    let data = response.data
    if (data) {
      dispatch(searchHomeOwnerSuccess(data))
    } else {
      console.error('Result not found in the response data');
    }
  } catch (error) {
    dispatch(apiError("Result not found in the response data"));
  }
};

export const getHomeOwnerById = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${apiUrl}/proposal/homeowner/${id}`);
    let data = response.data

    if (data) {
      dispatch(searchHomeOwnerSuccess(data?.data))
      return data
    } else {
      console.error('Result not found in the response data');
    }
  } catch (error) {
    dispatch(apiError("Result not found in the response data"));
  }
};

export const getContractorById = (id: any) => async (dispatch: any) => {
  try {
    const response = await axios.get(`${apiUrl}/proposal/contractor/${id}`);
    let data = response.data
    if (data) {
      dispatch(searchContractorResult(data))
    } else {
      console.error('Result not found in the response data');
    }
  } catch (error) {
    dispatch(apiError("Result not found in the response data"));
  }
};


export const sendDocToS3 = (type: any, file: any) => async (dispatch: any) => {
  let formData = null;
  //if (type === 'blueprint') {
    formData = new FormData();
    formData.append('file', file);
  //}
  try {
    const response = await axios.post(`${apiUrl}/proposal/upload/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    let data = response.data;
    if (data) {
      return data[0].url;
    } else {
      console.error(`${type} not uploaded`);
    }
  } catch (error) {
    dispatch(apiError("Result not found in the response data"));
  }
};
