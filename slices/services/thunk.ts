import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
import { serviceSuccess,allServiceSuccess, contractorSuccess, apiError } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllServices = () => async (dispatch: any) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/service/getServices`)
      const data = response.data; // Access the response data here
        // Dispatch action for successful login
    
        dispatch(allServiceSuccess(data.result));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const getServices = () => async (dispatch: any) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/service/v2/getLimServices`)
      const data = response.data; // Access the response data here
        // Dispatch action for successful login
    
        dispatch(serviceSuccess(data.result));
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};



export const uploadVideo = (formData: any) => async (dispatch: any) => {
    console.log(formData, "formData");
    try {
        const response = await axios.post(`${API_BASE_URL}/user/upload`, formData);
        const data = response.data; // Access the response data here
        console.log(data, "data");
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const submitQuery = (queryData: any, navigation:any) => async (dispatch: any) => {
    const token:any = await AsyncStorage.getItem('authUser');
    const newStr = token.replace(/^"|"$/g, "");
    const formattedToken = "Bearer " + newStr;
    try {
        const response = await axios.post(`${API_BASE_URL}/user/createQuestion`, {
            userId: 1,
            catId: 2,
            uqQuestion: JSON.stringify(queryData.data),
            uqContractors: JSON.stringify(queryData.selectIds),
            userVideo: queryData.video,
            isEscrow: queryData.data.Escrow
        }, {
            headers: {
                'Authorization': formattedToken
            }
        });
        const data = response.data; // Access the response data here
        navigation.navigate('Thankyou');
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const getNearByContrators = (zipCode: any, navigation:any) => async (dispatch: any) => {
    console.log(zipCode, "zipnnn")
    const radius = 10;
    const token = await AsyncStorage.getItem('authUser');
    if (!token) {
        navigation.navigate('Login');
        return;
    }
    const newStr = token.replace(/^"|"$/g, "");
    const formattedToken = "Bearer " + newStr;
    try {
        // First axios request to get nearby zip codes
        const response1 = await axios.get(
            `${API_BASE_URL}/user/getNearBy/${zipCode}/${radius}`,
            {
                headers: {
                    'Authorization': formattedToken
                }
            }
        );
           console.log(response1, "sdfgh")
        const data1 = response1.data; 
     
        let zipCodes = [];
        if (data1) {
            zipCodes = data1.data.zip_codes.map((zip: any) => zip.zip_code);
        }
        else { 
            navigation.navigate('Login');
            return;
        }
        
   console.log(zipCodes, "data1data1")
        // Second axios request to get contractors
        const response2 = await axios.get(
            `${API_BASE_URL}/user/getContractor/${zipCodes.join(',')}`,
            {
                headers: {
                    'Authorization': formattedToken
                }
            }
        );

        const data2 = response2.data;

        console.log(data2, "Contractors data");
        dispatch(contractorSuccess(data2))
        // Dispatch action with retrieved data if needed

    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        navigation.navigate('Login');
        throw error;
    }
};


