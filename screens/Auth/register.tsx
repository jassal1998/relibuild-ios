import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from 'react-native';
import {Input, Icon, Button} from '@rneui/themed';
import {GlobalStyles} from '../../constants/style';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../../slices/thunk';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator, RadioButton} from 'react-native-paper';

import Toast from 'react-native-toast-message';
import {Animated, FlatList} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {Dropdown} from 'react-native-element-dropdown';
import CustomToast from '../../GlobalComponents/Toast';
const {width, height} = Dimensions.get('window');

export default function Register() {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [email, setEmail] = useState('');
  const [refBy, setRefBy] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [licError, setLicError] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [role, setRole] = useState<boolean>(false);
  const [userType, setUserType] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [isGenderModalVisible, setGenderModalVisible] = useState(false);
  const [agentLicNumber, setAgentLicNumber] = useState('');
  const [isRoleModalVisible, setRoleModalVisible] = useState(false);

  const roleOptions = [
    {label: 'Homeowner', value: 'homeowner'},
    {label: 'Agent', value: 'real_estate_agent'},
    {label: 'Broker', value: 'broker'},
  ];

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Rather Not Say', value: 'dontShare'},
  ];

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const getSignUpOtp = async () => {
    if (name === '') {
      setFirstNameError('Please Enter Your First Name.');
      return;
    }
    if (lastName === '') {
      setLastNameError('Please Enter Your Last Name.');
      return;
    }

    if (!validateEmail(email)) return;

    if (phone === '') {
      setMobileError('Please Enter Your Mobile Number.');
      return;
    }

    if (gender === '') {
      setGenderError('Please select your gender.');
      return;
    }

    if (userType === '') {
      setUserTypeError('Please select your user type.');
      return;
    }

    if (
      (userType === 'real_estate_agent' || userType === 'broker') &&
      agentLicNumber === ''
    ) {
      setLicError('Please Enter your Licence.');
      return;
    }

    setLoading(true);
    const values = {
      email,
      password,
      name,
      gender,
      lastName,
      phone,
      userType,
      agentLicNumber,
      refBy,
    };
    try {
      await dispatch(signUpUser(values, navigation));
    } catch (error) {
      console.error('Sign-up error:', error);
      setToastMessage('User Already Exist');
      setToastVisible(true);

      // setEmailError("User Already Exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/image_2_11zon.png')}
      style={styles.backgroundImage}>
      {/* <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon
          name="chevron-left"
          size={24}
          color={GlobalStyles.colors.primary}
        />
      </TouchableOpacity> */}
      <View style={styles.figmaView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAwareScrollView
            contentContainerStyle={{flexGrow: 1}}
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === 'ios' ? 100 : 50}
            keyboardShouldPersistTaps="handled">
            <View>
              <Text style={styles.Join}>Join Us !!</Text>
            </View>
            <View>
              <Input
                allowFontScaling={false}
                placeholder="First Name"
                onChangeText={setName}
                errorMessage={firstNameError}
                inputStyle={GlobalStyles.logininputStyle}
                inputContainerStyle={GlobalStyles.loginInputContainer}
              />
              <Input
                allowFontScaling={false}
                placeholder="Last Name"
                errorMessage={lastNameError}
                onChangeText={setLastName}
                inputStyle={GlobalStyles.logininputStyle}
                inputContainerStyle={GlobalStyles.loginInputContainer}
              />
              <Input
                allowFontScaling={false}
                placeholder="Email"
                onChangeText={setEmail}
                keyboardType="email-address"
                errorMessage={emailError}
                inputStyle={GlobalStyles.logininputStyle}
                inputContainerStyle={GlobalStyles.loginInputContainer}
              />
              <Input
                onChangeText={setPhone}
                keyboardType="numeric"
                inputStyle={GlobalStyles.logininputStyle}
                inputContainerStyle={GlobalStyles.loginInputContainer}
                errorMessage={mobileError}
                leftIcon={<Text style={styles.countryCode}>+1</Text>}
                placeholder="Mobile"
              />
              <View style={{marginBottom: 15}}>
                <Dropdown
                  style={[GlobalStyles.loginInputContainer]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={genderOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  value={gender}
                  onChange={item => {
                    setGender(item.value);
                  }}
                />
                {genderError !== '' ? (
                  <View style={{marginLeft: 18, marginTop: 4}}>
                    <Text style={{color: 'red'}}>{genderError}</Text>
                  </View>
                ) : null}
              </View>
              <View style={{marginBottom: 15}}>
                <Dropdown
                  style={[GlobalStyles.loginInputContainer]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={roleOptions}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select User Type"
                  value={userType}
                  onChange={item => {
                    setUserType(item.value);
                  }}
                />
                {userTypeError !== '' ? (
                  <View style={{marginLeft: 18, marginTop: 4}}>
                    <Text style={{color: 'red'}}>{userTypeError}</Text>
                  </View>
                ) : null}
              </View>

              {userType === 'real_estate_agent' || userType === 'broker' ? (
                <Input
                  allowFontScaling={true}
                  placeholder="Enter Your Licence Number"
                  onChangeText={setAgentLicNumber}
                  keyboardType="default"
                  errorMessage={licError}
                  inputStyle={GlobalStyles.logininputStyle}
                  inputContainerStyle={GlobalStyles.loginInputContainer}
                />
              ) : null}
              <Input
                allowFontScaling={true}
                placeholder="Ref By"
                onChangeText={setRefBy}
                keyboardType="default"
                inputStyle={GlobalStyles.logininputStyle}
                inputContainerStyle={GlobalStyles.loginInputContainer}
              />
            </View>

            <View style={styles.buttonContainer}>
              {/* {genderError ? <Text style={styles.errorText}>{genderError}</Text> : null} */}
              <Button
                onPress={getSignUpOtp}
                title="Register"
                titleStyle={{fontWeight: '500', fontSize: 16}}
                buttonStyle={[styles.loginButton, {padding: 5}]}
                containerStyle={styles.buttonContainerStyle}
                disabled={password !== confirmPassword}
              />
              {/* Loader */}
              {loading && (
                <View style={styles.loaderContainer}>
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              )}
              <CustomToast
                visible={toastVisible}
                message={toastMessage}
                duration={15000}
              />
              <View style={styles.row}>
                <Text style={styles.registerText} allowFontScaling={false}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text style={styles.registerLink} allowFontScaling={false}>
                    Login Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // Make sure the image background takes up the full screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: 'rgb(0, 0, 0)',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContainerView: {
    flex: 1, // Makes sure the scroll content takes up available space
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1, // Ensure the container takes up available space

    padding: 10,
  },
  figmaView: {
    position: 'absolute',
    width: '90%',

    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    opacity: 1,
  },
  Join: {
    fontFamily: 'Unbounded',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24.8,
  },

  countryCode: {
    fontSize: 16,
    width: 30,
    color: '#000',
    fontWeight: 'bold',
  },

  phoneInput: {
    fontSize: 16,
    color: '#000',
  },

  // container: {
  //   width: "91%",
  //   alignSelf: "center",
  //   marginBottom: 15,
  // },

  inputWrapper: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 12,
    marginBottom: 10,

    fontWeight: 'bold',
  },

  buttonContainer: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: GlobalStyles.colors.primary,

    borderRadius: 10, // Rounded corners for a modern look
    paddingVertical: 12, // Vertical padding for button height
    paddingHorizontal: 30, // Horizontal padding for button width
    elevation: 3, // Adds a subtle shadow on Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonContainerStyle: {
    width: width * 0.8, // Ensures the button is responsive
    marginBottom: 15, // Space below the button
  },
  loaderContainer: {
    bottom: '200%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 10, // Standard font size

    bottom: 10, // Space above the register text
    textAlign: 'center',
  },
  registerLink: {
    marginBottom: 20,
    fontSize: 10,
    fontWeight: '600', // Semi-bold for emphasis
    marginLeft: 5,
    color: GlobalStyles.colors.primary,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20, // Adjust as needed to position the back button
    borderWidth: 1,
    borderColor: '#E8ECF4',
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Optional: semi-transparent background for the button
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    position: 'absolute',
    bottom: '20%', // Places the modal at 20% from the bottom
    alignSelf: 'center', // Centers horizontally
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 12,
    color: '#333',
  },

  // pickerButtonText: {
  //   fontSize: 16,
  //   color: "#333",
  // },

  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20, // Makes the button round
    elevation: 5, // Adds shadow on Android
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
