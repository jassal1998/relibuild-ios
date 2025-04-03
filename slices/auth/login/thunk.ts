import axios from "axios";
import API_BASE_URL from "../../../constants/apiconfig";
import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag,   setfcmToken} from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from "@react-native-firebase/messaging";
import { selectIsLogin, setIsLogin, setUserID } from "../../../contract/utility/redux/profile";
import { getFcmToken } from "../../../screens/notification/notificationItem";
import { jwtDecode } from "jwt-decode";








export const loginUser = (user: { email: string, password: string }, navigation: any) => async (dispatch: any) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login/login`, {
            email: user.email,
            password: user.password
        });
        const data = response.data; // Access the response data here

      //   await AsyncStorage.setItem('authUser', data.token);
      // await AsyncStorage.setItem('userID', data.userID.toString());
        
        dispatch(loginSuccess(data));

        // Navigate to Otp screen with email data
        navigation.navigate('Otp', { data: { email: user.email } });

        return data;
    } catch (error) {
        // Dispatch action for API error
        dispatch(apiError(error));
        console.error('Login error:', error);
        throw error; // Rethrow the error to handle it outside
    }
};

export const otpVerification = (user: any, navigation: any,setUserID:any) => async (dispatch: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/verify-otp`, {
      email: user.email,
      otp: user.otp,
      device:"mobile"
    });
    let data = response.data;
    if (data && data.data.token) {
      await AsyncStorage.setItem('authUser', data.data.token);
      const decodedToken: any = jwtDecode(data.data.token);
      if (decodedToken.userId) {
        setUserID(decodedToken.userId);
        console.log('dsdsds', decodedToken);
      }
       dispatch(logoutUserSuccess(false));
      navigation.navigate('Home');

    } else {
      // Handle invalid response from server
      dispatch(apiError("Invalid response from server"));
    }
  } catch (error:any) {
    console.log("inerr", error)
    // Handle network errors or other exceptions
    console.error('Error during OTP verification:', error);
    dispatch(apiError(error.message));
  }
};


export const logoutUser = (navigation:any) => async (dispatch: any) => {
  try {
    await AsyncStorage.clear();
      dispatch(logoutUserSuccess(true));
      
      navigation.navigate('Welcome');
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const checkAuthToken = () => async (dispatch: any) => {
  try {
    let authUser = await AsyncStorage.getItem('authUser');
    if (authUser) {
      dispatch(logoutUserSuccess(false))
    }
    else { 
      dispatch(logoutUserSuccess(true))
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch: any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};

// export const getStoredOrNewFcmToken = async () => {
//   try {
//     let fcmToken = await AsyncStorage.getItem("fcmToken");
//     console.log("🔍 Retrieved FCM Token from AsyncStorage:", fcmToken);

//     if (!fcmToken) {
//       console.log("⚠️ No stored token found, fetching new token...");
//       fcmToken = await messaging().getToken();

//       if (fcmToken) {
//         console.log("✅ New FCM Token received:", fcmToken);
//         await AsyncStorage.setItem("fcmToken", fcmToken);
//       } else {
//         console.log("❌ Failed to retrieve new FCM token.");
//       }
//     } else {
//       console.log("✅ Using stored FCM token:", fcmToken);
//     }
//     return fcmToken;
//   } catch (error) {
//     console.error("❌ Error fetching FCM token:", error);
//     return null;
//   }
// };

export const Usertoken = (userID: string, fcmToken: string) => async (dispatch: any) => {
  try {
    if (!userID) {
      console.error('❌ Missing userID!');
      return;
    }

    if (!fcmToken) {
      console.error('❌ FCM token missing! Check Firebase setup.');
      dispatch(apiError('Failed to retrieve FCM token'));
      return;
    }

    console.log('🚀 Sending to backend -> userID:', userID, fcmToken);

    const response = await axios.post(`${API_BASE_URL}/login/v1/mobile-token`, {
      userId: userID,
      token: fcmToken,
    });

    console.log('✅ Backend Response:', response.data);

    if (response.data?.data?.token) {
      await AsyncStorage.setItem('authUser', response.data.data.token);
      console.log('✅ Backend token stored as authUser');
    }

    dispatch(setfcmToken(fcmToken)); // Dispatch to save in Redux if needed
  } catch (error: any) {
    console.error('🚨 API Error:', error.response?.data || error.message);
    dispatch(apiError(error.message));
  }
};
