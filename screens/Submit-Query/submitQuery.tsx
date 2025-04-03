import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Alert,
  ActivityIndicator,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  useColorScheme,
} from 'react-native';
import {Button, IconButton, Snackbar} from 'react-native-paper';
import {Slider, Switch} from 'react-native-elements';
import Dropdown from '../../GlobalComponents/dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import API_BASE_URL from '../../constants/apiconfig';
import {GlobalStyles} from '../../constants/style';
import ThankyouModal from '../../GlobalComponents/modal-box';
import {submitForm} from '../../slices/redux/formSlice/thunk.ts';
import {getSubcategories, submitLead, Usertoken} from '../../slices/thunk.ts';
import {RootState, AppDispatch} from '../../slices/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, Icon} from '@rneui/base';

const {width, height} = Dimensions.get('window');


export const requestPermissionsvediio = async () => {
  if (Platform.OS === 'android') {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ];
    const granted = await PermissionsAndroid.requestMultiple(permissions);

    return (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED
    );
  }
  return true; // iOS auto-handles permissions
};








const SubmitQuery = ({route}: {route: any}) => {
  const dispatch: any = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  console.log(route);

  let serviceName: any = route?.params?.data?.serviceName;
  let contId: any = route?.params?.data?.contractorId;
  console.log('sdsssdasd', serviceName);

  useEffect(() => {
    console.log(route.params.data, 'nkdnksdnsdkn');
    if (route.params && route.params.data.serviceId) {
      dispatch(getSubcategories(route.params.data.serviceId)).then(
        (resp: any) => {
          if (resp.data && resp.data.result) {
            const transformedData = resp.data.result.map((item: any) => ({
              label: item.sc_category,
              value: item.sc_category,
            }));
            setPlumbingHelp(transformedData);
          }
        },
      );
      console.log(route.params.data.serviceId, 'Service ID');
    }
  }, [route.params]);

  const [isToken, setIsToken] = useState('');
  const [decodedEmail, setDecodedEmail] = useState('');
   
   const [userID, setUserID] = useState('');
  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authUser');
      if (storedToken) {
        setIsToken(storedToken);
        const decodedToken: any = jwtDecode(storedToken);
        console.log('sdsdsd', decodedToken);
        setDecodedEmail(decodedToken.email);
        setEmail(decodedToken.email);
        setFirstName(decodedToken.firstName);
        setLastName(decodedToken.lastName);
        setPhone(decodedToken.mobNumber);
          setUserID(decodedToken.userID);
      }
    } catch (error) {
      console.error('Error reading token:', error);
    }
  };
  useEffect(() => {
    checkLoginStatus();
  }, []);
  

  const navigation = useNavigation();
  // New state for controlling video playback
  const [videoPaused, setVideoPaused] = useState(false);
  const videoRef = useRef<any>(null);

  // When screen blurs, pause the video by setting state
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setVideoPaused(true);
    });
    return unsubscribe;
  }, [navigation]);

  const [showDropDown, setShowDropDown] = useState(false);
  const [propertyTypeValue, setPropertyTypeValue] = useState('');
  const [plumbingHelpValue, setPlumbingHelpValue] = useState('');
  const [plumbingIssueValue, setPlumbingIssueValue] = useState('');
  const [budgetValue, setBudgetValue] = useState<any>();
  const [uploading, setUploading] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState<any>(null);
  const [escrowSwitch, setEscrowSwitch] = useState(false);
  const [enableContractors, setEnableContractors] = useState(true);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('United States');
  const [zipCode, setZipCode] = useState('');
  const [aboutProject, setAboutProject] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [viewButton, setViewButton] = useState(true);
  const [loading, setLoading] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [plumbingHelp, setPlumbingHelp] = useState([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    budget: '',
    aboutProject: '',
    propertyType: '',
    workNeeded: '',
  });
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(false);
    
    const colorScheme = useColorScheme();

    const isDarkMode = colorScheme === 'dark';
   

// useEffect(() => {
//   (async () => {
//     const hasPermissions = await requestPermissionsvediio();
//     if (!hasPermissions) {
//       Alert.alert(
//         'Permissions Denied',
//         'Please enable camera and storage permissions from settings to use this feature.',
//       );
//     }
//   })();
// }, []);


