import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
console.log(API_BASE_URL, "API_BASE_URLAPI_BASE_URLAPI_BASE_URL")
import { deleteSuccess, isDeleted, apiError } from './reducer';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const create = () => async (dispatch: any) => {
  console.log("In Dispatch")
    const token: any = await AsyncStorage.getItem("authUser");
    let decoded: any = "";
    decoded = jwtDecode(token);
    console.log(token, "token")
    try {
      const response = await axios.post(`${API_BASE_URL}/del-account/v1/create`, {
        userId: decoded.userId
      })
      console.log(response, "response in Response")
        const data = response.data; 
        dispatch(deleteSuccess(data.data));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error;
    }
};


export const cancel = () => async (dispatch: any) => {
  console.log("in nddnnd")
    const token: any = await AsyncStorage.getItem("authUser");
    let decoded: any = "";
    decoded = jwtDecode(token);
    console.log(token, "token")
    try {
      const response = await axios.post(`${API_BASE_URL}/del-account/v1/cancel`, {
        userId: decoded.userId
      })
        const data = response.data; 
        dispatch(deleteSuccess(data.data));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error;
    }
};


export const get = () => async (dispatch: any) => {
    const token: any = await AsyncStorage.getItem("authUser");
    let decoded: any = "";
    decoded = jwtDecode(token);
    console.log(token, "token")
    try {
      const response = await axios.get(`${API_BASE_URL}/del-account/v1/get/${decoded.userId}`)
        const data = response.data; 
        dispatch(isDeleted(data.data.ad_is_del));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error;
    }
};

