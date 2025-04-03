import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { GlobalStyles } from "../../constants/style";
import { useNavigation } from "@react-navigation/native";
import { OtpInput } from "react-native-otp-entry";
import { otpVerification, registerOtpVerification, Usertoken } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScreenWidth } from "@rneui/base";
import { getFcmToken } from "../notification/notificationItem";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { selectUserID } from "../../contract/utility/redux/profile";


const { width, height } = Dimensions.get("window");

export default function Otp({ route }:{route:any }) {
 const [isToken, setIsToken] = useState('');
 
   
   const [userID, setUserID] = useState('');

 useEffect(() => {
   const checkLoginStatus = async () => {
     try {
       const storedToken = await AsyncStorage.getItem('authUser');
       if (storedToken) {
         const decodedToken: any = jwtDecode(storedToken);
         if (decodedToken.userId) {
           setUserID(decodedToken.userId);
           console.log('dsdsds', decodedToken);
         } else {
           console.error('❌ JWT missing userId!');
         }
       }
     } catch (error) {
       console.error('Error reading token:', error);
     }
   };

   checkLoginStatus();
 }, []);

 useEffect(() => {
  const fetchFcmToken = async () => {
    if (userID) {
      console.log('🚀 Dispatching Usertoken with userID:', userID);
      const fcmToken = await getFcmToken();

      if (fcmToken) {
        console.log('✅ FCM Token Retrieved:', fcmToken);
        dispatch(Usertoken(userID, fcmToken)); 
        dispatch(selectUserID(userID));
      } else {
        console.warn('⚠️ FCM token retrieval failed');
      }
    }
  };

  fetchFcmToken();
}, [userID]);


  const [loading, setLoading] = useState(false);
  const { data } = route.params;
  console.log("dsf",data)
  const dispatch: any = useDispatch();
  const navigation: any = useNavigation();
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState(""); // State for success/error message
  const [isError, setIsError] = useState(false);

  const send = useSelector((state: any) => state.LoginReducer?.token);
console.log('redux', send);

  const navigateToContractor = (type:any ) => {
    type === "home"
      ? navigation.navigate("Home")
      : navigation.navigate("Register");
  };

  const signIn = async () => {
    try {
      setLoading(true);
      setStatusMessage('');
      setIsError(false);
      const values = {email: data.email, otp};
      const resp =
        data.type === 'register'
          ? await dispatch(registerOtpVerification(values, navigation,setUserID))
          : await dispatch(otpVerification(values, navigation,setUserID));
  
      if (resp.error) {
        setIsError(true);
        setStatusMessage(
          'Verification failed. Please check your OTP and try again.',
        );
        setLoading(false);
        return;
      }
  
      setStatusMessage(
        data.type === 'register'
          ? 'Registration successful!'
          : 'Login successful!',
      );
  
      if (!userID) {
        console.log('DSfs', userID);
        console.error('OTP verification response missing userID');
        setStatusMessage('Verification succeeded but userID is missing.');
        setLoading(false);
        return;
      }
  
      // Get FCM Token only once
      const fcmToken: any = await getFcmToken();
  
      if (fcmToken) {
        console.log('🚀 Dispatching Usertoken:', {userID, fcmToken});
        await dispatch(Usertoken(userID, fcmToken)); // ✅ Pass the token correctly
        Alert.alert('Success', `FCM Token sent: ${fcmToken}`);
      } else {
        console.warn('⚠️ FCM token retrieval failed');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setIsError(true);
      setStatusMessage('Wrong OTP');
    } finally {
      setLoading(false);
    }
  };
  
  const { width, height } = Dimensions.get("screen");

  return (
    <ImageBackground
      source={require("../../assets/images/otp_1_11zon.png")}
      style={styles.backgroundImage}
    > 
    <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon
              name="chevron-left"
              size={24}
              color={GlobalStyles.colors.primary}
            />
          </TouchableOpacity>
      <View style={styles.figmaView}>
        {/* <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        extraScrollHeight={100} > */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 20 }}>
            <View>
              <Text style={styles.Join} allowFontScaling={false}>OTP Verification</Text>
            </View>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={GlobalStyles.colors.primary}
                />
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.instructionText}allowFontScaling={false}>
                We've sent you a 4-digit verification code on
              </Text>
              <Text style={styles.instructionText2}>
       {data?.email || 'No Email Provided'}
      </Text>
              <View style={styles.inputContainer}>
                <OtpInput
                  numberOfDigits={4}
                  //focusColor={GlobalStyles.colors.primary}
                  focusStickBlinkingDuration={500}
                  onTextChange={(text) => setOtp(text)}
                  onFilled={(text) => setOtp(text)}
                  theme={{
                    containerStyle: styles.container,
                    pinCodeContainerStyle: {
                      height: 60,
                      width: 60,
                    },
                  }}
                />
                {statusMessage !== "" && (
                  <Text
                    style={[
                      styles.statusMessage,
                      {
                        color: statusMessage.includes("successful")
                          ? "green"
                          : "red",
                        },
                    ]}
                  >
                    {statusMessage}
                  </Text>
                )}
                <View style={styles.buttonContainer}>
                 <Button
                       onPress={signIn}
                       title={
                         <Text allowFontScaling={false} style={{ fontWeight: "500", fontSize: 16,color:'white' }}>
                           {data.type === "register" ? "Register" : "Login"}
                         </Text>
                       }
                       buttonStyle={[styles.loginButton, ]}
                       containerStyle={styles.buttonContainerStyle}
                             />
                </View>
                <View style={{margin:0,marginBottom:10,bottom:15}}>
                  <Text style={{fontWeight:"bold",fontSize:13}}>
                    In case OTP is not received, please check your spam folder
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                 {data.type !== "register" && (
                 <Text style={styles.registerText} allowFontScaling={false}>
                 Don’t have an account?
                </Text>
                       )}

                   {data.type !== "register" && (
                      <Text
                          style={[styles.registerLink,]} 
                       onPress={() => navigateToContractor("Register")}
                       allowFontScaling={false}
                          >
                         Register Now
                          </Text>
                            )}
                         </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </KeyboardAwareScrollView> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  backgroundImage: {
    flex: 1, // Make sure the image background takes up the full screen
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "rgb(0, 0, 0)",
  },
  figmaView: {
    position: "absolute",
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: 10,
    backgroundColor: "white", // Semi-transparent background for visibility
    padding: 10, // Add padding inside the view
    opacity: 1, // Ensure opacity is set to 1 for visibility
  },
  Join: {
    textAlign: "center",
    fontFamily: "Unbounded", // Font family
    fontWeight: "700", // Bold weight
    fontSize: 20, // Font size
    lineHeight: 24.8, // Line height for proper spacing
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  textContainer: {
    paddingTop: 10,
  },

  instructionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#838BA1",
    textAlign: "center",
  },
  inputContainer: {
marginTop:10
  },
  buttonContainer: {
    alignItems: "center",
   marginTop:50
  },
  loginButton: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 10, 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    elevation: 3,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainerStyle: {
    width: width * 0.8,
    height: 45,
    marginVertical: 25,
  },
  registerText: {
    fontSize: 15,
    marginBottom: 10,
  },
  registerLink: {
    color: GlobalStyles.colors.primary,
   marginLeft:5

  },

  statusMessage: {
    fontSize: 14,
    textAlign: "left",
    marginVertical: 10,
    top: "25%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: ScreenWidth * 0.7,
    alignSelf: "center",
    paddingTop: 10,
  },
  backButton: {
    position: 'absolute',
   top:50,
    left: 20, 
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  registerText2:{
    
  },
  instructionText2: {
    fontSize: 12,
    fontWeight: "500",
    marginTop:10,
    color: "balck",
    textAlign: "center",
  },
});


