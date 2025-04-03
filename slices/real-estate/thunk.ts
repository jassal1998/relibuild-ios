import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
import { realEstateSuccess, apiError } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllProperties = () => async (dispatch: any) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/real-estate/v2/get-properties`); // Access the response data here
        console.log(response.data.result, "mmresponse")
        // Dispatch action for successful logi
        dispatch(realEstateSuccess(response.data.result))

        return response;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};










