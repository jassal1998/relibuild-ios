import axios from "axios";
import API_BASE_URL from "../../constants/apiconfig";
import { serviceSuccess, contractorSuccess, apiError } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getSubcategories = (cateId:any) => async (dispatch: any) => {
    
    try {
        const response = await axios.get(`${API_BASE_URL}/category/get-sub-categories/${cateId}`)
      ; // Access the response data here
        // Dispatch action for successful logi
        return response;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Services error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};


export const submitLead = (inputValues: any, serviceType: any, contId: any) => async (dispatch: any) => {
    console.log(inputValues, "submitLead");
    console.log(serviceType, "serviceType");

    try {
        // Define the request body
        const requestBody: any = {
            email: inputValues.email,
            category: serviceType,
            subCategory: inputValues.serviceReq,
            firstName: inputValues.firstName,
            lastName: inputValues.lastName,
            phone: inputValues.phone,
            userType: "homeowner",
            isActive: true,
            projectName: inputValues.aboutProject,
            projectStatus: "OPEN",
            projectCountry: inputValues.country,
            projectStreetAddress: inputValues.address,
            city: inputValues.city,
            state: inputValues.state,
            zip: inputValues.zipCode,
            cost: inputValues.budgetValue,
            escrow: inputValues.escrow,
            country:inputValues.country,
            videoUrl: inputValues.videoUrl,
            questions: JSON.stringify([
                { label: "Property Type", value: inputValues.propertyType }
            ])
        };

        // Conditionally add contractor-related fields
        if (contId !== null) {
            requestBody.isRequested = true;
            requestBody.contId = contId;
        }
console.log(requestBody, "requestBodyrequestBodyrequestBody")
        // Sending a POST request to the backend
        const response = await axios.post(`${API_BASE_URL}/lead/create`, requestBody);
        
        // Handle the success response
        console.log("Lead created successfully:", response.data);
        return response.data;
    } catch (error: any) {
        // Dispatch action for API error
        dispatch(apiError(error.message));
        console.error('Services error:', error.message);
        throw error; // Rethrow the error to handle it outside
    }
};








