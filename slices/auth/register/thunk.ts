import axios from "axios";
import API_BASE_URL from "../../../constants/apiconfig";
import { registerUserSuccessful, apiErrorChange } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";


export const signUpUser = (user:any, navigation: any) => async (dispatch: any) => {
  console.log(user, "useruseruser")
    try {
      const response = await axios.post(`${API_BASE_URL}/account/signup`, {
            firstName:user.name,
            lastName:user.lastName,
            email: user.email,
            phone:user.phone,
            gender:user.gender,
            userType: user.userType,
            roleId:"['dashboard', 'projects', 'createContracts', 'profilesettings']",
            isActive:true
        });
        const data = response.data; // Access the response data here

        // Dispatch action for successful login
        dispatch(registerUserSuccessful(data));

        // Navigate to Otp screen with email data
        navigation.navigate('Otp', { data: { email: user.email, type:'register' } });

        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiErrorChange(error));
        console.error('Login error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const registerOtpVerification = (user: any, navigation: any,setUserID:any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/account/verify-email-otp`, {
      email: user.email,
      otp: user.otp,
      devicer:"mobile"
    });
    let data = response.data;
    if (data && data.data.token) {
      await AsyncStorage.setItem('authUser', data.data.token);
      const decodedToken: any = jwtDecode(data.data.token);
      if (decodedToken.userId) {
        setUserID(decodedToken.userId);
        console.log('dsdsds', decodedToken);
      }
      navigation.navigate('Home');
    } else {
      // Handle invalid response from server
      dispatch(apiErrorChange("Invalid response from server"));
    }
  } catch (error:any) {
    console.log("inerr", error)
    // Handle network errors or other exceptions
    console.error('Error during OTP verification:', error);
    dispatch(apiErrorChange(error.message));
  }
};


