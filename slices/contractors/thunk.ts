import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
console.log(API_BASE_URL, "API_BASE_URLAPI_BASE_URLAPI_BASE_URL")
import { contractorSuccess, detailContractorSuccess, apiError, contractorCountSuccess, contractorCountAllSuccess } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getContractor = () => async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/v2/getLimContractors`)
        const data = response.data; // Access the response data here
        console.log(data, "contractor")
        // Dispatch action for successful login
        dispatch(contractorSuccess(data.data));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const getCountContractor = (userType:any, state:any) => async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile/get-users-search-web/${userType}/${state}`)
        const data = response.data; 
        console.log(data.data, "contractor_count")
        console.log(data.contractor_count, "contractor_count")
        // Dispatch action for successful login
        dispatch(contractorCountSuccess(data.contractor_count));
        dispatch(contractorCountAllSuccess(data.data));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Contractor error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const getContractorDetail = (id: string) => async (dispatch: any) => {
    console.log(id, "useruseruser");
    try {
        // Get the token from AsyncStorage
        //const token:any = await AsyncStorage.getItem('authUser');
        //const newStr = token.replace(/^"|"$/g, "");
       // const formattedToken = "Bearer " + newStr;

        // Make the API call with the token
        const response = await axios.get(`${API_BASE_URL}/admin/get-contractors/${id}`);

        const data = response.data; // Access the response data here
        console.log(data, "data")
        // Dispatch action for successful login
        dispatch(detailContractorSuccess(data.data));

        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('API error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};
