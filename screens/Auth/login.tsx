import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
import { GlobalStyles } from "../../constants/style";
import { useNavigation } from "@react-navigation/native";
import { loginUser, Usertoken } from "../../slices/thunk";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const { width, height } = Dimensions.get("window");
export default function Login({ route }:{route:any }) {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { message } = route.params || {};

 



  const navigateToContractor = (type:any ) => {
    type === "Otp"
      ? navigation.navigate("Otp")
      : navigation.navigate("Register");
  };

  const validateEmail = (email:any ) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };
const getOtp = async () => {
  if (!validateEmail(email)) return;

  setLoading(true);
  const values = {email, password};

  try {

    const loginData = await dispatch(loginUser(values, navigation));

    console.log(
      '🔍 Full Login API Response:',
      JSON.stringify(loginData, null, 2),
    );

    if (!loginData) {
      console.error('❌ Login API returned null or undefined');
      setEmailError('Invalid credentials');
      setLoading(false);
      return;
    }

    
    const userToken = loginData.token || loginData.data?.token;
    const userID = loginData.userID || loginData.data?.userID;

    console.log('✅ Extracted Data:', {userToken, userID});

    if (!userToken || !userID) {
      console.error('❌ Missing userID or token from login API');
      setEmailError('Invalid credentials');
      setLoading(false);
      return;
    }

   
  } catch (error) {
    console.error('❌ Login error:', error);
    setEmailError('User Not Found');
  } finally {
    setLoading(false);
  }
};


  return (
    <ImageBackground
      source={require("../../assets/images/image_2_11zon.png")}
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
        extraScrollHeight={100} // Adjust this as needed
      > */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ padding: 10 }}>
            <View>
              <Text style={styles.Join}>Welcome Back !!</Text>
            </View>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={GlobalStyles.colors.primary}
                />
              </View>
            )}
            <View style={styles.inputContainer}>
              <Input
               allowFontScaling={false}
                placeholder="Enter your email"
                inputStyle={GlobalStyles.logininputStyle}
                onChangeText={setEmail}
                onBlur={() => validateEmail(email)}
                inputContainerStyle={GlobalStyles.loginInputContainer}
                keyboardType="email-address"
              />
              {emailError && <Text style={styles.errorText}>{emailError}</Text>}
              <View style={styles.buttonContainer}>
                <Button
                  onPress={getOtp}
                  title={
                     <Text allowFontScaling={false} style={{ fontWeight: '500', fontSize: 16,color:'white' }}>
                       Login
                     </Text>
                   }
                  titleStyle={{ fontWeight: "500", fontSize: 16 }}
                  buttonStyle={[styles.loginButton, { padding: 5 }]}
                  containerStyle={styles.buttonContainerStyle}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Text style={styles.registerText} allowFontScaling={false}>
                 Don’t have an account?
               </Text>
               <Text
                 style={[styles.registerLink, { marginLeft: 5 }]} // Controlled spacing
                 onPress={() => navigateToContractor("Register")}
                 allowFontScaling={false}
               >
                 Register Now
               </Text>
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    height: height * 0.5,
    borderRadius: 10,
    backgroundColor: "white", // Semi-transparent background for visibility
    padding: 10, // Add padding inside the view
    opacity: 1, // Ensure opacity is set to 1 for visibility
  },
  Join: {
    left: 10,
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
  inputContainer: {
    padding: 20,
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: GlobalStyles.colors.primary,

    borderRadius: 10, // Rounded corners for a modern look
    paddingVertical: 12, // Vertical padding for button height
    paddingHorizontal: 30, // Horizontal padding for button width
    elevation: 3, // Adds a subtle shadow on Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainerStyle: {
    width: width * 0.8,
    height: 45,
  },
  registerText: {
    
    fontSize: 14,
    paddingTop: 20,
  },
  registerLink: {
    marginTop:20,
    fontWeight: "600", // Semi-bold for emphasis
    color: GlobalStyles.colors.primary,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
   backButton: {
    position: 'absolute',
   top:50,
    left: 20, // Adjust as needed to position the back button
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: semi-transparent background for the button
  },
});