const handlePickVideo = async () => {
  Alert.alert(
    'Upload Video',
    'Choose video source',
    [
      {
        text: 'Record Video',
        onPress: async () => {
          try {
            const result = await launchCamera({
              mediaType: 'video',
              videoQuality: 'high',
              saveToPhotos: true,
            });

            if (result.didCancel) {
              console.log('Camera action canceled.');
            } else if (result.errorCode) {
              console.log('Error recording video:', result.errorMessage);
            } else if (result.assets && result.assets.length > 0) {
              const videoUri = result.assets[0].uri;
              console.log('Video recorded:', videoUri);
              setSelectedVideoUri(videoUri); // ✅ Update state
            }
          } catch (error) {
            console.error('🚨 Error launching camera:', error);
          }
        },
      },
      {
        text: 'Choose from Library',
        onPress: async () => {
          try {
            const result = await launchImageLibrary({
              mediaType: 'video',
            });

            if (result.didCancel) {
              console.log('Library picker canceled.');
            } else if (result.errorCode) {
              console.log('Error picking video:', result.errorMessage);
            } else if (result.assets && result.assets.length > 0) {
              const videoUri = result.assets[0].uri;
              console.log('Video selected from gallery:', videoUri);
              setSelectedVideoUri(videoUri); // ✅ Update state
            }
          } catch (error) {
            console.error('🚨 Error launching gallery:', error);
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ],
    { cancelable: true },
  );
};

  useEffect(() => {
    const allValuesPresent =
      propertyTypeValue &&
      plumbingHelpValue &&
      plumbingIssueValue &&
      address &&
      phone &&
      budgetValue &&
      zipCode &&
      aboutProject;
    setEnableContractors(!allValuesPresent);
  }, [
    propertyTypeValue,
    plumbingHelpValue,
    plumbingIssueValue,
    address,
    phone,
    budgetValue,
    zipCode,
    aboutProject,
  ]);

  useEffect(() => {
    if (budgetValue >= 15000) {
      setEscrowSwitch(false);
    } else {
      setEscrowSwitch(false);
    }
  }, [budgetValue]);

  console.log(selectedVideoUri, 'selectedVideoUriselectedVideoUri');
  const propertyType = [
    {label: 'Residentail', value: 'Residency'},
    {label: 'Commercial', value: 'Commercial'},
    {label: 'Villa', value: 'Villa'},
    {label: 'Apartment', value: 'Apartment'},
  ];

  const plumbingIssue = [
    {
      label: 'Need to Install/Replace a Fixture',
      value: 'Need to Install/Replace a Fixture',
    },
    {label: 'Leaking Pipe/Faucet', value: 'Leaking Pipe/Faucet'},
  ];

  const handleSliderChange = (value: any) => {
    setBudgetValue(value);
  };

  const handleInputChange = (field: any, text: any) => {
    const value = parseInt(text.replace(/,/g, ''), 10);
    if (!isNaN(value) && value >= 0 && value <= 1000000) {
      setBudgetValue(value);
      console.log(`Field Updated: ${field} = ${value}`);
    } else {
      console.log('Invalid value');
    }
  };

  const sendVideoToServer = async () => {
    setUploading(true);
    try {
      const formData = new FormData();
      const uriParts = selectedVideoUri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      const fileName = `video_${Date.now()}.${fileType}`;
      const file: any = {
        uri: selectedVideoUri,
        name: fileName,
        type: `video/${fileType}`,
      };
      formData.append('file', file);
      const response = await fetch(`${API_BASE_URL}/user/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Error uploading video');
      }
      const data = await response.json();
      console.log(data.url, 'ueeuue');
      setVideoUrl(data.url);
      setViewButton(false);
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteVideo = () => {
    setSelectedVideoUri(null);
    setVideoUrl('');
    setViewButton(true);
  };

  const handleSubmitForm = async () => {
    let formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      state: state,
      phone: phone,
      address: address,
      zipCode: zipCode,
      serviceReq: plumbingHelpValue,
      escrow: escrowSwitch,
      aboutProject: aboutProject,
      propertyType: propertyTypeValue,
      budgetValue: budgetValue,
      videoUrl: videoUrl,
      city: city,
      country: 'United States',
    };

    const newErrors: any = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      aboutProject: '',
      budget: '',
      propertyType: '',
      workNeeded: '',
    };

    if (!propertyTypeValue)
      newErrors.propertyType = 'Property type is required.';
    if (!plumbingHelpValue) newErrors.workNeeded = 'Work needed is required.';
    if (!firstName) newErrors.firstName = 'First name is required.';
    if (!lastName) newErrors.lastName = 'Last name is required.';
    if (!phone) newErrors.phone = 'Phone number is required.';
    if (!email) newErrors.email = 'Email is required.';
    if (!address) newErrors.address = 'Address is required.';
    if (!city) newErrors.city = 'City is required.';
    if (!state) newErrors.state = 'State is required.';
    if (!country) newErrors.country = 'Country is required.';
    if (!zipCode) newErrors.zipCode = 'Zip code is required.';
    if (budgetValue <= 0)
      newErrors.budget = 'Budget must be greater than zero.';
    if (!aboutProject)
      newErrors.aboutProject = 'Project description is required.';

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setSnackbarMessage('Please fix the errors in the form.');
      setSnackbarType('error');
      setSnackbarVisible(true);
      return;
    }

    dispatch(submitLead(formData, serviceName, contId));
    console.log(formData, 'submit');
    setIsModalVisible(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(true);
      console.log('Form Submitted:', formData);
    }, 2000);

    const inputdata = {
      'Property Type': propertyTypeValue,
      'Plumbing Help': plumbingHelpValue,
      'Plumbing Issue': plumbingIssueValue,
      'Full Address': address,
      'Contact Number': phone,
      Budget: budgetValue,
      'Zip Code': zipCode,
      Escrow: escrowSwitch,
      'Project Description': aboutProject,
    };
  };

  const snackbarStyles = {
    success: {backgroundColor: '#4CAF50', color: '#FFFFFF'},
    error: {backgroundColor: '#F44336', color: '#FFFFFF'},
    warning: {backgroundColor: '#FF9800', color: '#FFFFFF'},
  };
useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='#325573'/>
      </View>
    );
  }


  console.log(videoUrl, 'videoUrlvideoUrl');
  const workNeededPlaceholder =
    serviceName === 'Realtors' ? 'Agent Needed' : 'Work Need';
  console.log('sddsdsd', workNeededPlaceholder);
  return (
    <KeyboardAvoidingView
      style={{flex: 1,backgroundColor:"white"}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {route?.params?.data?.serviceBgImg !== null ? (
            <View style={styles.container}>
              <View style={styles.roundedContainer}>
                <ImageBackground
                  source={{uri: route.params.data.serviceBgImg}}
                  style={styles.backgroundImage}
                  imageStyle={styles.imageBorderRadius}
                />
              </View>
            </View>
          ) : (
            ''
          )}
          <View style={styles.formContainer}>
            <View>
              <Text
                style={[
                  GlobalStyles.title,
                  {
                    fontFamily: 'Unbounded-Regular',
                    fontSize: 20,
                    fontWeight: 'bold',
                  },
                ]}>
                Submit Your Query
              </Text>
            </View>
            <View style={styles.dropdownContainer}>
              <Dropdown
                data={propertyType}
                onChange={e => setPropertyTypeValue(e.value)}
                placeholder="Property Type"
              />
              {errors.propertyType ? (
                <Text style={styles.errorText}>{errors.propertyType}</Text>
              ) : null}
              <View style={styles.dropdownContainer}>
                <Dropdown
                  data={plumbingHelp}
                  onChange={e => setPlumbingHelpValue(e.value)}
                  placeholder={workNeededPlaceholder}
                />
                {errors.workNeeded ? (
                  <Text style={styles.errorText}>{errors.workNeeded}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={{width: '48%'}}>
                <TextInput
                  placeholder="First Name"
                  style={[
                    styles.roundedInput2,
                    {
                      color: '#000', // Text color always black
                      backgroundColor: '#fff', // Keep background white
                    },
                  ]}
                  placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                  value={firstName}
                  onChangeText={(text: any) => setFirstName(text)}
                  returnKeyType="done"
                />
              </View>
              <View style={{width: '48%'}}>
                <TextInput
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={(text: any) => setLastName(text)}
                  style={[
                    styles.roundedInput2,
                    {
                      color: '#000', // Text color always black
                      backgroundColor: '#fff', // Keep background white
                    },
                  ]}
                  placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                  returnKeyType="done"
                />
              </View>
            </View>
            <View style={{paddingTop: 10}}>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text: any) => setEmail(text)}
                keyboardType="email-address"
                style={[
                  styles.roundedInput2,
                  {
                    color: '#000', // Text color always black
                    backgroundColor: '#fff', // Keep background white
                  },
                ]}
                placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                returnKeyType="done"
              />
              <Text style={styles.errorText}>{errors.email}</Text>
            </View>
            <View style={styles.inputContainer2}>
              <View style={{width: '48%'}}>
                <TextInput
                  placeholder="Phone no"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  style={[
                    styles.roundedInput2,
                    {
                      color: '#000', // Text color always black
                      backgroundColor: '#fff', // Keep background white
                    },
                  ]}
                  placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                  returnKeyType="done"
                />
              </View>
              <View style={{width: '48%'}}>
                <TextInput
                  placeholder="city"
                  returnKeyType="done"
                  value={city}
                  onChangeText={(text: any) => setCity(text)}
                  style={[
                    styles.roundedInput2,
                    {
                      color: '#000', // Text color always black
                      backgroundColor: '#fff', // Keep background white
                    },
                  ]}
                  placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
                style={[
                  styles.roundedInput3,
                  {
                    color: '#000', // Text color always black
                    backgroundColor: '#fff', // Keep background white
                  },
                ]}
                placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                multiline={true}
                numberOfLines={4}
                returnKeyType="done"
              />
              <Text style={styles.errorText}>{errors.address}</Text>
            </View>
            <View style={styles.inputContainer2}>
              <View style={{width: '48%'}}>
                <TextInput
                  placeholder="State"
                  returnKeyType="done"
                  value={state}
                  onChangeText={(text: any) => setState(text)}
                  style={[
                    styles.roundedInput,
                    {
                      color: '#000', // Text color always black
                      backgroundColor: '#fff', // Keep background white
                    },
                  ]}
                  placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                />
              </View>
              <View style={{width: '48%'}}>
                <TextInput
                  placeholder="Zipcode"
                  value={zipCode}
                  onChangeText={setZipCode}
                  keyboardType="numeric"
                  returnKeyType="done"
                  style={[
                    styles.roundedInput,
                    {
                      color: '#000', // Text color always black
                      backgroundColor: '#fff', // Keep background white
                    },
                  ]}
                  placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                />
              </View>
            </View>
            <View>
              <TextInput
                placeholder="About project"
                value={aboutProject}
                onChangeText={setAboutProject}
                multiline
                numberOfLines={4}
                style={[
                  styles.roundedInput3,
                  {
                    color: '#000', // Text color always black
                    backgroundColor: '#fff', // Keep background white
                  },
                ]}
                placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
              />
            </View>
            <View>
            <Text style={styles.budgetText} allowFontScaling={false}>
                      Budget:
                    </Text>
            </View>
            <View style={styles.sliderContainer}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginTop: 15,
                    }}>
                    {/* <Text style={styles.budgetText} allowFontScaling={false}>
                      Budget:
                    </Text> */}
                    {/* <Icon
                      name="attach-money"
                      size={20}
                      color="#6A707C"
                      style={{marginTop: 5, left: 4}}
                    /> */}
                    <View style={{width: '90%', marginRight:10}}>
                      <TextInput
                        allowFontScaling={false}
                        value={budgetValue}
                        onChangeText={text =>
                          handleInputChange(budgetValue, text)
                        }
                        keyboardType="numeric"
                        placeholder="Add budget manually"
                        returnKeyType="done"
                        style={[
                          styles.roundedInput,
                          {
                            color: '#000', // Text color always black
                            backgroundColor: '#fff', // Keep background white
                          },
                        ]}
                        placeholderTextColor={isDarkMode ? '#bbb' : '#888'}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* {budgetValue > 5000 && ( */}
                    <View style={styles.escrowButton}>
                      <Text
                        style={styles.escrowButtonText}
                        allowFontScaling={false}></Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={styles.escrowText}
                          allowFontScaling={false}>
                          Escrow Service
                        </Text>
                        <View style={{marginBottom:15}}>
                          <Switch
                            value={escrowSwitch}
                            onValueChange={setEscrowSwitch}
                            color="#24324a"
                            style={{left: 3}}
                            
                          />
                        </View>
                      </View>
                    </View>
                  {/* )} */}
                </View>
              </View>
   
            </View>
            <View style={styles.videoContainer}>
              <Text
                style={{color: '#6A707C', fontSize: 16, textAlign: 'center',margin:0,}}>
                Upload Video:
              </Text>
              {selectedVideoUri ? (
                <>
                  <Video
                    source={{uri: selectedVideoUri}}
                    rate={1.0}
                    volume={1.0}
                    muted={false}
                    controls={true}
                    paused={videoPaused} // Use state to control playback
                    style={{width: '100%', height: 200, marginTop: 10}}
                  />
                  <>
                    {videoUrl ? null : (
                      <Button
                        mode="contained"
                        onPress={sendVideoToServer}
                        loading={uploading}
                        style={styles.uploadButton}
                        disabled={uploading}>
                        Upload Video
                      </Button>
                    )}
                    <Button
                      mode="contained"
                      onPress={handleDeleteVideo}
                      style={styles.deleteButton}>
                      Delete Video
                    </Button>
                  </>
                </>
              ) : (
                <Button
                  icon={() => (
                    <MaterialCommunityIcons
                      name="video"
                      size={20}
                      // color="#2f5272"
                      style={{marginTop: 30}}
                    />
                  )}
                  labelStyle={{
                    color: '#2f5272',
                    textAlign: 'center',
                    fontSize: 16,
                    top: 15,
                  }}
                  mode="outlined"
                  onPress={handlePickVideo}
                  
                  style={styles.pickVideoButton}>
                  Select files to upload
                </Button>
              )}
            </View>
            <Button
              mode="contained"
              onPress={handleSubmitForm}
              labelStyle={{color: '#fff'}}
              style={styles.submitButton}>
              {loading ? <ActivityIndicator color="red" /> : 'Submit'}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Dismiss',
          onPress: () => {
            () => setSnackbarVisible(false);
          },
        }}>
        <Text>{snackbarMessage}</Text>
      </Snackbar>
      <ThankyouModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Makes the ScrollView take the full height of its parent
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 10,
    flexGrow: 1, // Ensures content container grows to fill the space
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },

  backgroundImage: {
    height: 200, // Adjust the height as needed
    width: '100%', // Takes full width of the container
  },

  formContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    marginRight: 10,
    height: 40,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderColor: '#676767',

    borderRadius: 15,
  },
  videoContainer: {

  },
  pickVideoButton: {
    marginTop: 10,
    borderColor: '#2f5272',
    color: '#2f5272',
    height: 90,
    width: '100%',
    borderRadius: 10, // Rounded corners
    paddingVertical: 8, // Vertical padding for height
    paddingHorizontal: 20, // Horizontal padding for width
    elevation: 3, // Shadow for Android
    // shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical: 10, // Spacing above and below the button
    alignSelf: 'center',
  },
  uploadButton: {
    marginTop: 10,

    // backgroundColor: '#2f5272',
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#dc3545',
  },
  submitButton: {
    marginTop: 20,
    color: '#fff',
    backgroundColor: '#2f5272',
    marginBottom:10
  },
  dropdown: {},
  dropdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 14,
  },

  sliderContainer: {
  marginBottom:10
  },
  budgetText: {
    marginTop: 5,
    color: '#6A707C',
    fontSize: 16,
    marginLeft: 10,
    marginBottom:5
  },
  slider: {
    width: '100%',
  },
  escrowText: {
    color: '#676767',
    right:10,
    marginBottom:20,
    fontSize: 12,
  },
  escrowButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  escrowButton: {

    marginHorizontal: 10,
    marginVertical: 10,
    // marginVertical: 10,
    // padding: 10,
    // backgroundColor: "#2f5272",
    // borderRadius: 5,
    // alignItems: "center",
  },
  errorText: {
    color: '#F44336',
    fontSize: 12,
    marginBottom: 10,
  },
  roundedContainer: {
    overflow: 'hidden',
    borderRadius: 39,
    elevation: 3,
    backgroundColor: 'white',
  },
  imageBorderRadius: {
    borderRadius: 40, // Matches the parent container's border radius
  },
  inputContainer: {
    paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row', // This will align the text inputs side by side
    justifyContent: 'space-between', // Adjust spacing between the inputs
    alignItems: 'center', // Aligns inputs vertically in the center
  },
  roundedInput: {
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    borderColor: '#676767', // Set your desired border color
    borderRadius: 15, // Rounded corners
    padding: 10,
  },

  roundedInput2: {
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
    borderColor: '#676767', // Set your desired border color
    borderRadius: 15, // Rounded corners
    padding: 10,
  },
  inputContainer2: {
    bottom: 10,
    flexDirection: 'row', // This will align the text inputs side by side
    justifyContent: 'space-between', // Adjust spacing between the inputs
    alignItems: 'center', // Aligns inputs vertically in the center
  },
  roundedInput3: {
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 80,
    width: '100%',
    borderColor: '#676767', // Set your desired border color
    borderRadius: 15, // Rounded corners
    padding: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  inputContainer3: {
    flexDirection: 'row', // This will align the text inputs side by side
    justifyContent: 'space-between', // Adjust spacing between the inputs
    alignItems: 'center', // Aligns inputs vertically in the center
  },
});

export default SubmitQuery;
