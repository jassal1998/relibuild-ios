import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
import {mainCategory,apiError, subCategory,getSearchCont} from "./reducer"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSearch = () => async (dispatch: any) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/service/getServices`)
      const data = response.data; // Access the response data here
        // Dispatch action for successful login
    dispatch(mainCategory(data.result))
    //    console.log(data,"maincategory")
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};


export const getSubCategory = (id: any) => async (dispatch: any) => {
    console.log(id, "ddddd")
    try {
        const response = await axios.get(`${API_BASE_URL}/category/get-sub-categories/${id}`)
      const data = response.data; 
    dispatch(subCategory (data.result))
    //    console.log(data,"maincategory")
        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const searchContractor = (ids: any) => async (dispatch: any) => {
    console.log(ids, "sss")
    try {
        const response = await axios.post(`${API_BASE_URL}/company/search-contractor`, {
            skills: ids
        });
        const data = response.data.result
        console.log(data, "dddddssss")
        dispatch(getSearchCont(data))
        return response;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

//   export const getCategory = () => async (dispatch: any) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/user/v2/getLimContractors`)
//         const data = response.data; // Access the response data here
//         // console.log(data, "getCategory")
//         // Dispatch action for successful login
//         dispatch(subCategory(data.data));
//         return data;
//     } catch (error) {
//         // Dispatch action for API error
//         dispatch(apiError(error));
//         console.error('Contractor error:', error);
//         throw error; // Rethrow the error to handle it outside
//     }
// };
