import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
console.log(API_BASE_URL, "API_BASE_URLAPI_BASE_URLAPI_BASE_URL")
import { leadSuccess, leadDetails, apiError } from './reducer';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLeads = () => async (dispatch: any) => {
    const token: any = await AsyncStorage.getItem("authUser");
    let decoded: any = "";
    decoded = jwtDecode(token);
    console.log(token, "token")
    try {
        const response = await axios.get(`${API_BASE_URL}/lead/get-user-lead/${decoded.userId}`)
        const data = response.data; // Access the response data here
        console.log(response, "contractornews")
        // Dispatch action for successful login
        dispatch(leadSuccess(data.data));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const getSingleLeads = () => async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lead/get-single-lead/127`)
        const data = response.data; // Access the response data here
        console.log(data, "contractor")
        // Dispatch action for successful login
        dispatch(leadDetails(data.data));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};
const getDecodeId = async () => {
  const token = await AsyncStorage.getItem("authUser");
  let decoded: any = "";
  if (token !== null) {
    decoded = jwtDecode(token);
  } else {
    console.error("Token is null");
  }
    return decoded.userId;
    
}

